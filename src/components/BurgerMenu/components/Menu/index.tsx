"use client";

import React, { useEffect, useRef } from "react";
import { useBodyOverflow } from "@/hooks/useBodyOverflow";

import styles from "./style.module.css";
import { LocaleDropdown } from "@/components/LocaleDropdown";
import { Button } from "@/ui/Button";
import { useAuthorization } from "@/provider/AuthorizationProvider";
import { useTranslations } from "next-intl";
import { paths } from "@/app/paths";
import { useRouter } from "@/i18n/routing";

export const Menu = ({
  isMenuOpen,
  handleToggleMenu,
}: {
  isMenuOpen: boolean;
  handleToggleMenu: () => void;
}) => {
  const { logout } = useAuthorization();
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations();
  const router = useRouter();

  const isMenuOpenWithContainer =
    isMenuOpen && Boolean(menuContainerRef.current);

  useBodyOverflow(isMenuOpenWithContainer);

  useEffect(() => {
    if (isMenuOpenWithContainer && menuContainerRef.current) {
      menuContainerRef.current.style.overflow = "auto";
    } else if (menuContainerRef.current) {
      menuContainerRef.current.style.overflow = "hidden";
    }

    const cleanUpRef = menuContainerRef.current;

    return () => {
      if (cleanUpRef) {
        document.body.style.overflow = "unset";
        cleanUpRef.style.overflow = "unset";
      }
    };
  }, [isMenuOpenWithContainer, isMenuOpen]);

  return (
    <div
      className={`${styles.menu} ${isMenuOpen ? styles["menu-open"] : ""}`}
      ref={menuContainerRef}
    >
      <div className={styles["menu-content"]}>
        <LocaleDropdown onAction={() => handleToggleMenu()} />
        <Button
          onClick={() => {
            logout();
            handleToggleMenu();
            router.replace(`/${paths.main}`);
          }}
        >
          {t("signOut")}
        </Button>
      </div>
    </div>
  );
};
