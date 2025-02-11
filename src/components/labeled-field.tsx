import { cn } from "@/lib/cn";

import Label, { LabelProps } from "./label";

interface LabeledFieldProps
  extends LabelProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function LabeledField({
  label,
  htmlFor,
  className,
  children,
  ...props
}: LabeledFieldProps) {
  return (
    <div className={cn("flex flex-col space-y-3", className)} {...props}>
      <Label label={label} htmlFor={htmlFor} />
      {children}
    </div>
  );
}
