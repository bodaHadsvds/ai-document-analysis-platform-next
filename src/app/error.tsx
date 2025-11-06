'use client';


type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
 

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h2 className="text-2xl font-semibold mb-2">Something went wrong 😢</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Try again
      </button>
    </div>
  );
}