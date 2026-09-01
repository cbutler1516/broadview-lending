import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide" | "editorial";
  padding?: "default" | "editorial";
};

const sizeStyles = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
  editorial: "max-w-6xl",
};

const paddingStyles = {
  default: "px-4 sm:px-6 lg:px-8",
  editorial: "px-5 sm:px-8 lg:px-12 xl:px-16",
};

export function Container({
  children,
  className = "",
  size = "default",
  padding = "default",
}: ContainerProps) {
  return (
    <div className={`${sizeStyles[size]} mx-auto ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
}
