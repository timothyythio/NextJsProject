import { z } from "zod";
import {
  cartSchema,
  cartItemSchema,
  insertProductSchema,
  shippingAddressSchema,
} from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  //these are all things that should be updated automatically (i.e. not manually inserted)
  //like id and createdAt are initialized automatically
  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof cartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;

//we will not be using this manual method, but using Zod, we can do all this automatically
