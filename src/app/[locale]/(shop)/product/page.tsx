import React from "react";
import ProductPage from "../../(components)/products/ProductPage";
import ProductSwiper from "../../(components)/products/ProductSwiper";

export default function product() {
  return (
    <div className="container mx-auto mt-3">
      <ProductSwiper />
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 bg-surface p-6 my-10 rounded-2xl text-center">
          {" "}
          Filter
        </div>
        <div className="col-span-3">
          <ProductPage />
        </div>
      </div>
    </div>
  );
}
