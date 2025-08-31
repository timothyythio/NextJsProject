import { Card, CardContent } from "../ui/card";
const features = [
  {
    title: "Quality Guaranteed",
    description:
      "Every ingredient is carefully selected and tested for quality and freshness",
  },
  {
    title: "Expert Knowledge",
    description:
      "Our team has decades of experience in baking and ingredient sourcing",
  },
  {
    title: "Personal Service",
    description:
      "We provide personalized recommendations for all your baking projects",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl text-foreground">
              A Family Tradition of Quality
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              For over 20 years, Titan Baking has been the trusted source for
              premium baking ingredients in our community. What started as a
              small family business has grown into a beloved destination for
              both home bakers and professional chefs.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that great baking starts with great ingredients. That's
              why we source only the finest products from trusted suppliers,
              ensuring that every item in our store meets our high standards for
              quality and freshness.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <h3 className="text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
