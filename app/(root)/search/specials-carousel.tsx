"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Star, Clock } from "lucide-react";

const specialProducts = [
  {
    id: 101,
    name: "Premium Belgian Dark Chocolate",
    originalPrice: 45.99,
    specialPrice: 32.99,
    discount: 28,
    rating: 4.9,
    reviews: 256,
    image:
      "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYmFraW5nJTIwY2hvY29sYXRlfGVufDF8fHx8MTc1NjYzMDI0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Limited Time",
    description: "Rich 70% cocoa chocolate perfect for premium baking",
  },
  {
    id: 102,
    name: "Raw Wildflower Honey",
    originalPrice: 28.5,
    specialPrice: 19.99,
    discount: 30,
    rating: 4.8,
    reviews: 189,
    image:
      "https://images.unsplash.com/photo-1645549826194-1956802d83c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaG9uZXklMjBqYXJ8ZW58MXx8fHwxNzU2NTc0NTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Best Seller",
    description: "Unprocessed honey with natural floral notes",
  },
  {
    id: 103,
    name: "Himalayan Pink Sea Salt",
    originalPrice: 22.99,
    specialPrice: 16.99,
    discount: 26,
    rating: 4.7,
    reviews: 143,
    image:
      "https://images.unsplash.com/photo-1645007489014-235185d38791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwc2VhJTIwc2FsdHxlbnwxfHx8fDE3NTY2MzAyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Chef's Choice",
    description: "Pure mineral-rich salt for enhanced flavors",
  },
  {
    id: 104,
    name: "Artisan Cake Flour",
    originalPrice: 18.99,
    specialPrice: 13.99,
    discount: 26,
    rating: 4.9,
    reviews: 298,
    image:
      "https://images.unsplash.com/photo-1639583673519-1c9eafb5589b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwY2FrZSUyMGZsb3VyfGVufDF8fHx8MTc1NjYzMDI0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "New Arrival",
    description: "Ultra-fine milled flour for delicate cakes",
  },
  {
    id: 105,
    name: "Gourmet Spice Collection",
    originalPrice: 89.99,
    specialPrice: 59.99,
    discount: 33,
    rating: 4.8,
    reviews: 167,
    image:
      "https://images.unsplash.com/photo-1675654871683-abf6524f68c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYmFraW5nJTIwc3BpY2VzfGVufDF8fHx8MTc1NjYzMDI1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Bundle Deal",
    description: "Complete set of 12 premium baking spices",
  },
];

export function SpecialsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Auto-scroll every 20 seconds
    const autoScroll = setInterval(() => {
      api.scrollNext();
    }, 20000);

    return () => clearInterval(autoScroll);
  }, [api]);

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

  return (
    <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-12 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-primary">Special Offers</h2>
          </div>
          <p className="text-muted-foreground">
            Limited time deals on our premium baking ingredients
          </p>
        </div>

        <Carousel
          setApi={setApi}
          className="w-full relative"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {specialProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                          {product.badge}
                        </Badge>
                        <Badge
                          variant="destructive"
                          className="absolute top-3 right-3"
                        >
                          -{product.discount}%
                        </Badge>
                      </div>

                      <div className="p-4">
                        <h3 className="mb-2 line-clamp-1">{product.name}</h3>
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {renderStars(product.rating)}
                          </div>
                          <span className="text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-primary">
                              ${product.specialPrice}
                            </span>
                            <span className="text-muted-foreground line-through">
                              ${product.originalPrice}
                            </span>
                          </div>
                          <span className="text-green-600">
                            Save $
                            {(
                              product.originalPrice - product.specialPrice
                            ).toFixed(2)}
                          </span>
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex left-2 lg:left-4" />
          <CarouselNext className="hidden md:flex right-2 lg:right-4" />
        </Carousel>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {specialProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === current ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
