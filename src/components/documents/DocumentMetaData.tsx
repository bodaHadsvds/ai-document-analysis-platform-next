import { Clock, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  date: string;
  wordCount: number;
}

export default function DocumentMeta({ date, wordCount }: Props) {
   

  const [formattedDate, setFormattedDate] = useState("");
    useEffect(() => {
    const parsedDate = new Date(date);
    const englishDate = parsedDate.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    
    });
    setFormattedDate(englishDate);
  }, [date]);
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
