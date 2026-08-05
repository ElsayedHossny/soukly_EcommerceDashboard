"use client";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import LogoEn from "@assets/Logo.png";
import LogoAr from "@assets/logoAR.png";

import { useLocale, useTranslations } from "next-intl";
import { AuthItem, MenuItem, Navbar1Props } from "@/interface/navbar.interface";
import BtnModeToggle from "../navbar/BtnModeToggle";
import BtnLanguage from "../navbar/BtnLanguage";

const Navbar1 = () => {
  const locale = useLocale();
  const t = useTranslations("Home.navbar");
  const pathname = usePathname();
  const isRtl = locale === "ar";

  const logo: Navbar1Props = {
    url: "/",
    alt: "logo",
    title: "",
  };
  const navMenu: MenuItem[] = [
    { title: "Home", url: "/" },
    { title: t("products"), url: "/product" },
    { title: t("productsOffline"), url: "/productOffline" },
    { title: "Blog", url: "#" },
  ];
  const auth: AuthItem = {
    login: { title: t("Login"), url: "#" },
    signup: { title: t("Sign_up"), url: "#" },
  };

  const isActive = (url: string) => url !== "#" && pathname === url;

  return (
    <div className="sticky top-0 z-50 w-full px-3 py-3 md:px-6">
      <section
        dir={isRtl ? "rtl" : "ltr"}
        className={cn(
          "mx-auto max-w-7xl rounded-full border transition-all duration-300",
          "border-primary-hover/40 bg-primary",
          "dark:border-border dark:bg-surface",
          "py-3 shadow-lg backdrop-blur-md dark:bg-surface/90",
        )}
      >
        <div className="px-4 md:px-6">
          {/* Desktop Menu */}
          <nav className="hidden items-center justify-between lg:flex">
            <div className="flex items-center gap-6">
              <Link href={logo.url} className="flex items-center gap-2">
                <Image
                  src={isRtl ? LogoAr : LogoEn}
                  alt={logo.alt}
                  width={100}
                  height={100}
                  loading="lazy"
                  className="h-12 w-40 rounded-2xl bg-white p-0.5"
                />
                {logo.title && (
                  <span className="text-lg font-semibold tracking-tighter text-primary-foreground dark:text-foreground">
                    {logo.title}
                  </span>
                )}
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  {navMenu.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        href={item.url}
                        aria-current={isActive(item.url) ? "page" : undefined}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-full bg-transparent px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/10 hover:text-primary-foreground",
                          "dark:text-foreground dark:hover:bg-muted dark:hover:text-accent-foreground",
                          isActive(item.url) && "bg-white/20 dark:bg-muted",
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
              <div className="flex gap-2">
                <BtnModeToggle />
                <BtnLanguage />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={auth.login.url}
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "rounded-full border-0 bg-white text-primary hover:bg-white/90",
                  "dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary-hover",
                )}
              >
                {auth.login.title}
              </Link>
              <Link
                href={auth.signup.url}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "rounded-full border-white/70 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground",
                  "dark:border-border dark:text-foreground dark:hover:bg-muted",
                )}
              >
                {auth.signup.title}
              </Link>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="block lg:hidden">
            <div className="flex items-center justify-between">
              <Link href={logo.url} className="flex items-center gap-2">
                <Image
                  src={isRtl ? LogoAr : LogoEn}
                  alt={logo.alt}
                  loading="lazy"
                  width={100}
                  height={100}
                  className="h-10 w-32 rounded-2xl bg-white p-0.5"
                />
              </Link>
              <Sheet>
                <SheetTrigger
                  aria-label="Open menu"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "rounded-full border-white/70 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground",
                    "dark:border-border dark:text-foreground dark:hover:bg-muted",
                  )}
                >
                  <Menu className="size-4" />
                </SheetTrigger>
                <SheetContent
                  side={isRtl ? "right" : "left"}
                  className="overflow-y-auto bg-background text-foreground"
                >
                  <SheetHeader>
                    <SheetTitle>
                      <Link href={logo.url} className="flex items-center gap-2">
                        <Image
                          src={isRtl ? LogoAr : LogoEn}
                          alt={logo.alt}
                          loading="lazy"
                          width={100}
                          height={100}
                          className="h-10 w-32 rounded-2xl bg-white p-0.5"
                        />
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <div className="flex flex-col gap-4">
                      {navMenu.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          aria-current={isActive(item.url) ? "page" : undefined}
                          className={cn(
                            "text-md font-semibold text-foreground",
                            isActive(item.url) && "text-primary",
                          )}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                    <div className="flex justify-center gap-2">
                      <BtnModeToggle />
                      <BtnLanguage />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Link
                        href={auth.login.url}
                        className={cn(
                          buttonVariants({ size: "sm" }),
                          "rounded-full",
                        )}
                      >
                        {auth.login.title}
                      </Link>
                      <Link
                        href={auth.signup.url}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "rounded-full",
                        )}
                      >
                        {auth.signup.title}
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { Navbar1 };
