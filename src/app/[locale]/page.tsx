"use client";

import styles from "./page.module.css";
import { Input } from "@/ui/Input";
import { Countries } from "@/components/Countries";
import { Dropdown } from "@/ui/Dropdown";
import { Slider } from "@/components/Slider";
import { useCountries } from "@/components/hooks/useCountries";
import { useTranslations } from "next-intl";

export default function Home() {
  const { countries, searchedOptions, searchQuery, onChange } = useCountries();
  const t = useTranslations();

  return (
    <div className={styles.page}>
      <h1>{t("simTitle")}</h1>
      <Input
        placeholder={t("findDirection")}
        value={searchQuery}
        onChange={onChange}
        shouldSearch
      />
      <Dropdown options={searchedOptions} open={Boolean(searchQuery)} />
      <Countries countries={countries} />
      <Slider />
    </div>
  );
}
