"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function BtnModeToggle() {
  const { setTheme } = useTheme();
  return (
    <div>
      <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
        light
      </Button>
      <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
        dark
      </Button>
    </div>
  );
}
