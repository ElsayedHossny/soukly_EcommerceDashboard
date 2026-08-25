"use server";

import { getTranslations } from "next-intl/server";
import { formSchema } from "@/app/[locale]/(components)/auth/registerSchema";

export type RegisterActionState = {
  success: boolean;
  error: Record<string, string[] | undefined>;
  message: string | null;
};

export default async function handleRegister(
  prevState: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const t = await getTranslations("Auth.toast");

  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
    phone: formData.get("phone"),
  };

  const parsedData = formSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData.data),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: {},

        message: data.message || t("genericError"),
      };
    }

    return { success: true, error: {}, message: t("success") };
  } catch (error) {
    console.error("Register error:", error);
    return {
      success: false,
      error: {},
      message: t("networkError"),
    };
  }
}
