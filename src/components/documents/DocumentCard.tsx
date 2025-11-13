"use client";
import { DocumentProps, TaskType } from "@/types/document";
import { useState } from "react";
import { Card } from "../ui/card";
import DocumentActions from "./DocumentActions";
import DocumentEntities from "./DocumentEntites";
import DocumentError from "./DocumentError";
import DocumentHeader from "./DocumentHeader";
import DocumentMeta from "./DocumentMetaData";
import DocumentProgress from "./DocumentProgress";
import DocumentSentiment from "./DocumentSentiment";
import DocumentSummary from "./DocumentSummary";


function DocumentCard({
  document,
  onUpdateTitle,
  onDelete,
  handleReanalyze,
}: DocumentProps) {
 
  const wordCount = document.content.trim().split(/\s+/).length;
  const [selectedTask, setSelectedTask] = useState<
   TaskType
  >("summarization");

  return (
    <Card className="p-6 hover:shadow-md transition-all group">
      <div className="space-y-4">
        <DocumentHeader document={document} onUpdateTitle={onUpdateTitle} onDelete={onDelete} />
        <DocumentMeta date={document.createdAt} wordCount={wordCount} />

        {document.status === "processing" && <DocumentProgress />}

        <DocumentSummary summary={document.summary} />
        <DocumentSentiment sentiment={document.sentiment} />

        {document.entities?.length ? (
          <DocumentEntities entities={document.entities} />
        ) : null}

        {document.status !== "processing" && (
          <DocumentActions
            documentId={document.id}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            handleReanalyze={handleReanalyze}
        
          />
        )}

        {document.status === "error" && (
          <DocumentError message={document.errorMessage} />
        )}
      </div>
    </Card>
  );
}
export default DocumentCard;

