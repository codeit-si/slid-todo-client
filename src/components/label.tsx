import { LabelHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export default function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn("block text-base font-semibold text-slate-800", className)}
      {...props}
    >
      {children}
    </label>
  );
}
