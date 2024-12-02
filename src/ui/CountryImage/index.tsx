import Image from "next/image";
import styles from "./style.module.css";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export const CountryImage = ({ src, alt, width = 32, height = 32 }: Props) => {
  return (
    <div className={styles.image}>
      <Image width={width} height={height} src={src} alt={alt} />
    </div>
  );
};
