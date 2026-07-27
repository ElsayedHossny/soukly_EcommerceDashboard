"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Id() {
  const params = useParams();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://dummyjson.com/products/category/${params.id}`,
      ).then((res) => res.json());

      setData(result.products || []);
    };

    fetchData();
  }, [params.id]);

  return (
    <div>
      {data.map((ele, ind) => (
        <div key={ind}>{ele?.title ?? ele?.name ?? JSON.stringify(ele)}</div>
      ))}
    </div>
  );
}
