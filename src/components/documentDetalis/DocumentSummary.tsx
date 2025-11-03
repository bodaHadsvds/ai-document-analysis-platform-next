import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentSummary({
  summary,
  confidence,
}: {
  summary: string;
  confidence: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{summary}</p>
        <p className="text-sm text-gray-500 mt-2">
          Confidence: {Math.round(confidence * 100)}%
        </p>
      </CardContent>
    </Card>
  );
}
