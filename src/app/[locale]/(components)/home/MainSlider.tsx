"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import banner1 from "@assets/banner_Hero1.jpg";
import banner2 from "@assets/banner_Hero2.jpg";
import banner3 from "@assets/banner_Hero3.jpg";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useTranslations } from "next-intl";

const swiperConfig = {
  modules: [Autoplay],
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
};

export default function MainSlider() {
  const locale = useLocale();
  const t = useTranslations("Home.Hero");

  const SilderImage = [banner1, banner2, banner3];

  return (
    <Swiper dir={locale === "ar" ? "rtl" : "ltr"} {...swiperConfig}>
      {SilderImage.map((img, index) => (
        <SwiperSlide
          key={index}
          className="relative overflow-hidden rounded-3xl bg-surface"
        >
          <div
            className={`absolute top-1/2 z-10 max-w-lg -translate-y-1/2 ${
              locale === "ar" ? "right-40 text-right" : "left-40 text-left"
            }`}
          >
            <h4 className="text-primary mb-2">{t("badge")}</h4>

            <h3 className="mt-4 text-5xl font-bold text-slate-900">
              {t("title")}
            </h3>

            <p className="mt-4 text-muted-foreground">{t("description")}</p>

            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              {t("button")}
            </Link>
          </div>

          <Image
            src={img}
            alt={`Banner ${index + 1}`}
            priority={index === 0}
            className={`h-full w-full object-cover ${
              locale === "ar" ? "-scale-x-100" : ""
            }`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
