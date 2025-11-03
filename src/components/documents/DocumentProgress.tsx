import { Progress } from '../ui/progress';

export default function DocumentProgress() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-slate-600">
        <span>Analyzing document...</span>
      </div>
      <Progress value={60} className="h-2" />
    </div>
  );
}