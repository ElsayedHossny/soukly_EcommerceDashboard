"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function BtnLanguage() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "en" ? "ar" : "en";

  const handleSwitch = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleSwitch}
      className="relative cursor-pointer flex h-8 w-8 items-center justify-center"
    >
      <span className="text-sm font-bold leading-none">
        {locale === "en" ? "EN" : "AR"}
      </span>
    </Button>
  );
}
