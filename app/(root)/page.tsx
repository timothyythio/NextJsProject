import { getLatestProducts } from "@/lib/actions/product.actions";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/view-all-products-button";
import HeroSection from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { ProductCategories } from "@/components/home/product-categories";

export const metadata = {
  title: "Home",
};
const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <HeroSection />
      <ProductCategories />
      <AboutSection />
    </>
  );
};

export default Homepage;
