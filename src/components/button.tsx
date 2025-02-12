import { ButtonHTMLAttributes, ReactNode } from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const ButtonVariants = cva(
  "flex items-center justify-center px-18 py-8 font-semibold",
  {
    variants: {
      variant: {
        solid:
          "bg-purple-500 hover:bg-purple-600 active:bg-purple-800 disabled:bg-slate-400 text-white",
        outlined:
          "border border-purple-500 text-purple-500 hover:border-purple-600 hover:text-purple-600 active:border-purple-800 active:text-purple-800 disabled:border-slate-400 disabled:text-slate-400",
      },
      shape: {
        square: "rounded-xl",
        round: "rounded-3xl",
      },
      size: {
        lg: "min-w-291 min-h-48 text-base",
        md: "min-w-150 min-h-44 text-base",
        sm: "min-w-84 min-h-36 text-sm",
      },
    },
    defaultVariants: {
      variant: "solid",
      shape: "square",
      size: "md",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  children: ReactNode;
}

export default function Button({
  type = "button",
  variant,
  size,
  shape,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(ButtonVariants({ variant, shape, size }), className)}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
