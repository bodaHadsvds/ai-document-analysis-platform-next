import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Entity {
  type: string;
  text: string;
}

export default function DocumentEntities({ entities }: { entities: Entity[] }) {
  const grouped = entities.reduce((acc: Record<string, string[]>, e) => {
    if (!acc[e.type]) acc[e.type] = [];
    acc[e.type].push(e.text);
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Named Entities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(grouped).map(([type, items]) => (
          <div key={type}>
            <h4 className="font-semibold">{type}</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {items.map((text, i) => (
                <Badge key={i} variant="secondary">
                  {text}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
