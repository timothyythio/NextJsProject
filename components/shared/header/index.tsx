import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";
import CategoryDrawer from "./category-drawer";
import Search from "./search";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-start">
            <Link href="/" className="flex-start ml-4">
              <Image
                src="/images/logo.svg"
                alt={`${APP_NAME} logo`}
                height={48}
                width={48}
                priority={true}
              />
              <span className="hidden lg:block font-bold text-2xl ml-3 text-primary">
                Titan Baking
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/search"
              className="text-foreground hover:text-primary transition-colors"
            >
              Products
            </a>
            <Search />
            <a
              href="/about"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </a>
          </nav>

          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
