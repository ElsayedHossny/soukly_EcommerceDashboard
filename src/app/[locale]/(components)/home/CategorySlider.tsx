"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useLocale, useTranslations } from "next-intl";

import "swiper/css";

import { ICatrgory, ICatrgoryResponse } from "@/interface/categories.interface";

const swiperConfig = {
  modules: [Autoplay],
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    0: { slidesPerView: 3, spaceBetween: 12 },
    480: { slidesPerView: 4, spaceBetween: 14 },
    640: { slidesPerView: 5, spaceBetween: 16 },
    768: { slidesPerView: 6, spaceBetween: 20 },
    1024: { slidesPerView: 7, spaceBetween: 20 },
    1280: { slidesPerView: 8, spaceBetween: 24 },
  },
};

export default function CategorySlider({ data }: ICatrgoryResponse) {
  const locale = useLocale();
  const t = useTranslations("Home.Categories");

  if (!data?.length) {
    return null;
  }

  return (
    <Swiper dir={locale === "ar" ? "rtl" : "ltr"} {...swiperConfig}>
      {data.map((categ: ICatrgory) => (
        <SwiperSlide key={categ._id}>
          <Link
            href={`/shop?category=${categ._id}`}
            className="group flex flex-col items-center focus:outline-none"
            aria-label={categ.name}
          >
            <div className="h-20 w-20 overflow-hidden rounded-full bg-surface ring-1 ring-border transition-all duration-300 group-hover:ring-2 group-hover:ring-primary group-focus-visible:ring-2 group-focus-visible:ring-primary sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32">
              {categ.image ? (
                <Image
                  src={categ.image}
                  width={128}
                  height={128}
                  alt={categ.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 112px, 128px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                  {categ.name?.charAt(0)}
                </div>
              )}
            </div>

            <h3 className="mt-3 line-clamp-2 min-h-10 text-center text-sm text-foreground transition-colors group-hover:text-primary sm:text-base">
              {categ.name}
            </h3>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
