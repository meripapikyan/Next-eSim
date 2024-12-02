"use client";
import { Option as LocaleOption } from "@/types/option";
import { Locale } from "@/types/locale";
import { Dropdown } from "@/ui/Dropdown";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { startTransition, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const localeOptions: LocaleOption[] = [
  { title: "ENG", value: Locale.English },
  { title: "RUS", value: Locale.Russian },
];

type Props = {
  onAction?: () => void;
};

export const LocaleDropdown = ({ onAction }: Props) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [countryData, setCountryData] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(searchParams.toString()).toString();
    setCountryData(`${pathname}?${query}`);
  }, [pathname, searchParams]);

  const switchLocale = (newLocale: string) => {
    onAction?.();
    startTransition(() => {
      const newPath = `${countryData}`;
      router.replace(newPath, { locale: newLocale });
    });
  };

  return (
    <Dropdown
      options={localeOptions}
      onSelect={(locale) => switchLocale(locale as Locale)}
      defaultOption={locale === Locale.Russian ? "RUS" : "ENG"}
    />
  );
};
