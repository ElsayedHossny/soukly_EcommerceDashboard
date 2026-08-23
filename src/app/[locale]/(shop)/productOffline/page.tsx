import ProductSwiper from "../../(components)/products/ProductSwiper";
import ProductCard from "../../(components)/home/ProductCard";
import {
  getProductsDummy,
  getProductsSearchParamsDummy,
} from "@/services/Products.service";
import { IProductDummy } from "@/interface/products.interface";
import { getCategoryList } from "@/services/Categories.service";

import { getTranslations } from "next-intl/server";

import FilterSelector from "../../(components)/products/FilterSelector";
import Pagenation from "../../(components)/products/Pagenation";

type Props = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ProductsOffline({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category;

  const t = await getTranslations("category");

  const catList = await getCategoryList();

  let products: IProductDummy[];

  if (category) {
    const data = await getProductsSearchParamsDummy(category);
    products = data.products;
  } else {
    products = await getProductsDummy();
  }

  const FilterVal = category ? t(category) : t("All");

  const items = [
    { label: t("select"), value: "all" },
    ...catList.map((cat: string) => ({
      label: t(cat),
      value: cat,
    })),
  ];

  console.log(products);

  return (
    <div className="container mx-auto mt-3">
      <ProductSwiper />
      <div className="grid gap-4 md:grid-cols-4">
        {/* Filter */}
        <div className="col-span-1 mt-10 flex h-fit w-full flex-col items-center gap-2 rounded-2xl bg-surface p-4 text-center md:flex-col md:p-6">
          <h2 className="shrink-0 rounded-2xl bg-primary px-4 py-1 text-xl font-semibold text-white">
            {t("Cat")}
          </h2>
          <FilterSelector items={items} value={category || "all"} />
        </div>

        {/* Products */}
        <div className="col-span-1 md:col-span-3">
          <div className="container mx-auto">
            <div className="my-8 flex flex-col items-center rounded-2xl bg-surface px-6 pb-7 pt-1">
              <h2 className="mt-4 w-fit rounded-2xl bg-primary px-4 py-1 text-xl font-semibold text-white">
                {FilterVal}
              </h2>

              <div className="mt-8 grid w-full  gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagenation />
    </div>
  );
}
