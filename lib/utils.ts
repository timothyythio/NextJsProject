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

//Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  //padEnd just makes it 2 decimal places. the 0 next to it ensures that if there are numbers like 49.9, a 0 is added so it becomes 49.90
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// Reformat errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatErrors(error: any) {
  if (error.name === "ZodError") {
    //Handle any Zod errors

    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    //Handle prisma errors

    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    //Handle other errors

    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.essage);
  }
}

export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else throw new Error("Incorrect Format. Value is not a string or number");
}
