interface Props {
  title: string;
  description?: string;
}

export const CustomHeader = ({ title, description }: Props) => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
      {description && <p className="text-sm text-slate-600">{description}</p>}
    </div>
  );
};
