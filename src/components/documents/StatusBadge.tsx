'use client';

import { Badge } from '@/components/ui/badge';
import { StatusBadgeProps } from '@/types/document';


export default function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<StatusBadgeProps['status'], { color: string; label: string }> = {
    idle: { color: 'bg-gray-200 text-gray-700', label: 'Idle' },
    processing: { color: 'bg-blue-100 text-blue-700 animate-pulse', label: 'Processing' },
    completed: { color: 'bg-green-100 text-green-700', label: 'Completed' },
    error: { color: 'bg-red-100 text-red-700', label: 'Error' },
  };

  const { color, label } = variants[status];

  return <Badge className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}>{label}</Badge>;
}
