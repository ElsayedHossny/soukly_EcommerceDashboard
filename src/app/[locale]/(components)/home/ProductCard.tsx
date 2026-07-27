// components/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IProductDummy } from "@/interface/products.interface";

interface ProductCardProps {
  product: IProductDummy;
}

export default async function ProductCard({ product }: ProductCardProps) {
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const t = await getTranslations("ProductCard");

  const finalPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:hover:shadow-primary/5"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-white border-b-3 border-b-muted">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.discountPercentage > 0 && (
          <Badge
            className={cn(
              "absolute top-2 rounded-full bg-primary text-primary-foreground",
              isRtl ? "right-2" : "left-2",
            )}
          >
            -{Math.round(product.discountPercentage)}%
          </Badge>
        )}

        {product.availabilityStatus === "Out of Stock" && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <span className="rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground">
              {t("outOfStock")}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <span className="text-xs font-medium capitalize text-muted-foreground">
          {product.category}
        </span>

        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-foreground group-hover:text-primary sm:text-base">
          {product.title}
        </h3>

        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-muted-foreground">
            {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-1">
          <span className="text-base font-bold text-foreground sm:text-lg">
            {finalPrice.toFixed(2)} {t("currency")}
          </span>

          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
