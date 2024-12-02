import { Locale } from "@/types/locale";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [Locale.English, Locale.Russian],
  defaultLocale: Locale.English,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
