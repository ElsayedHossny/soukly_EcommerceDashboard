"use client";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterSelector({
  items,
  value,
}: {
  items: { label: string; value: string }[];
  value: string;
}) {
  const router = useRouter();

  return (
    <Select
      items={items}
      value={value}
      onValueChange={(selectedValue) => {
        const nextValue = selectedValue ?? "all";

        if (nextValue === "all") {
          router.push("/productOffline");
        } else {
          router.push(
            `/productOffline?category=${encodeURIComponent(nextValue)}`,
          );
        }
      }}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem
              className={`
  cursor-pointer rounded-md
    font-medium
    transition-colors
    hover:bg-muted
    focus:bg-primary/10
    focus:text-primary
                `}
              key={item.value}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
