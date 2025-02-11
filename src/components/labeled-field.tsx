import Label, { LabelProps } from "./label";

interface LabeledFieldProps extends LabelProps {
  children: React.ReactNode;
}

export default function LabeledField({ label, children }: LabeledFieldProps) {
  return (
    <div className="flex flex-col space-y-3">
      <Label label={label} />
      {children}
    </div>
  );
}
