interface Props {
  message?: string;
}

export default function DocumentError({ message }: Props) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
      {message || 'An error occurred during analysis.'}
    </div>
  );
}
