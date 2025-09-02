import { Button } from "../ui/button";
import { ImageWithFallback } from "../ui/ImageWithFallback";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="bg-card py-20 rounded-lg shadow-sm border border-border"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl text-foreground leading-tight">
              Premium Baking Ingredients for Perfect Results
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover our carefully curated selection of high-quality baking
              ingredients. From organic flours to exotic spices, we have
              everything you need to create delicious masterpieces in your
              kitchen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                About Us
              </Button>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1612982593409-5d926522b5ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtpbmclMjBzdG9yZSUyMHNoZWx2ZXMlMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NTY1MDgzMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Titan Baking store interior with shelves of baking ingredients"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
