import { DocumentData } from "@/types/document";

import DocumentEntities from "./DocumentEntites";
import DocumentKeywords from "./DocumentKeywords";
import DocumentOriginalText from "./DocumentOriginalText";
import DocumentSentiment from "./DocumentSentiment";
import DocumentSummary from "./DocumentSummary";

export default function DocumentDetails({ doc }: { doc: DocumentData }) {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">{doc.title}</h1>

      <DocumentSummary summary={doc.summary} confidence={doc.confidence} />
      <DocumentSentiment label={doc.sentiment.label} score={doc.sentiment.score} />
      <DocumentEntities entities={doc.entities} />
      <DocumentKeywords keywords={doc.keywords} />
      <DocumentOriginalText text={doc.text} entities={doc.entities} />
    </div>
  );
}

