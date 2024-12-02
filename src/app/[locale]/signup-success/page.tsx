"use client";

import { useTranslations } from "next-intl";
import styles from "./style.module.css";

import { useSearchParams } from "next/navigation";
import React from "react";

const SignUpSuccess = () => {
  const t = useTranslations();
  const params = useSearchParams();
  const email = params.get("email");

  return <div className={styles.title}>{t("viaEmail", { email })}</div>;
};

export default SignUpSuccess;
