"use client";

import { useEffect } from "react";

export const useBodyOverflow = (shouldHideOverflow: boolean) => {
  useEffect(() => {
    if (shouldHideOverflow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [shouldHideOverflow]);
};
