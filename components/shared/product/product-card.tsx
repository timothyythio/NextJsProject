import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMyCart } from "@/lib/actions/cart.actions";
import AddToCart from "./add-to-cart";

const ProductCard = async ({ product }: { product: Product }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-primary text-primary"
            : "fill-muted text-muted"
        }`}
      />
    ));
  };

  const cart = await getMyCart();

  return (
    <Card className="w-full max-w-sm  group hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <Link href={`/product/${product.slug}`}>
          <div className="relative overflow-hidden rounded-t-xl">
            <Image
              src={product.images[0]}
              alt={product.name}
              height={300}
              width={300}
              priority
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-md shadow">
              $ {product.price}
            </Badge>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4">
          <div className="text-xs">{product.brand}</div>
          <Link href={`/product/${product.slug}`}>
            <h2 className="mb-2 line-clamp-2">{product.name}</h2>
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {renderStars(Number(product.rating))}
            </div>
            <span className="text-muted-foreground">{product.rating}</span>
          </div>
          <AddToCart
            cart={cart}
            item={{
              productId: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              quantity: 1,
              image: product.images![0],
              //sending the first image only
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
