
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import slider1 from "@assets/silder2.png"
import slider2 from "@assets/slider3.png"
import slider3 from "@assets/slider4.png"
import slider4 from "@assets/slider5.png"
import slider5 from "@assets/slider6.png"
import { useLocale, useTranslations } from "next-intl";

const swiperConfig = {
  modules: [Autoplay, Pagination],
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    clickable: true,
    bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
  },
  speed: 700,
};

const slides = [slider1,slider2,slider3,slider4,slider5];

export default function ProductSwiper() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("Home.Hero");

  return (
    <Swiper
      dir={isRtl ? "ltr" : "rtl"}
      {...swiperConfig}
      className="[&_.swiper-pagination-bullet]:bg-white/60 [&_.swiper-pagination-bullet]:opacity-100"
    >
      {slides.map((img, index) => (
        <SwiperSlide
          key={index}
          className=" overflow-hidden rounded-3xl bg-surface"
        >
          <Image
            src={img}
            width={100}
            height={50}
            preload={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            alt={
              t("badge")
                ? `${t("badge")} - ${t("title")}`
                : `Banner ${index + 1}`
            }
            fetchPriority={index === 0 ? "high" : "auto"}
            sizes="100vw"
            className={`h-50 w-full object-cover ${
              isRtl ? "-scale-x-100" : ""
            }`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
