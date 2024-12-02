"use client";

import { Option } from "@/types/option";
import { FC, PropsWithChildren } from "react";

import styles from "./style.module.css";
import { Arrow } from "@/assets/images/icons/Arrow";

type Props = {
  option: Option;
  onClick: (val: Pick<Option, "title" | "value">) => void;
  hovered?: boolean;
  withPadding?: boolean;
  bordered?: boolean;
  showArrow?: boolean;
};

export const RowItem: FC<PropsWithChildren<Props>> = ({
  children,
  option,
  onClick,
  hovered = false,
  withPadding = false,
  bordered = false,
  showArrow = true,
}) => {
  const itemClass = [
    styles.item,
    hovered ? styles.hovered : "",
    withPadding ? styles.padding : "",
    bordered ? styles.bordered : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={itemClass}
      onClick={() => onClick({ title: option.title, value: option.value })}
    >
      <div className={styles.children}>{children}</div>
      {showArrow && <span>{Arrow}</span>}
    </div>
  );
};
