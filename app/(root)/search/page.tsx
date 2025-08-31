import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/product.actions";
import { cn } from "@/lib/utils";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SpecialsCarousel } from "./specials-carousel";

const prices = [
  {
    name: "$1 to $25",
    value: "1-25",
  },
  {
    name: "$26 to $50",
    value: "26-50",
  },
  {
    name: "$51 to $100",
    value: "51-100",
  },
  {
    name: "$101 to $200",
    value: "101-200",
  },
  {
    name: "$201 to $300",
    value: "201-300",
  },
];

const ratings = [4, 3, 2, 1];

const sortOrders = [
  { value: "newest", label: "Newest" },
  { value: "lowest", label: "Price: Low to High" },
  { value: "highest", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `
      Search ${isQuerySet ? q : ""} 
      ${isCategorySet ? `: Category ${category}` : ""}
      ${isPriceSet ? `: Price ${price}` : ""}
      ${isRatingSet ? `: Rating ${rating}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  // Filter URL

  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };

    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (s) params.sort = s;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  const currentSort = sortOrders.find((o) => o.value === sort) ?? sortOrders[0];

  return (
    <div className="min-h-screen bg-background">
      <SpecialsCarousel />
      <div className="grid md:grid-cols-5 md:gap-5">
        <div className="filter-links">
          {/* Category Links */}
          <div className="text-xl mb-2 mt-2">
            Category
            {(q !== "all" && q !== "") ||
            (category !== "all" && category !== "") ||
            rating !== "all" ||
            price !== "all" ? (
              <Button variant={"link"} asChild>
                <Link href="/search">Reset Filter</Link>
              </Button>
            ) : null}
          </div>
          <div>
            <ul className="space-y-1">
              <li>
                <Link
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    category === "all" || category === ""
                      ? "bg-primary text-white font-medium"
                      : "hover:bg-muted"
                  }`}
                  href={getFilterUrl({ c: "all" })}
                >
                  All
                </Link>
              </li>
              {categories.map((x) => (
                <li key={x.category}>
                  <Link
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      category === x.category
                        ? "bg-primary text-white font-medium"
                        : "hover:bg-muted"
                    }`}
                    href={getFilterUrl({ c: x.category })}
                  >
                    {x.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Links */}
          <div className="text-xl mb-2 mt-8">Price</div>
          <div>
            <ul className="space-y-1">
              <li>
                <Link
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    price === "all"
                      ? "bg-primary text-white font-medium"
                      : "hover:bg-muted"
                  }`}
                  href={getFilterUrl({ p: "all" })}
                >
                  All Prices
                </Link>
              </li>
              {prices.map((x) => (
                <li key={x.value}>
                  <Link
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      price === x.value
                        ? "bg-primary text-white font-medium"
                        : "hover:bg-muted"
                    }`}
                    href={getFilterUrl({ p: x.value })}
                  >
                    {x.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rating Links */}
          <div className="text-xl mb-2 mt-8">Rating</div>
          <div>
            <ul className="space-y-1">
              <li>
                <Link
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    rating === "all"
                      ? "bg-primary text-white font-medium"
                      : "hover:bg-muted"
                  }`}
                  href={getFilterUrl({ r: "all" })}
                >
                  All Ratings
                </Link>
              </li>
              {ratings.map((x) => (
                <li key={x}>
                  <Link
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      rating === x.toString()
                        ? "bg-primary text-white font-medium"
                        : "hover:bg-muted"
                    }`}
                    href={getFilterUrl({ r: `${x}` })}
                  >
                    {`${x} stars & up`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Section*/}
        <div className="space-y-4 md:col-span-4">
          <div className="flex-between flex-col my-4 md:flex-row">
            <div className="flex-1">
              {/* Header with Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h1>Our Products</h1>
                  <p className="text-muted-foreground mt-2">
                    Discover our complete collection of premium baking
                    ingredients and tools
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {/* <div className="flex items-center">
                  {q !== "all" && q !== "" && "Query: " + q}
                  {category !== "all" &&
                    category !== "" &&
                    "Category: " + category}
                  {price !== "all" && " Price: " + price}
                  {rating !== "all" && " Rating: " + rating + " stars & up"}
                  &nbsp;
                </div> */}

                  <span className="text-muted-foreground whitespace-nowrap">
                    Sort by:
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-between w-48 px-3 py-2 border rounded-md bg-muted text-sm font-medium hover:bg-muted/80">
                      {currentSort.label}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      {sortOrders.map((o) => {
                        const isActive = o.value === sort;
                        return (
                          <DropdownMenuItem
                            key={o.value}
                            asChild
                            // className is applied to the child when using asChild
                            className="hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                          >
                            <Link
                              href={getFilterUrl({ s: o.value })}
                              aria-current={isActive ? "true" : undefined}
                            >
                              <span>{o.label}</span>
                              {isActive && <Check className="ml-3 h-4 w-4" />}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {products.data.length === 0 && <div>No products found</div>}
                {products.data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
