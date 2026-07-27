import { getCategoriesDummy } from "@/services/Categories.service";
import Link from "next/link";
import React from "react";

type CategoryItem = {
  url: string;
  slug: string;
};

export default async function Category() {
  const data = await getCategoriesDummy();

  console.log(data);

  return (
    <div className="grid grid-cols-3">
      sayed
      {data.map((ele: CategoryItem, ind: number) => (
        <Link
          key={ind}
          href={`http://localhost:3000/en/category/${ele.slug}`}
          className="col-1"
        >
          <h2>{ele.slug}</h2>
        </Link>
      ))}
    </div>
  );
}
