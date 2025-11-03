import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Entity {
  type: string;
  text: string;
}

export default function DocumentOriginalText({
  text,
  entities,
}: {
  text: string;
  entities: Entity[];
}) {
  const highlighted = highlightEntities(text, entities);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Original Text</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: highlighted }} />
        </p>
      </CardContent>
    </Card>
  );
}

function highlightEntities(text: string, entities: Entity[]) {
  let highlighted = text;
  entities.forEach((e) => {
    const regex = new RegExp(`\\b${e.text}\\b`, "gi");
    highlighted = highlighted.replace(
      regex,
      `<mark class="bg-yellow-200 px-1 rounded">${e.text}</mark>`
    );
  });
  return highlighted;
}
