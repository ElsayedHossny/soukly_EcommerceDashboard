"use client";
import { Heart, Menu, ShoppingCart, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
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

import { signOut, useSession } from "next-auth/react";

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
    // { title: "Home", url: "/" },
    { title: t("products"), url: "/product" },
    { title: t("productsOffline"), url: "/productOffline" },
    { title: "Blog", url: "#" },
  ];
  const auth: AuthItem = {
    login: { title: t("Login"), url: "/login" },
    signup: { title: t("Sign_up"), url: "/register" },
    signout: { title: t("Sign_Out"), url: "/register" },
  };

  const isActive = (url: string) => url !== "#" && pathname === url;

  const { data: session, status } = useSession();

  // console.log(session);

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
                  priority
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
              {status == "loading" ? (
                <>loadding...</>
              ) : status == "unauthenticated" ? (
                <>
                  <Link
                    href={auth.login.url}
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "rounded-full border-0 bg-white text-primary hover:bg-white/90",
                      "dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary-hover",
                      "transition-colors font-extrabold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background",
                    )}
                  >
                    {auth.login.title}
                  </Link>
                  <Link
                    href={auth.signup.url}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "rounded-full font-extrabold border-white/70 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground",
                      "dark:border-border dark:text-foreground dark:hover:bg-primary/10 dark:hover:border-primary/50 dark:hover:text-primary",
                      "transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background",
                    )}
                  >
                    {auth.signup.title}
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex gap-3">
                    <Link
                      href="/wishlist"
                      className="relative inline-flex items-center justify-center"
                    >
                      <Heart className="size-7 text-white" />

                      <Badge
                        variant="destructive"
                        className="absolute -right-2 -top-1.5 size-5 font-mono text-white rounded-full p-1 bg-red-600 dark:bg-red-600"
                      >
                        9
                      </Badge>
                    </Link>
                    
                    <Link
                      href="/cart"
                      className="relative inline-flex items-center justify-center"
                    >
                      <ShoppingCart className="size-7 text-white" />
                      <Badge
                        variant="destructive"
                        className="absolute -right-2 -top-1.5 size-5 font-mono text-white rounded-full p-1 bg-red-600 dark:bg-red-600"
                      >
                        2
                      </Badge>
                    </Link>

                    <Link
                      href="/profile"
                      className="inline-flex  items-center justify-center"
                    >
                      <UserRound className="size-7 text-white" />
                    </Link>
                  </div>
                  {/* <span>{session.user}</span> */}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className={cn(
                      "cursor-pointer rounded-full border-0 bg-white text-primary hover:bg-white/90",
                      "dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary-hover",
                      "transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background font-extrabold",
                    )}
                  >
                    {auth.signout.title}
                  </Button>
                </>
              )}
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
                  <div className="flex flex-col gap-2 p-4 ">
                    <div className="flex flex-col items-center gap-2">
                      {navMenu.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          aria-current={isActive(item.url) ? "page" : undefined}
                          className={cn(
                            "inline-flex items-center justify-center rounded-md px-4 py-2",
                            "text-md font-semibold text-foreground",
                            "hover:bg-accent hover:text-accent-foreground",
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
                    <div className="flex flex-col mt-4 gap-5">
                      {status == "loading" ? (
                        <>loadding...</>
                      ) : status == "unauthenticated" ? (
                        <>
                          <Link
                            href={auth.login.url}
                            className={cn(
                              buttonVariants({ size: "sm" }),
                              "rounded-full",
                              "font-extrabold",
                            )}
                          >
                            {auth.login.title}
                          </Link>
                          <Link
                            href={auth.signup.url}
                            className={cn(
                              buttonVariants({
                                variant: "outline",
                                size: "sm",
                              }),
                              "rounded-full",
                              "font-extrabold",
                            )}
                          >
                            {auth.signup.title}
                          </Link>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center gap-3">
                            <Link
                              href="/wishlist"
                              className="relative inline-flex items-center justify-center"
                            >
                              <Heart className="size-7" />

                              <Badge
                                variant="destructive"
                                className="absolute -right-2 -top-1.5 size-5 font-mono rounded-full p-1 text-white bg-red-600 dark:bg-red-600"
                              >
                                9
                              </Badge>
                            </Link>

                            <Link
                              href="/cart"
                              className="relative inline-flex items-center justify-center"
                            >
                              <ShoppingCart className="size-7 " />

                              <Badge
                                variant="destructive"
                                className="absolute -right-2 -top-1.5 size-5 font-mono text-white rounded-full p-1 bg-red-600 dark:bg-red-600"
                              >
                                2
                              </Badge>
                            </Link>

                            <Link
                              href="/profile"
                              className="inline-flex  items-center justify-center"
                            >
                              <UserRound className="size-7 " />
                            </Link>
                          </div>
                          <Button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            variant="secondary"
                            className={cn(
                              buttonVariants({ size: "sm" }),
                              "rounded-full",
                              "font-extrabold",
                            )}
                          >
                            {auth.signout.title}
                          </Button>
                        </>
                      )}
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
