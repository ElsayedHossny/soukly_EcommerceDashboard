"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import banner1 from "@assets/banner_Hero1.jpg";
import banner2 from "@assets/banner_Hero2.jpg";
import banner3 from "@assets/banner_Hero3.jpg";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

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

const slides = [banner1, banner2, banner3];

export default function MainSlider() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("Home.Hero");

  return (
    <Swiper
      dir={isRtl ? "rtl" : "ltr"}
      {...swiperConfig}
      className="[&_.swiper-pagination-bullet]:bg-white/60 [&_.swiper-pagination-bullet]:opacity-100"
    >
      {slides.map((img, index) => (
        <SwiperSlide
          key={index}
          className="relative overflow-hidden rounded-3xl bg-surface"
        >
          <div
            className={`absolute top-1/2 z-10 w-[85%] max-w-lg -translate-y-1/2 px-6 sm:px-0 ${
              isRtl
                ? "right-0 text-right sm:right-10 md:right-20 lg:right-30"
                : "left-0 text-left sm:left-10 md:left-20 lg:left-30"
            }`}
          >
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {t("badge")}
            </span>

            <h3 className="mt-4 text-3xl leading-tight font-bold text-slate-900 sm:text-4xl md:text-5xl">
              {t("title")}
            </h3>

            <p className="mt-4 line-clamp-3 text-sm text-muted-foreground sm:text-base">
              {t("description")}
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md active:scale-[0.98]"
            >
              {t("button")}
              <span aria-hidden="true" className={isRtl ? "rotate-180" : ""}>
                →
              </span>
            </Link>
          </div>

          <div
            className={`pointer-events-none absolute inset-0  ${
              isRtl
                ? "from-transparent via-white/30 to-white/70"
                : "from-white/70 via-white/30 to-transparent"
            }`}
          />

          <Image
            src={img}
            alt={
              t("badge")
                ? `${t("badge")} - ${t("title")}`
                : `Banner ${index + 1}`
            }
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "auto"}
            sizes="100vw"
              className={`h-105 w-full object-cover sm:h-120 md:h-140 ${
              isRtl ? "-scale-x-100" : ""
            }`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
