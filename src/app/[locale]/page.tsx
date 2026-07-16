import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <>
      <h1>{t("title")}</h1>
      <Button variant="outline">Button</Button>
    </>
  );
}
