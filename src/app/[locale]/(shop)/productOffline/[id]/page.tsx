import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductDetailsSwiper from "@/app/[locale]/(components)/products/ProductDetailsSwiper";

import { getSpecificProductsDummy } from "@/services/Products.service";
import { IReviewDummy } from "@/interface/products.interface";

type PageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function ProductDetailsDummy({ params }: PageProps) {
  const { id, locale } = await params;
  const product = await getSpecificProductsDummy(id);

  if (!product) {
    notFound();
  }

  const t = await getTranslations("Product");
  const dir = locale === "ar" ? "rtl" : "ltr";

  const inStock =
    product.availabilityStatus === "In Stock" || product.stock > 0;
  const rating = Math.round(product.rating);
  const finalPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);
  const reviews = product.reviews ?? [];

  return (
    <section dir={dir} className="container mx-auto">
      {/* Product overview */}
      <div className="rounded-2xl bg-surface p-6 sm:p-10">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Product image */}
          <div className="relative w-full overflow-hidden rounded-3xl bg-muted">
            <ProductDetailsSwiper slides={product.images} />
          </div>

          {/* Product details */}
          <div className="mx-auto flex flex-col justify-center gap-5 text-start">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {product.title}
              </h1>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5"
                      fill={i < rating ? "var(--warning)" : "none"}
                      stroke={
                        i < rating
                          ? "var(--warning)"
                          : "var(--muted-foreground)"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({reviews.length} {t("reviews")})
                </span>
                <span className="text-muted-foreground">|</span>
                <span className="text-sm font-medium text-success">
                  {inStock ? t("inStock") : t("outOfStock")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold text-foreground">
                {finalPrice} {t("currency")}
              </p>
              {product.discountPercentage > 0 && (
                <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold text-destructive">
                  {Math.round(product.discountPercentage)}% {t("off")}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 text-muted-foreground">
              <p>
                {t("brand")} {product.brand}
              </p>
              <p>
                {t("category")} {product.category}
              </p>
              <p>
                {t("sku")} {product.sku}
              </p>
            </div>

            <div className="h-px w-full bg-border" />

            <Button className="w-full cursor-pointer rounded-full bg-primary px-10 py-4 text-base font-semibold text-primary-foreground sm:w-fit">
              {t("buyNow")}
            </Button>
          </div>
        </div>
      </div>

      {/* Customer reviews */}
      {reviews.length > 0 && (
        <div className="mt-10 w-full rounded-2xl bg-surface px-6 py-10 sm:px-10">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 text-start">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
              {t("customerReviews")}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review: IReviewDummy, idx: number) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-card-foreground">
                      {review.reviewerName}
                    </span>
                    <div className="flex shrink-0 items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4"
                          fill={i < review.rating ? "var(--warning)" : "none"}
                          stroke={
                            i < review.rating
                              ? "var(--warning)"
                              : "var(--muted-foreground)"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {review.comment && (
                    <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
