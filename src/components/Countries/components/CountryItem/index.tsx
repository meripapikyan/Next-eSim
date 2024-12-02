"use client";
import { useRouter } from "@/i18n/routing";
import { CountryData } from "@/types/countries";
import styles from "./style.module.css";
import { RowItem } from "@/ui/RowItem";
import { CountryImage } from "@/ui/CountryImage";
import { getCountryPath } from "../../utils";

export const CountryItem = ({
  country,
  bordered,
  showArrow,
  hovered,
  withPadding,
}: {
  country: CountryData;
  bordered: boolean;
  showArrow?: boolean;
  hovered?: boolean;
  withPadding?: boolean;
}) => {
  const router = useRouter();

  const pushOptions = getCountryPath(country);

  return (
    <RowItem
      option={{ title: country.country, value: country.url }}
      onClick={() => router.push(pushOptions)}
      key={country.id}
      bordered={bordered}
      showArrow={showArrow}
      hovered={hovered}
      withPadding={withPadding}
    >
      <div className={styles.country}>
        <div className={styles.image}>
          <CountryImage
            width={32}
            height={32}
            src={country.icon}
            alt={country.country}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{country.country}</div>
          <div className={styles.cost}>
            from {country.price.symbol}
            {country.price_per_day.amount ?? 0}/{country.cost_per_gb ?? 0}
            GB
          </div>
        </div>
      </div>
    </RowItem>
  );
};
