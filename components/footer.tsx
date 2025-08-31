import { APP_NAME } from "@/lib/constants";
import { Separator } from "./ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-background">Titan Baking</h3>
            <p className="text-background/80">
              Your trusted source for premium baking ingredients since 2005.
              Quality, freshness, and service you can count on.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-background">Store Hours</h4>
            <div className="space-y-2 text-background/80">
              <p>Monday - Friday: 8:00 AM - 7:00 PM</p>
              <p>Saturday: 8:00 AM - 6:00 PM</p>
              <p>Sunday: 10:00 AM - 5:00 PM</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-background">Contact Info</h4>
            <div className="space-y-2 text-background/80">
              <p>
                📍 Jl. RS. Fatmawati No. 22A
                <br />
                Jakarta Selatan, 12430
              </p>
              <p>📞 0818284826</p>
              <p>✉️ sales@titanbaking.com</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2025 Titan Baking. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-background/60 hover:text-background text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-background/60 hover:text-background text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
