"use client";
import "./style.css";

import React, { PropsWithChildren } from "react";

export const Button = React.forwardRef<
  HTMLButtonElement,
  PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>
>(({ children, onClick }, ref) => {
  return (
    <button className="button" ref={ref} onClick={onClick}>
      {children}
    </button>
  );
});

Button.displayName = "Button";
