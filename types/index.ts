import { z } from "zod";
import {
  cartSchema,
  cartItemSchema,
  insertProductSchema,
  shippingAddressSchema,
  orderItemSchema,
  insertOrderSchema,
} from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  //these are all things that should be updated automatically (i.e. not manually inserted)
  //like id and createdAt are initialized automatically
  //we will not be using this manual method, but using Zod, we can do all this automatically

  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof cartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: Boolean;
  paidAt: Date | null;
  isDelivered: Boolean;
  deliveredAt: Date | null;
  orderitems: OrderItem[];
  user: { name: string; email: string };
};
