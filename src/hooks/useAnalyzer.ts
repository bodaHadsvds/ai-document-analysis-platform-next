"use client";

import { streamAnalysis } from "@/services/documentService";
import { toast } from "sonner";
import { DocumentItem } from "../types/document";
import { useDocumentsStore } from "./useDocumentStates";

export function useSSEAnalyzer(

) {
  const updateDocument = useDocumentsStore((state) => state.updateDocument);
  const analyzeDocument = async (
    doc: DocumentItem,
    task: "summarization" | "sentiment" | "ner"
  ) => {
    updateDocument(doc.id, (current) => ({ ...current, status: "processing" }));

    try {
      await streamAnalysis(doc.content, task, (data) => {
        switch (data.task) {
          case "summarization":
            if (data.chunk) {
              updateDocument(doc.id, (current) => ({
                ...current,
                summary: (current.summary || "") + " " + data.chunk,
              }));
            }
            if (data.done) {
              updateDocument(doc.id, (current) => ({
                ...current,
                summary: data.result || current.summary,
                status: "completed",
              }));
              toast.success(`🧠 "${doc.title}" summarized!`);
            }
            break;

          case "sentiment":
            if (data.done && data.result) {
              const { label, score } = data.result;
              let color = "gray",
                emoji = "😐";

              if (label === "POSITIVE" && score > 0.8)
                (color = "green"), (emoji = "😊");
              else if (label === "NEGATIVE" && score > 0.8)
                (color = "red"), (emoji = "😡");
              else (color = "yellow"), (emoji = "😐");

              updateDocument(doc.id, (current) => ({
                ...current,
                sentiment: { label, score },
                status: "completed",
              }));

              toast.success(
                `${emoji} ${label} (${(score * 100).toFixed(1)}%) for "${doc.title}"`,
                { style: { background: color } }
              );
            }
            break;

          case "ner":
            if (data.entity) {
              updateDocument(doc.id, (current) => ({
                ...current,
                entities: [...(current.entities || []), data.entity],
              }));
            }
            if (data.done) {
              updateDocument(doc.id, (current) => ({
                ...current,
                entities: data.result,
                status: "completed",
              }));
              toast.success(`🏷️ Entities extracted for "${doc.title}"`);
            }
            break;

          default:
            if (data.status === "error") {
              updateDocument(doc.id, (current) => ({
                ...current,
                status: "error",
                errorMessage: data.message,
              }));
              toast.error(`❌ Error analyzing "${doc.title}"`);
            }
        }
      });
    } catch (err: any) {
      updateDocument(doc.id, (current) => ({
        ...current,
        status: "error",
        errorMessage: err.message,
      }));
      toast.error(`Error: ${err.message}`);
    }
  };

  return { analyzeDocument };
}

