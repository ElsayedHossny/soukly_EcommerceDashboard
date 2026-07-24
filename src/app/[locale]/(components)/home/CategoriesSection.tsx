import { getCategoriesRoute } from "@/services/Categories.service";

import { ICatrgoryResponse } from "../../../../interface/categories.interface";
import CategorySlider from "./CategorySlider";
import TitleSection from "../sharedComponent/TitleSection";
import { getTranslations } from "next-intl/server";
export default async function CategoriesSection() {
  const categoriesResponse: ICatrgoryResponse = await getCategoriesRoute();

  const t = await getTranslations("CategoryTitle");

  return (
    <div className="mt-10 bg-surface rounded-2xl px-6 py-8 mb-20">
      <TitleSection
        title={t("title")}
        subtitle={t("subtitle")}
        btnContent={t("btnContent")}
      />
      <CategorySlider {...categoriesResponse} />
    </div>
  );
}
