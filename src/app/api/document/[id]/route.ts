import { NextResponse } from "next/server";

// Temporary in-memory document list
const documents = [
  {
    id: "1",
    title: "Elon Musk and SpaceX",
    text: "Elon Musk founded SpaceX in California.",
    summary: "The document talks about Elon Musk founding SpaceX.",
    confidence: 0.9,
    sentiment: { label: "Positive", score: 0.85 },
    entities: [
      { type: "PERSON", text: "Elon Musk" },
      { type: "ORG", text: "SpaceX" },
      { type: "LOCATION", text: "California" },
    ],
    keywords: [
      { word: "founder", relevance: 0.8 },
      { word: "space", relevance: 0.6 },
    ],
  },
];

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const doc = documents.find((d) => d.id === params.id);
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(doc);
}
