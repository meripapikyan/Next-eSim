"use client";

import { useTranslations } from "next-intl";
import styles from "./style.module.css";

export const SliderItem = () => {
  const t = useTranslations();
  return (
    <div className={styles.item}>
      <div className={styles.title}>{t("longTitle")}</div>
      <div className={styles.block} />
    </div>
  );
};
