import { Metadata } from "next";
import ProductForm from "@/components/admin/product-form";
import { requireAdmin } from "@/lib/auth-guard";
export const metadata: Metadata = {
  title: "Create Product",
};

const CreateProductPage = () => {
  return (
    <div>
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8"></div>
      <ProductForm type={"Create"} />
    </div>
  );
};

export default CreateProductPage;
