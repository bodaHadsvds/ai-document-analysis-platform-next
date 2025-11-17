import { Textarea } from "../ui/textarea";

interface TextareaSectionProps {
  newText: string;
  setNewText: (value: string) => void;
  error?: string;
}

export const TextareaSection: React.FC<TextareaSectionProps> = ({
  newText,
  setNewText,
  error,
}) => {
  return (
    <div>
      <Textarea
        id="document-content"
        name="document-content"
        placeholder="Enter text here (max 5000 chars)..."
        value={newText}
        maxLength={5000}
        onChange={(e) => setNewText(e.target.value)}
        className="
          min-h-[120px]   
          bg-gray-100 text-gray-800 
          border
          border-gray-300 rounded-md p-2
          resize-none
          outline-none
          transition-all duration-200
          focus:bg-white            
          focus:outline-none
          focus:shadow-[0_0_18px_rgba(59,130,245,0.5)]  
      "
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
