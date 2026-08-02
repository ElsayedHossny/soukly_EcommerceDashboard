import getProductsRoute, {
  getProductsDummy,
} from "@/services/Products.service";

import TitleSection from "../sharedComponent/TitleSection";
import ProductCard from "./ProductCard";
import ProductCardReal from "./ProductCardRoute";
import { getTranslations } from "next-intl/server";
import { IProduct, IProductDummy } from "@/interface/products.interface";

export default async function ProductsSection() {
  const t = await getTranslations("ProductTitle");

  const [products, { data }] = await Promise.all([
    getProductsDummy() as Promise<IProductDummy[]>,
    getProductsRoute() as Promise<{ data: IProduct[] }>,
  ]);

  const displayedDummyProducts = products;
  const displayedRealProducts = data;

  return (
    <>
      {!!displayedDummyProducts.length && (
        <div className="mb-20 mt-10 rounded-2xl bg-surface px-6 py-8">
          <TitleSection
            title={t("title")}
            subtitle={t("subtitle")}
            btnContent={t("btnContent")}
          />
          <div className="mt-8 grid grid-cols-1 gap-y-4 sm:grid-cols-2 gap-4  md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-6">
            {displayedDummyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {displayedRealProducts.map((product) => (
              <ProductCardReal key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
