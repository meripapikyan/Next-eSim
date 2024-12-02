import { CSSProperties, FC, PropsWithChildren } from "react";
import styles from "./style.module.css";

export const ContentBlock: FC<PropsWithChildren<{ style?: CSSProperties }>> = ({
  children,
  style,
}) => {
  return (
    <div style={style} className={styles.content}>
      {children}
    </div>
  );
};
