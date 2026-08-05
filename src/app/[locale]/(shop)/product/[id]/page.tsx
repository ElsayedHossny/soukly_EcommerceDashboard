import { Button } from "@/components/ui/button";
import { IProduct } from "@/interface/products.interface";
import { getSpecificProductRoute } from "@/services/Products.service";
import { Star } from "lucide-react";

import { getTranslations } from "next-intl/server";
import ProductDetailsSwiper from "@/app/[locale]/(components)/products/ProductDetailsSwiper";

type PageProps = {
  params: {
    locale: string;
    id: string;
  };
};

export default async function Productdetails({ params }: PageProps) {
  const { id, locale } = await params;
  const { data: product }: { data: IProduct } =
    await getSpecificProductRoute(id);

  const t = await getTranslations("Product");
  const dir = locale === "ar" ? "rtl" : "ltr";
  const rating = Math.min(5, product.ratingsQuantity);

  return (
    <section className="container mt-7 mx-auto">
      <div
        dir={dir}
        className="bg-surface rounded-2xl text-foreground flex items-center justify-center p-6 sm:p-10"
      >
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Product image */}
          <div className="relative w-full rounded-3xl bg-muted overflow-hidden">
            <ProductDetailsSwiper slides={product.images} />
          </div>

          {/* Product details */}
          <div className="flex flex-col mx-auto justify-center gap-5 text-start">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
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
                  ({product.ratingsQuantity} {t("reviews")})
                </span>
                <span className="text-muted-foreground">|</span>
                <span className="text-sm font-medium text-success">
                  {product.quantity > 0 ? t("inStock") : t("outOfStock")}
                </span>
              </div>
            </div>

            <p className="text-3xl font-bold text-foreground">
              {product.price} {t("currency")}
            </p>

            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.description}
            </p>

            <div className="h-px w-full bg-border" />

            <Button className="cursor-pointer w-full sm:w-fit px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base">
              {t("buyNow")}
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="w-full bg-surface mt-10 rounded-2xl p-6 sm:px-10 py- flex flex-col items-center">
        {(product.reviews?.length ?? 0) > 0 && (
          <div className="w-full max-w-5xl flex flex-col gap-6 text-start">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
              {t("customerReviews")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.reviews?.slice(0, 3).map((review) => (
                <div
                  key={review._id}
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-card-foreground">
                      {review.user.name}
                    </span>
                    <div className="flex items-center gap-0.5 shrink-0">
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

                  {review.review && (
                    <p className="text-sm line-clamp-2 text-muted-foreground leading-relaxed whitespace-pre-line">
                      {review.review}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
