"use client";

import { useCallback, useRef, useState } from "react";
import styles from "./style.module.css";
import { Arrow } from "@/assets/images/icons/Arrow";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Option } from "@/types/option";
import { RowItem } from "../RowItem";

type Props = {
  onSelect?: (val: string) => void;
  defaultOption?: string;
  options: Option[];
  open?: boolean;
};

type OptionInfo = Pick<Option, "title" | "value">;

export const Dropdown = ({ options, onSelect, defaultOption, open }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    defaultOption
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, setIsOpen, toggleRef);

  const handleOptionSelect = useCallback(
    (option: OptionInfo) => {
      setSelectedOption(option.title);
      setIsOpen(false);
      onSelect?.(option.value);
    },
    [onSelect]
  );

  return (
    <div className={styles.dropdown}>
      {defaultOption && (
        <div
          className={styles["dropdown-button"]}
          onClick={() => setIsOpen((prev) => !prev)}
          ref={toggleRef}
        >
          <span className={styles.title}>
            {selectedOption || defaultOption}
          </span>
          <span className={styles["reversed-arrow"]}>{Arrow}</span>
        </div>
      )}
      {(isOpen || open) && (
        <div className={styles.menu} ref={ref}>
          <div className={styles["menu-content"]}>
            {options.length > 0 ? (
              options.map((option) => (
                <>
                  {option.children ? (
                    <>{option.children}</>
                  ) : (
                    <RowItem
                      key={option.value}
                      onClick={handleOptionSelect}
                      option={option}
                      hovered
                      withPadding
                    >
                      <span className={styles.title}>{option.title}</span>
                    </RowItem>
                  )}
                </>
              ))
            ) : (
              <div className={styles["not-found"]}>Ничего не найдено :(</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
