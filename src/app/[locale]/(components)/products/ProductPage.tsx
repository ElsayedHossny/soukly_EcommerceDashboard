import getProductsRoute from "@/services/Products.service";

import { IProduct } from "@/interface/products.interface";

import ProductCardRoute from "../../(components)/home/ProductCardRoute";

export default async function ProductPage() {
  const { data: displayedRealProducts }: { data: IProduct[] } =
    await getProductsRoute();

  return (
    <div className="container mx-auto ">
      <div className=" mb-10 mt-10 rounded-2xl bg-surface px-6 py-1  ">
        <div className="mt-8  grid grid-cols-1 gap-y-4 sm:grid-cols-2 gap-4  md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-6">
          {displayedRealProducts.map((product) => (
            <ProductCardRoute key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
