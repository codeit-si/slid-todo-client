export interface LabelProps {
  label: string;
  htmlFor?: string;
}

export default function Label({ label, htmlFor }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-base font-semibold text-slate-800"
    >
      {label}
    </label>
  );
}
