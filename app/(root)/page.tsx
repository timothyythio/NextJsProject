import { getLatestProducts } from "@/lib/actions/product.actions";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/view-all-products-button";

export const metadata = {
  title: "Home",
};
const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductList
        data={latestProducts}
        title="Latest Products"
        limit={4}
      ></ProductList>
      <ViewAllProductsButton />
    </>
  );
};

export default Homepage;
