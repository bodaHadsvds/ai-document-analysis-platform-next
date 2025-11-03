"use client";
import { useId } from "react";
import { Button } from "../ui/button";

interface DocumentActionsProps {
  documentId: string;
  selectedTask: "summarization" | "sentiment" | "ner";
  setSelectedTask: React.Dispatch<
    React.SetStateAction<"summarization" | "sentiment" | "ner">
  >;
  handleReanalyze: (id: string, task: "summarization" | "sentiment" | "ner") => void;
  router: any;
}

export default function DocumentActions({
  documentId,
  selectedTask,
  setSelectedTask,
  handleReanalyze,
  router,
}: DocumentActionsProps) {
  
const uniqueId = useId(); 
  const getButtonStyle = () => {
    switch (selectedTask) {
      case "summarization":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "sentiment":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "ner":
        return "bg-orange-600 hover:bg-orange-700 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
        <select
        id={`${uniqueId}-task`}
        name="task"
          value={selectedTask}
          onChange={(e) =>
            setSelectedTask(
              e.target.value as "summarization" | "sentiment" | "ner"
            )
          }
          className="border rounded-md px-2 py-1 text-sm"
        >
          <option value="summarization">🧠 Summarize</option>
          <option value="sentiment">😊 Sentiment</option>
          <option value="ner">🏷️ Entities</option>
        </select>

      <Button
        size="sm"
        onClick={() => handleReanalyze(documentId, selectedTask)}
        className={getButtonStyle()}
      >
        Re-analyze ({selectedTask})
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push(`/document/${documentId}`)}
      >
        View Details
      </Button>
    </div>
  );
}
