"use client";

import { documentSchema } from "@/validation/documentSchema";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DocumentItem, TaskType } from "../types/document";
import { useSSEAnalyzer } from "./useAnalyzer";
import { useDocumentsStore } from "./useDocumentStates";

export function useDocumentAnalyzer() {
  const { documents, addDocument, deleteDocument, updateDocument } = useDocumentsStore();
  const { analyzeDocument } = useSSEAnalyzer();

  const [newText, setNewText] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
const [selectedTask, setSelectedTask] = useState<TaskType>("summarization");

  const handleAddText = () => {
   const result = documentSchema.safeParse({ content: newText, task: selectedTask });

  if (!result.success) {
    setError(result.error.issues[0].message);
    return;
  }

    const newDoc: DocumentItem = {
      id: uuidv4(),
      title: "New Document",
      content: newText.trim(),
      createdAt: new Date().toISOString(),
      status: "idle",
    };

    addDocument(newDoc);
    setNewText("");
    setError("");
    analyzeDocument(newDoc ,selectedTask);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
     if (!file) return;

  const text = await file.text();
  const result = documentSchema.safeParse({ content: text.slice(0, 5000), task: selectedTask });

  if (!result.success) {
  setError(result.error.issues[0].message);
    return;
  }

  if (file.type !== "text/plain") return setError("Only .txt files supported.");
  if (file.size > 50 * 1024) return setError("File size exceeds 50KB limit.");

  setUploading(true);

    const newDoc: DocumentItem = {
      id: uuidv4(),
      title: file.name.replace(".txt", ""),
      content: text.slice(0, 5000),
      createdAt: new Date().toISOString(),
      status: "idle",
    };

    addDocument(newDoc);
    setError("");
    analyzeDocument(newDoc ,selectedTask);
      setUploading(false);
  };
 const handleReanalyze = (id: string ,task:TaskType) => {
    const doc = documents.find((d) => d.id === id);
    if (doc) analyzeDocument(doc ,task);
  };
  return {
    documents,
    newText,
    error,
    uploading,
    setNewText,
    handleAddText,
    handleFileUpload,
    handleReanalyze,
    handleDelete: deleteDocument,
    handleUpdateTitle: (id: string, newTitle: string) =>
  updateDocument(id, (current) => ({
    ...current,
    title: newTitle,
    
  })),
  selectedTask,
  setSelectedTask
  };
}
