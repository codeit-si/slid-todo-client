export interface LabelProps {
  label: string;
}

export default function Label({ label }: LabelProps) {
  return (
    <label className="block text-base font-semibold text-slate-800">
      {label}
    </label>
  );
}
