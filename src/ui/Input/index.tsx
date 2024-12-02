"use client";

import { SearchIcon } from "@/assets/images/icons/Search";
import styles from "./style.module.css";

import { FC } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  shouldSearch?: boolean;
};

export const Input: FC<InputProps> = ({ shouldSearch = false, ...rest }) => {
  return (
    <div className={styles["input-block"]}>
      {shouldSearch && (
        <span className={styles["search-icon"]}>{SearchIcon}</span>
      )}
      <input
        style={!shouldSearch ? { padding: "12px 24px 12px 15px" } : {}}
        className={styles.input}
        {...rest}
      />
    </div>
  );
};
