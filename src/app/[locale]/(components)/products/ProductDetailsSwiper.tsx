"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

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

export default function ProductDetailsSwiper({ slides }: { slides: string[] }) {
  return (
    <Swiper
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
            alt={"sasa"}
            fetchPriority={index === 0 ? "high" : "auto"}
            sizes="100vw"
            className={`h-100 md:h-130 w-full object-cover`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
