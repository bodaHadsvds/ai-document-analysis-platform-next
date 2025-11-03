import { Clock, FileText } from 'lucide-react';

interface Props {
  date: string;
  wordCount: number;
}

export default function DocumentMeta({ date, wordCount }: Props) {
   

  const formattedDate = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="flex items-center gap-4 text-sm text-slate-500">
      <div className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        {formattedDate}
      </div>
      <div className="flex items-center gap-1">
        <FileText className="w-4 h-4" />
        {wordCount} words
      </div>
    </div>
  );
}
