import { getLatestProducts } from "@/lib/actions/product.actions";
import ProductList from "@/components/shared/product/product-list";

export const metadata = {
  title: "Home",
};
const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductList
        data={latestProducts}
        title="Newest Arrivals"
        limit={4}
      ></ProductList>
    </>
  );
};

export default Homepage;
