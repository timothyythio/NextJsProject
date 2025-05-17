import { z } from "zod";
import { insertProductSchema } from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  //these are all things that should be updated automatically (i.e. not manually inserted)
  //like id and createdAt are initialized automatically in an ideal world
  id: string;
  rating: string;
  createdAt: Date;
};

//we will not be using this manual method, but using Zod, we can do all this automatically
