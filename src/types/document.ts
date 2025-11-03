export interface DocumentItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  status: "idle" | "processing" | "completed" | "error";
  summary?: string;
  sentiment?: { label: string; score: number };
  entities?: { type: string; value: string }[];
  errorMessage?: string;
}

export interface DocumentProps {
  document: DocumentItem;
  onUpdateTitle: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
   handleReanalyze: (id: string ,task:"summarization" | "sentiment" | "ner") => void; 
}
export interface StatusBadgeProps {
  status: 'idle' | 'processing' | 'completed' | 'error';
}
export type EntityType = "PERSON" | "ORG" | "LOCATION" | "DATE" | "EVENT" | "OTHER";
export interface Entity {
  type: EntityType;
  text: string;
}

export interface DocumentData {
  id: string;
  title: string;
  text: string;
  summary: string;
  confidence: number;
  sentiment: {
    label: "Positive" | "Negative" | "Neutral";
    score: number;
  };

  
  entities: Entity[];
  keywords: {
    word: string;
    relevance: number;
  }[];
}
