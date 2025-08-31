import { Card, CardContent } from "../ui/card";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import ViewAllProductsButton from "../view-all-products-button";
const categories = [
  {
    name: "Flours & Grains",
    description:
      "Premium organic flours and specialty grains for all your baking needs",
    image:
      "https://images.unsplash.com/photo-1702234883240-fb86c8087f3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtpbmclMjBpbmdyZWRpZW50cyUyMGZsb3VyJTIwc3VnYXJ8ZW58MXx8fHwxNzU2NTA4MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Chocolate & Chips",
    description: "Rich chocolates and premium chips to elevate your desserts",
    image:
      "https://images.unsplash.com/photo-1592173376801-185310a68dea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjaGlwcyUyMGJha2luZ3xlbnwxfHx8fDE3NTY1MDgzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Spices & Extracts",
    description: "Aromatic spices and pure extracts for authentic flavors",
    image:
      "https://images.unsplash.com/photo-1721934081798-34c4488fdd12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwZXh0cmFjdCUyMHNwaWNlcyUyMGJha2luZ3xlbnwxfHx8fDE3NTY1MDgzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Nuts & Seeds",
    description: "Fresh nuts and seeds for texture and nutritional value",
    image:
      "https://images.unsplash.com/photo-1702061881259-cfe0f88481a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRzJTIwYWxtb25kcyUyMGJha2luZyUyMGluZ3JlZGllbnRzfGVufDF8fHx8MTc1NjUwODMzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function ProductCategories() {
  return (
    <section id="products" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl text-foreground">Our Products</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our carefully organized selection of premium baking
            ingredients, sourced from trusted suppliers around the world.
          </p>
          <ViewAllProductsButton />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
