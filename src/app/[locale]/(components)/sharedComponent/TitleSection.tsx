"use client";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { useLocale } from "next-intl";

export default function TitleSection({
  title,
  subtitle,
  btnContent,
}: {
  title: string;
  subtitle: string;
  btnContent: string;
}) {
  const locale = useLocale();
  const isRtl = locale === "en";
  return (
    <div className="mb-8 flex justify-between items-center">
      <div className="">
        <h3 className="section-title section-title::before">{title}</h3>
        <span className=" font-semibold text-muted-foreground text-2xl">
          {subtitle}
        </span>
      </div>
      <div className="">
        <Button>
          {btnContent} {isRtl ? <MoveRight /> : <MoveLeft />}
        </Button>
      </div>
    </div>
  );
}
