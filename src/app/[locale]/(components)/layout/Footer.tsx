"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@assets/Logo.png";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: t("links.home"), href: "/" },
    { label: t("links.shop"), href: "/product" },
    { label: t("links.about"), href: "" },
    { label: t("links.contact"), href: "" },
  ];

  const serviceLinks = [
    { label: t("service.faq"), href: "" },
    { label: t("service.shipping"), href: "" },
    { label: t("service.returns"), href: "" },
    { label: t("service.terms"), href: "" },
  ];

  const socials = [
    { Icon: FaFacebookF, href: "/", label: "Facebook" },
    { Icon: FaInstagram, href: "/", label: "Instagram" },
    { Icon: FaXTwitter, href: "/", label: "Twitter" },
  ];

  return (
    <footer className=" border-t border-border bg-surface">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 pt-10 pb-5 sm:px-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Soukly"
              width={100}
              height={100}
              className="h-16 w-52 rounded-2xl "
            />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t("tagline")}
          </p>
          <div className="flex items-center gap-3 ">
            {socials.map(({ Icon, href, label }) => (
              <Button
                key={label}
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Link href={href} aria-label={label}>
                  <Icon className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="hidden md:flex  flex-col gap-4 pt-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {t("quickLinks")}
          </h3>
          <ul className="flex flex-col gap-2">
            {quickLinks.map((link, ind) => (
              <li key={ind}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer service */}
        <div className="hidden md:flex flex-col gap-4 pt-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {t("customerService")}
          </h3>
          <ul className="flex flex-col gap-2">
            {serviceLinks.map((link, ind) => (
              <li key={ind}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + newsletter */}
        <div className="flex flex-col pt-5 gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {t("stayInTouch")}
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <span>support@soukly.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <span dir="ltr">+20 100 000 0000</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{t("address")}</span>
            </li>
          </ul>

          <form className="flex items-center gap-2 pt-1">
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="rounded-full bg-background"
            />
            <Button
              type="submit"
              size="icon"
              aria-label={t("subscribe")}
              className="shrink-0 rounded-full"
            >
              <Send className="h-4 w-4 rtl:-scale-x-100" />
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col-reverse items-center gap-3 px-6 py-5 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-start">
          <p className="text-sm text-muted-foreground">
            © {year} Soukly. {t("rightsReserved")}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-primary">
              {t("service.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
