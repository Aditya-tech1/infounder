'use client';

export default function ResultsDisplay({ results }) {
  if (!results) return null;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
        <div className="mt-2 flex items-center">
          <div className="text-3xl font-bold text-blue-600">
            {results.overallScore.toFixed(1)}/10
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-700">Confidence Score</div>
            <div className="w-32 bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${results.confidenceScore * 10}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Delivery Analysis</h3>
          <div className="space-y-3">
            {results.deliveryFeedback.map((feedback, index) => (
              <div key={index} className="flex items-start">
                <div className={`mr-3 mt-1 w-2 h-2 rounded-full ${
                  feedback.sentiment === 'positive' ? 'bg-green-500' : 
                  feedback.sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <p className="text-gray-700">{feedback.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Deck Analysis</h3>
          <div className="space-y-3">
            {results.deckFeedback.map((feedback, index) => (
              <div key={index} className="flex items-start">
                <div className={`mr-3 mt-1 w-2 h-2 rounded-full ${
                  feedback.sentiment === 'positive' ? 'bg-green-500' : 
                  feedback.sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <p className="text-gray-700">{feedback.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 border-t">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Actionable Recommendations</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {results.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}