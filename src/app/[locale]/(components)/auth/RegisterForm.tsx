"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
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
import { formSchema } from "./registerSchema";
import handleRegister, { RegisterActionState } from "@/services/Auth.service";
import { Loader2 } from "lucide-react";

const initForm: RegisterActionState = {
  success: false,
  error: {},
  message: null,
};

const FIELDS = [
  { name: "name", type: "text", autoComplete: "name" },
  { name: "email", type: "email", autoComplete: "email" },
  { name: "password", type: "password", autoComplete: "new-password" },
  { name: "rePassword", type: "password", autoComplete: "new-password" },
  { name: "phone", type: "tel", autoComplete: "tel" },
] as const;

export function RegisterForm() {
  const t = useTranslations();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const [action, formAction, isPending] = useActionState(
    handleRegister,
    initForm
  );

  useEffect(() => {
    if (action.success) {
      toast.success(action.message ?? t("Auth.toast.success"));
      form.reset();
      window.location.href = "/login";
    } else if (action.message) {
      toast.error(action.message);
    }
  }, [action]);

  function fieldErrorText(key: string | undefined) {
    return key ? t(key) : undefined;
  }

  return (
    <Card className="w-full h-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{t("Auth.register.title")}</CardTitle>
        <CardDescription>{t("Auth.register.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" action={formAction}>
          <FieldGroup>
            {FIELDS.map(({ name, type, autoComplete }) => (
              <Controller
                key={name}
                name={name}
                control={form.control}
                render={({ field, fieldState }) => {
                  const errorMessage = fieldErrorText(
                    fieldState.error?.message ?? action.error?.[name]?.[0]
                  );
                  const inputId = `form-rhf-demo-${name}`;

                  return (
                    <Field data-invalid={!!errorMessage}>
                      <FieldLabel htmlFor={inputId}>
                        {t(`Auth.fields.${name}.label`)}
                      </FieldLabel>

                      <Input
                        {...field}
                        id={inputId}
                        type={type}
                        aria-invalid={!!errorMessage}
                        placeholder={t(`Auth.fields.${name}.placeholder`)}
                        autoComplete={autoComplete}
                      />

                      {errorMessage && (
                        <FieldError>{errorMessage}</FieldError>
                      )}
                    </Field>
                  );
                }}
              />
            ))}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            form="form-rhf-demo"
            disabled={isPending}
          > {isPending && <Loader2 className="animate-spin" />}
            {isPending ? t("Auth.submitting") : t("Auth.submit")}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}