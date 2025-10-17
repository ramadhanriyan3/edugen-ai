"use client";

import { ReactNode, useEffect, useState } from "react";

interface FadeInWrapperProps {
  children: ReactNode;
  variant: "top" | "bottom" | "left" | "right";
  delay?: number;
}

const FadeInWrapper = ({
  children,
  variant,
  delay = 0,
}: FadeInWrapperProps) => {
  const [isVisible, setIsvisible] = useState(false);

  let fadeIn;

  useEffect(() => {
    setIsvisible(true);
  }, []);

  switch (variant) {
    case "top":
      fadeIn = isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-2";
      break;
    case "bottom":
      fadeIn = isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-2";
      break;
    case "left":
      fadeIn = isVisible
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-2";
      break;
    case "right":
      fadeIn = isVisible
        ? "opacity-100 translate-x-0"
        : "opacity-0 translate-x-2";
      break;
    default:
      fadeIn = "opacity-100 translate-y-0";
  }
  return (
    <div
      className={`transition-all duration-1000 ease-in ${fadeIn}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeInWrapper;
