interface TaskSelectorProps {
  selectedTask: "summarization" | "sentiment" | "ner";
  setSelectedTask: (value: "summarization" | "sentiment" | "ner") => void;
}

export const TaskSelector: React.FC<TaskSelectorProps> = ({
  selectedTask,
  setSelectedTask,
}) => {
  const tasks = [
    { id: "summarization", label: "Summarization", color: "text-blue-600" },
    { id: "sentiment", label: "Sentiment", color: "text-green-600" },
    { id: "ner", label: "Entities", color: "text-orange-600" },
  ];

  return (
    <div className="flex x flex-col sm:flex-row  items-center  sm:gap-2 gap-4">
      {tasks.map(({ id, label, color }) => (
        <label
          htmlFor={`task-${id}`}
          key={id}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name="task"
              id={`task-${id}`}
            value={id}
            checked={selectedTask === id}
            onChange={() => setSelectedTask(id as any)}
          />
          <span className={`${color} font-medium`}>{label}</span>
        </label>
      ))}
    </div>
  );
};
