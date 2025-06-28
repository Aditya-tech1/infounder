'use client';

export default function AnalysisProgress({ status }) {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Analyzing your pitch...</h2>
        <p className="text-gray-600 mt-2">{status}</p>
      </div>
    </div>
  );
}