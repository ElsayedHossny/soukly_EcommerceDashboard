"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z
    .string()
    .min(5, "Login.errors.emailMin")
    .max(100, "Login.errors.emailMax")
    .email("Login.errors.emailInvalid"),

  password: z
    .string()
    .min(8, "Login.errors.passwordMin")
    .max(100, "Login.errors.passwordMax"),
});

export function LoginForm() {
  const t = useTranslations("Auth");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  function translateAuthError(errorCode: string) {
    switch (errorCode) {
      case "CredentialsSignin":
        return t("Login.toast.invalidCredentials");
      default:
        return t("Login.toast.genericError");
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.error) {
        toast.error(translateAuthError(res.error), {
          duration: 2000,
        });
        console.log("Login failed:", res.error);
        return;
      } else {
        toast.success(t("Login.toast.success"), {
          duration: 2000,
        });
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      toast.error(t("Login.toast.genericError"), {
        duration: 3000,
      });
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{t("Login.title")}</CardTitle>
        <CardDescription>{t("Login.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    {t("Login.email.label")}
                  </FieldLabel>

                  <Input
                    {...field}
                    id="form-rhf-demo-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("Login.email.placeholder")}
                    autoComplete="email"
                    disabled={isSubmitting}
                  />

                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{t(fieldState.error.message)}</FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password">
                    {t("Login.password.label")}
                  </FieldLabel>

                  <Input
                    {...field}
                    id="form-rhf-demo-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("Login.password.placeholder")}
                    autoComplete="current-password"
                    disabled={isSubmitting}
                  />

                  {fieldState.invalid && fieldState.error?.message && (
                    <FieldError>{t(fieldState.error.message)}</FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            form="form-rhf-demo"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="animate-spin" />}
            {isSubmitting ? t("Login.signingIn") : t("Login.submit")}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
