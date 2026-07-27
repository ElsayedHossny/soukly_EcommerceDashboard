// components/ProductCardRoute.tsx
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IProduct } from "@/interface/products.interface";

interface ProductCardRouteProps {
  product: IProduct;
}

export default async function ProductCardRoute({
  product,
}: ProductCardRouteProps) {
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const t = await getTranslations("ProductCard");

  const hasDiscount =
    typeof product.priceAfterDiscount === "number" &&
    product.priceAfterDiscount < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100,
      )
    : 0;

  const isOutOfStock = product.quantity <= 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:hover:shadow-primary/10"
    >
      <div className="relative aspect-square w-full overflow-hidden border-b-3 border-b-muted">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {hasDiscount && (
          <Badge
            className={cn(
              "absolute top-2 rounded-full bg-primary text-primary-foreground",
              isRtl ? "right-2" : "left-2",
            )}
          >
            -{discountPercentage}%
          </Badge>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <span className="rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground">
              {t("outOfStock")}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium capitalize text-muted-foreground">
            {product.category?.name}
          </span>

          {product.brand?.name && (
            <span className="text-xs font-medium text-muted-foreground ">
              {product.brand.name}
            </span>
          )}
        </div>

        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-foreground group-hover:text-primary sm:text-base">
          {product.title}
        </h3>

        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="text-xs text-muted-foreground">
            {product.ratingsAverage.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            ({product.ratingsQuantity})
          </span>
        </div>

        {!!product.availableColors?.length && (
          <div className="flex items-center gap-1.5 pt-0.5">
            {product.availableColors.slice(0, 5).map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className="h-3.5 w-3.5 rounded-full border border-border"
              />
            ))}
            {product.availableColors.length > 5 && (
              <span className="text-xs text-muted-foreground">
                +{product.availableColors.length - 5}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-1">
          <span className="text-base font-bold text-foreground sm:text-lg">
            {(hasDiscount
              ? product.priceAfterDiscount!
              : product.price
            ).toFixed(2)}{" "}
            {t("currency")}
          </span>

          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
