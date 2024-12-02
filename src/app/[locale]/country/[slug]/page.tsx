"use client";

import React from "react";
import { ContentBlock } from "@/ui/ContentBlock";
import { useSearchParams } from "next/navigation";
import styles from "./style.module.css";
import { CountryImage } from "@/ui/CountryImage";
import { Slider } from "@/components/Slider";
import { useTranslations } from "next-intl";

const Country = () => {
  const searchParams = useSearchParams();
  const t = useTranslations();

  const countryName = searchParams.get("country");
  const iso = searchParams.get("iso");
  const firstOperatorPhoneView = searchParams.get("firstOperatorPhoneView");
  const secondOperatorPhoneView = searchParams.get("secondOperatorPhoneView");

  const countryImage = `/flags/${iso}.svg`;

  return (
    <div className={styles.country}>
      <ContentBlock>
        <div className={styles.info}>
          <div className={styles.left}>
            <h1>{countryName}</h1>
            <p>{t("travelSim")}</p>
          </div>
          <div className={styles.right}>
            <CountryImage
              width={32}
              height={32}
              src={countryImage}
              alt={countryName || "Country Name"}
            />
          </div>
        </div>
      </ContentBlock>

      <div className={styles["country-and-operators"]}>
        <ContentBlock>
          <h2>{t("countriesOperators")}</h2>
          <div className={styles.content}>
            <div>
              <CountryImage
                width={32}
                height={32}
                src={countryImage}
                alt={countryName || "Country Name"}
              />
              <div className={styles["country-title"]}>{countryName}</div>
            </div>

            <div className={styles.right}>
              {firstOperatorPhoneView && (
                <div className={styles.operators}>
                  {t("operator")} 1 - {firstOperatorPhoneView}
                </div>
              )}
              {secondOperatorPhoneView && (
                <div className={styles.operators}>
                  {t("operator")} 2 - {secondOperatorPhoneView}
                </div>
              )}
            </div>
          </div>
        </ContentBlock>
      </div>

      <Slider />
    </div>
  );
};

export default Country;
