"use client"

import { useDocumentAnalyzer } from "@/hooks/useDocumentAnalyzer";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileActions } from "./FileActions";
import { TaskSelector } from "./TaskSelector";
import { TextareaSection } from "./TextAreaSection";



const InputCard = ({

}) => {
 
  const { handleFileUpload ,handleAddText  ,selectedTask,
  setSelectedTask ,setNewText,newText,error,uploading} = useDocumentAnalyzer();

 
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Submit Document</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <TextareaSection
          newText={newText}
          setNewText={setNewText}
          error={error}
        />

        <TaskSelector
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />

        <FileActions
          handleAddText={handleAddText}
          handleFileUpload={handleFileUpload}
          uploading={uploading}
        />
      </CardContent>
    </Card>
  );
};

export default InputCard;
