"use client";

import { FC, PropsWithChildren, RefObject, useRef } from "react";
import styles from "./style.module.css";
import { useBodyOverflow } from "@/hooks/useBodyOverflow";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Cross } from "@/assets/images/icons/Cross";

type Props = {
  title?: string;
  isOpen: boolean;
  toggle: (val: boolean) => void;
  toggleRef?: RefObject<HTMLElement>;
};

export const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  isOpen,
  toggle,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, toggle);
  useBodyOverflow(isOpen);

  return (
    <>
      <div className={styles.modal} ref={ref}>
        <div className={styles.container}>
          <div className={styles.close} onClick={() => toggle(false)}>
            {Cross}
          </div>
          <div className={styles.title}>{title}</div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  );
};
