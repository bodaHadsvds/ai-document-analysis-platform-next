
interface SentimentProps {
  sentiment?: {
    label: string;
    score: number;
  };
}

export default function DocumentSentiment({ sentiment }: SentimentProps) {
  if (!sentiment) return null;

  const { label, score } = sentiment;
  const confidence = (score * 100).toFixed(1);

  let color = "text-gray-600";
  let emoji = "😐";

  if (label === "POSITIVE" && score > 0.7) {
    color = "text-green-600";
    emoji = "😊";
  } else if (label === "NEGATIVE" && score > 0.7) {
    color = "text-red-600";
    emoji = "😡";
  } else {
    color = "text-yellow-600";
    emoji = "😐";
  }

  return (
    <div className={`text-sm font-medium ${color} flex items-center gap-1`}>
      <span>{emoji}</span>
      <span>
        Sentiment: {label} ({confidence}%)
      </span>
    </div>
  );
}
