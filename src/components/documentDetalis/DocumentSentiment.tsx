import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DocumentSentiment({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">
          Sentiment: <strong>{label}</strong>
        </p>
        <Progress value={score * 100} className="mt-2" />
      </CardContent>
    </Card>
  );
}
