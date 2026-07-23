import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import MainSlider from "./(components)/home/MainSlider";
import BtnModeToggle from "./(components)/navbar/BtnModeToggle";
import BtnLanguage from "./(components)/navbar/BtnLanguage";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="container mx-auto">
      <MainSlider />
      {/* <BtnModeToggle />
      <BtnLanguage /> */}
    </div>
  );
}
