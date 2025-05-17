import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Converts prisma object into a regular js object
//T is a TS generic, it's a placeholder that could be anything.
// T is just specifying the parameter that's being passed in
// T return is the return of the function
// It should be the same return type as the input
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
