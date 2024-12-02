"use client";
import React, { useState } from "react";
import { Cross } from "@/assets/images/icons/Cross";
import { Menu } from "./components/Menu";
import styles from "./style.module.css";

export const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleToggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  return (
    <>
      <div className={styles["burger-menu"]}>
        {isMenuOpen ? (
          <button
            className={`${styles.button} ${styles["close-icon"]}`}
            onClick={handleToggleMenu}
            aria-label="Close menu"
            type="button"
          >
            {Cross}
          </button>
        ) : (
          <button
            className={`${styles.button} ${styles["burger-button"]}`}
            onClick={handleToggleMenu}
            type="button"
          >
            <span />
          </button>
        )}
      </div>
      <Menu isMenuOpen={isMenuOpen} handleToggleMenu={handleToggleMenu} />
    </>
  );
};
