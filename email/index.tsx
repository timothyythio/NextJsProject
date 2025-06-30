import { Resend } from "resend";
import { SENDER_EMAIL } from "@/lib/constants";
import { APP_NAME } from "@/lib/constants";
import { Order } from "@/types";
import PurchaseReceiptEmailTemplate from "./purchase-receipt";

require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  console.log("Processing email...");
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order.user.email,
    subject: `Order Confirmation: ${order.id}`,
    react: <PurchaseReceiptEmailTemplate order={order} />,
  });
};
