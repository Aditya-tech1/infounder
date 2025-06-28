'use client';

import { useState } from 'react';
import AnalysisProgress from './components/AnalysisProgress';
import ResultsDisplay from './components/ResultsDisplay';
import { analyzePitch, checkAnalysisStatus } from '../lib/api';
import { UploadCloud, FileText, Video } from 'lucide-react';
import { WarningIcon } from '../../public/icons';

export default function Home() {
  const [video, setVideo] = useState(null);
  const [deck, setDeck] = useState(null);
  const [analysisState, setAnalysisState] = useState('idle');
  const [results, setResults] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleUpload = async () => {
    if (!video || !deck) {
      setStatusMessage('Please upload both a video and a pitch deck.');
      setAnalysisState('error');
      return;
    }

    try {
      setAnalysisState('processing');
      setStatusMessage('Uploading files...');

      const response = await analyzePitch({ video, deck });

      if (response.jobId) {
        setJobId(response.jobId);
        pollAnalysisStatus(response.jobId);
      } else {
        setAnalysisState('error');
        setStatusMessage('Failed to start analysis.');
      }
    } catch (error) {
      console.error(error);
      setAnalysisState('error');
      setStatusMessage(error.message || 'Analysis failed.');
    }
  };

  const pollAnalysisStatus = async (jobId) => {
    try {
      setStatusMessage('Processing video...');
      let status = 'processing';

      while (status === 'processing') {
        const response = await checkAnalysisStatus(jobId);
        status = response.status;

        if (status === 'processing') {
          setStatusMessage(response.message || 'Analyzing...');
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else if (status === 'completed') {
          setAnalysisState('completed');
          setResults(response.results);
          return;
        } else {
          setAnalysisState('error');
          return;
        }
      }
    } catch (error) {
      console.error(error);
      setAnalysisState('error');
      setStatusMessage('Failed to check status.');
    }
  };

  const renderUploadCard = (label, icon, onFileSelect, acceptedTypes) => (
    <div className="flex-1 bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:border-blue-400 transition duration-200">
      <div className="flex items-center space-x-3 mb-4 text-blue-600">
        {icon}
        <h3 className="text-lg font-semibold">{label}</h3>
      </div>
      <input
        type="file"
        accept={acceptedTypes}
        onChange={(e) => onFileSelect(e.target.files[0])}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-blue-50 to-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">AI-Powered Pitch Analyzer</h1>
        <p className="mt-4 text-lg text-gray-600">Upload your pitch video and deck to receive instant, AI-based feedback</p>
      </div>

      {analysisState === 'idle' && (
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {renderUploadCard('Upload Pitch Video', <Video className="h-6 w-6" />, setVideo, 'video/*')}
            {renderUploadCard('Upload Pitch Deck (PDF)', <FileText className="h-6 w-6" />, setDeck, '.pdf')}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleUpload}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition"
            >
              <UploadCloud className="h-5 w-5" />
              Analyze Pitch
            </button>
          </div>
        </div>
      )}

      {analysisState === 'processing' && <AnalysisProgress status={statusMessage} />}

      {analysisState === 'completed' && results && <ResultsDisplay results={results} />}

      {analysisState === 'error' && (
        <div className=" mx-auto mt-10 bg-white border border-red-300 text-center rounded-xl p-8 shadow-lg">
          <div className="text-red-500 mb-3">
              <WarningIcon className="mx-auto h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Analysis Failed</h2>
          <p className="text-gray-600">{statusMessage || 'Something went wrong during analysis.'}</p>
          <button
            onClick={() => {
              setAnalysisState('idle');
              setVideo(null);
              setDeck(null);
              setStatusMessage('');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
