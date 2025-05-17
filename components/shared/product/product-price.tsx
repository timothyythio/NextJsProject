import { cn } from "@/lib/utils";

const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  //Ensure 2 decimal places
  const stringValue = value.toFixed(2);
  //Get int/float (price)
  const [intValue, floatValue] = stringValue.split(".");

  return (
    //I'm kinda guessing that the CN will take the classname value and apply it to the text. pretty neat if you want to change the class name dynamically
    //this is used in the product card page, where text-red-500 is used to make the price red.
    <p className={cn("text-2xl", className)}>
      <span className="text-xs align-super">$</span>
      {intValue}
      <span className="text-xs align-super">.{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
