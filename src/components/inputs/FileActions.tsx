import { useRef } from "react";
import { Button } from "../ui/button";

interface FileActionsProps {
  handleAddText: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
}

export const FileActions: React.FC<FileActionsProps> = ({
  handleAddText,
  handleFileUpload,
  uploading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button onClick={handleAddText} className="w-full sm:w-auto">
        Analyze Text
      </Button>

      <Button
        variant="secondary"
        onClick={() => fileInputRef.current?.click()}
        className="w-full sm:w-auto"
      >
        {uploading ? "Uploading..." : "Upload .txt File"}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
};
