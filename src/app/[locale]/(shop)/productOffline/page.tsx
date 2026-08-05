import React from "react";
import ProductSwiper from "../../(components)/products/ProductSwiper";
import ProductCard from "../../(components)/home/ProductCard";
import { getProductsDummy } from "@/services/Products.service";
import { IProductDummy } from "@/interface/products.interface";

export default async function ProductsOffline() {
  const data: IProductDummy[] = await getProductsDummy();

  return (
    <div className="container mx-auto mt-3">
      <ProductSwiper />
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 bg-surface p-6 my-10 rounded-2xl text-center">
          {" "}
          Filter
        </div>
        <div className="col-span-3">
          <div className="container mx-auto ">
            <div className=" mb-10 mt-10 rounded-2xl bg-surface px-6 py-1  ">
              <div className="mt-8  grid grid-cols-1 gap-y-4 sm:grid-cols-2 gap-4  md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-6">
                {data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
