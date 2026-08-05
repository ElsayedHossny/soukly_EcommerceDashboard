import TitleSection from "../sharedComponent/TitleSection";

import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import online from "@assets/OnlineEN.png";
import offline from "@assets/OfflineEN.png";

export default async function ProductsSection() {
  const t = await getTranslations("ProductTitle");
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir} className="mb-10 mt-10 rounded-2xl bg-surface px-6 py-8">
      <TitleSection
        title={t("title")}
        subtitle={t("subtitle")}
        btnContent={t("btnContent")}
        HrefSection="/product"
      />
      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-2">
        {/* Online Store */}
        <Link
          href="/product"
          className="group relative aspect-video overflow-hidden rounded-3xl border border-border shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <Image
            src={online}
            alt="Online Store"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-6 start-6 end-6 text-start text-white">
            <h3 className="text-2xl font-bold">{t("online.title")}</h3>

            <p className="mt-2 text-sm text-white/90">
              {t("online.description")}
            </p>

            <span className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
              {t("online.button")}
            </span>
          </div>
        </Link>

        {/* Offline Store */}
        <Link
          href="/productOffline"
          className="group relative aspect-video overflow-hidden rounded-3xl border border-border shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <Image
            src={offline}
            alt="Offline Store"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-6 start-6 end-6 text-start text-white">
            <h3 className="text-2xl font-bold">{t("offline.title")}</h3>

            <p className="mt-2 text-sm text-white/90">
              {t("offline.description")}
            </p>

            <span className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
              {t("offline.button")}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
