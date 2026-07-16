"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function BtnLanguage() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "en" ? "ar" : "en";

  const handleSwitch = () => {
    console.log("1", pathname);
    console.log("1", nextLocale);

    router.replace(pathname, { locale: nextLocale });

    console.log("2", nextLocale);
    console.log("2", pathname);
  };

  return (
    <button
      onClick={handleSwitch}
      className="bg-red-400 text-secondary-foreground px-4 py-2 rounded-md hover:opacity-90 transition"
    >
      {locale === "en" ? "English" : "العربية"}
    </button>
  );
}
