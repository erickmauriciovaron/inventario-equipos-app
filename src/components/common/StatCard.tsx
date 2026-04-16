interface Props {
  label: string;
  value: number;
}

export const StatCard = ({ label, value }: Props) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    </article>
  );
};
