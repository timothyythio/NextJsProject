"use server";

import { convertToPlainObject, formatErrors } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import { insertOrderSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { CartItem, PaymentResult } from "@/types";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { paypal } from "../paypal";

// Create order and create the order items
export async function createOrder() {
  try {
    const session = await auth();
    if (!session) throw new Error("User is not authenticated");

    const cart = await getMyCart();
    const userId = session?.user?.id;
    if (!userId) throw new Error("User not found");

    const user = await getUserById(userId);

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: "Your cart is empty",
        redirectTo: "/cart",
      };
    }

    if (!user.address) {
      return {
        success: false,
        message: "No shipping address",
        redirectTo: "/shipping-address",
      };
    }

    if (!user.paymentMethod) {
      return {
        success: false,
        message: "No payment method",
        redirectTo: "/payment-method",
      };
    }

    // Create order object
    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    // Create a transaction to create order and order items in database
    const insertedOrderId = await prisma.$transaction(async (tx) => {
      // Create order
      const insertedOrder = await tx.order.create({ data: order });
      // Create order items from the cart items
      for (const item of cart.items as CartItem[]) {
        console.log(item);
        await tx.orderItem.create({
          data: {
            ...item,
            price: item.price,
            orderId: insertedOrder.id,
          },
        });
      }
      // Clear cart
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          shippingPrice: 0,
          itemsPrice: 0,
        },
      });

      return insertedOrder.id;
    });

    if (!insertedOrderId) throw new Error("Order not created");

    return {
      success: true,
      message: "Order created",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: formatErrors(error) };
  }
}

export async function getOrderById(orderId: string) {
  const data = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderItem: true,
      user: { select: { name: true, email: true } },
    },
  });

  return convertToPlainObject(data);
}

// Create new paypal order

export async function createPayPalOrder(orderId: string) {
  try {
    // Get order from the db
    const order = await prisma.order.findFirst({ where: { id: orderId } });

    if (order) {
      // Create the paypal order (from paypal.ts file)
      const paypalOrder = await paypal.createOrder(Number(order.totalPrice));

      console.log("Paypal Order ID: ", paypalOrder.id);

      // Update order with paypal order
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentResult: {
            id: paypalOrder.id,
            emailAddress: "",
            status: "",
            pricePaid: 0,
          },
        },
      });

      return {
        success: true,
        message: "Paypal order created",
        data: paypalOrder.id,
      };
    } else throw new Error("Order not found");
  } catch (error) {
    console.log("error in paypal");
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}

// Approve PayPal order and update order to PAID

export async function approvePayPalOrder(
  orderId: string,
  data: { orderID: string }
) {
  try {
    console.log("Trying to approve order...");
    // Get order from the db
    const order = await prisma.order.findFirst({ where: { id: orderId } });

    if (!order) throw new Error("Order not found");

    const captureData = await paypal.capturePayment(data.orderID);

    if (
      !captureData ||
      captureData.id !== (order.paymentResult as PaymentResult)?.id ||
      captureData.status !== "COMPLETED"
    ) {
      throw new Error("Error occurred during PayPal payment");
    }

    // Update order to paid
    updateOrderToPaid({
      orderId,
      paymentResult: {
        id: captureData.id,
        status: captureData.status,
        emailAddress: captureData.payer.emailAddress,
        pricePaid:
          captureData.purchase_units[0]?.payments?.captures[1]?.amount?.value,
      },
    });
    console.log("Order ID from order.actions.ts ", orderId);
    revalidatePath(`/order/${orderId}`);
    console.log("Revalidating...");

    return {
      success: true,
      message: "Payment Successful",
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}

//Update order to paid

async function updateOrderToPaid({
  orderId,
  paymentResult,
}: {
  orderId: string;
  paymentResult?: PaymentResult;
}) {
  const order = await prisma.order.findFirst({
    where: { id: orderId },
    include: { orderItem: true },
  });

  if (!order) throw new Error("Order not found");

  if (order.isPaid) throw new Error("Order has already been paid");

  // Transaction for updating order in db and deducting stock

  await prisma.$transaction(async (tx) => {
    // Iterate over products and update stock
    for (const item of order.orderItem) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: -item.quantity } },
      });
    }

    // Set the order to paid in db
    await tx.order.update({
      where: { id: orderId },
      data: { isPaid: true, paidAt: new Date(), paymentResult },
    });
  });
  // Get updated order after transaction

  const updatedOrder = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderItem: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!updatedOrder) throw new Error("Order not found");
}
