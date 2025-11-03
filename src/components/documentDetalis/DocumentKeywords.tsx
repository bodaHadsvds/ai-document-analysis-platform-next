import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentKeywords({
  keywords,
}: {
  keywords: { word: string; relevance: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Keywords / Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {keywords.map((k, i) => (
            <Badge key={i} variant="outline">
              {k.word} ({Math.round(k.relevance * 100)}%)
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
