import { useTranslations } from "next-intl";
import React from "react";

export default function Brands() {
  const t = useTranslations("brands");

  return <div>{t("title")}</div>;
}
