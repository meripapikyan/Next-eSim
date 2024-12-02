"use client";

import styles from "./style.module.css";
import { CountryData } from "@/types/countries";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/ui/Button";
import spinner from "@/assets/images/img/spinner.svg";
import { CountryItem } from "./components/CountryItem";
import { useDeviceType } from "@/hooks/useDeviceType";
import { ContentBlock } from "@/ui/ContentBlock";
import { useTranslations } from "next-intl";

export const Countries = ({ countries }: { countries: CountryData[] }) => {
  const [allCountries, setAllCountries] = useState<CountryData[]>(countries);
  const [showMore, setShowMore] = useState(false);
  const { isDesktop } = useDeviceType();
  const t = useTranslations();

  useEffect(() => {
    // Effect to update the displayed countries based on the "showMore" state.

    // Get the list of popular countries (filtered by a "popular" property).
    const popularCountries = countries.filter(
      (country) => Number(country.popular) > 0
    );

    // Get additional countries (up to 4) that are not in the popular list.
    const additionalCountries = countries
      .filter((country) => !popularCountries.includes(country))
      .slice(0, 4);

    const combinedCountries = [...popularCountries, ...additionalCountries];
    setAllCountries(showMore ? countries : combinedCountries);
  }, [countries, showMore]);

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const marginTop = isDesktop ? "40px" : "10px";

  return (
    <ContentBlock style={{ marginTop }}>
      <div className={styles.content}>
        <h4>{showMore ? t("allCountries") : t("popularCountries")}</h4>
        {/* Display a spinner when there are no countries available */}
        {allCountries.length === 0 && (
          <div className={styles.spinner}>
            <Image src={spinner} alt="spinner" />
          </div>
        )}

        <div className={styles["countries-block"]}>
          {/* Displays a spinner if no countries are available, otherwise lists them */}
          {allCountries?.map((country) => (
            <CountryItem
              key={country.id}
              country={country}
              bordered={isDesktop}
            />
          ))}
        </div>

        <div className={styles.btn}>
          <Button onClick={handleShowMore}>
            {showMore ? t("showAllPopularCountries") : t("showAllCountries")}
          </Button>
        </div>
      </div>
    </ContentBlock>
  );
};
