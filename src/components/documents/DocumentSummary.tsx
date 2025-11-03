interface Props {
  summary?: string;
}

export default function DocumentSummary({ summary }: Props) {
  if (!summary) return null;
  return (
    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
      {summary}
    </p>
  );
}
