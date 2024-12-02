"use client";

import { useDeviceType } from "@/hooks/useDeviceType";
import { SliderItem } from "./components/SliderItem";
import styles from "./style.module.css";

import { ContentBlock } from "@/ui/ContentBlock";
import { useTranslations } from "next-intl";

export const Slider = () => {
  const { isDesktop } = useDeviceType();
  const t = useTranslations();

  const marginTop = isDesktop ? "40px" : "8px";
  return (
    <ContentBlock style={{ marginTop }}>
      <div className={styles.slider}>
        <h4>{t("faq")}</h4>
        <div className={styles.content}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <SliderItem key={idx} />
          ))}
        </div>
      </div>
    </ContentBlock>
  );
};
