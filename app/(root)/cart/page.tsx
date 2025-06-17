import CartTable from "./cart-table";
import { getMyCart } from "@/lib/actions/cart.actions";
export const metadata = {
  title: "Cart",
};

const CartPage = async () => {
  const cart = await getMyCart();

  return (
    <>
      <CartTable cart={cart}></CartTable>
    </>
  );
};

export default CartPage;
