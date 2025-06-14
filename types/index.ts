import { z } from "zod";
import { insertProductSchema } from "@/lib/validators";
import { cartSchema, cartItemSchema } from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  //these are all things that should be updated automatically (i.e. not manually inserted)
  //like id and createdAt are initialized automatically
  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof cartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;

//we will not be using this manual method, but using Zod, we can do all this automatically
