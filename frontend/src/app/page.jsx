'use client';

import { useState } from 'react';
import AnalysisProgress from '../components/AnalysisProgress';
import ResultsDisplay from '../components/ResultsDisplay';
import { analyzePitch, checkAnalysisStatus } from '../lib/api';
import { UploadCloud, FileText, Video } from 'lucide-react';
import { WarningIcon } from '../../public/icons/icon';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import HowWorks from '@/components/HowWorks';
import Features from '@/components/Features';
import Contact from '@/components/Contact';


export default function Home() {
  const [video, setVideo] = useState(null);
  const [deck, setDeck] = useState(null);
  const [videoType, setVideoType] = useState('');
  const [deckType, setDeckType] = useState('');
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
      console.log('Backend response:', response);

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

  const pollAnalysisStatus = async (taskId, onComplete) => {
    try {
      let status = 'processing';

      while (status === 'processing') {
        const response = await checkAnalysisStatus(taskId); // Already parsed JSON

        status = response.status;

        console.log(`Polling... Status: ${status}`);

        if (status === 'completed') {
          onComplete(response.result);
          // console.log(response.result)
          // document.writeln('Analysis completed successfully' , response.result);
          setResults(response.results);
          setAnalysisState('completed');
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3s before next check
      }
    } catch (error) {
      console.error('Polling failed:', error);
    }
  };



  const renderUploadCard = (label, icon, onFileSelect, acceptedTypes, fileTypeSetter, fileType) => (
    <div className="bg-[#00000000] border h-[16rem] shadow-md rounded-[10px] p-6 flex flex-col gap-[20px] w-[40%] m-auto items-center justify-center hover:shadow-lg transition-shadow duration-300 relative">
      <div className="flex items-center space-x-3 mb-4 text-blue-600 absolute w-[100%] top-[12px] bg-[#ff000000] text-center justify-center">
        {icon} &nbsp;&nbsp;
        <h3 className="text-lg font-semibold">{label}</h3>
      </div>
      <input
        type="file"
        name='file'
        accept={acceptedTypes}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            onFileSelect(file);
            const ext = file.name.split('.').pop();
            fileTypeSetter(ext);
          }
        }}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-[100%] h-[100%] bg-[#23456723] cursor-pointer opacity-0"
      />
      <UploadCloud className="h-[50px] w-[50px] absolute text-[#ffffff88]" />

      {fileType && (
        <div style={{ marginTop: '10px', marginBottom: '20px', fontSize: '1.2rem', color: '#6B7280', textAlign: 'center' }}>

          File type: <span className="font-medium">{fileType}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400">AI-Powered Pitch Analyzer</h1>
        <p className="mt-4 text-lg text-gray-600">Upload your pitch video and deck to receive instant, AI-based feedback</p>
      </div>

      {analysisState === 'idle' && (
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-[40px] flex-row">
            {renderUploadCard('Upload Pitch Video', <Video className="h-6 w-6" />, setVideo, 'video/*', setVideoType, videoType)}
            {renderUploadCard('Upload Pitch Deck (PDF)', <FileText className="h-6 w-6" />, setDeck, '.pdf', setDeckType, deckType)}
          </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleUpload}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-[100px] text-lg hover:bg-blue-700 transition mt-[25px] cursor-pointer p-[10px] px-[30px] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UploadCloud className="h-5 w-5" />
                Analyze Pitch
              </button>
            </div>
          </div>
        )}

        {analysisState === 'processing' && <AnalysisProgress status={statusMessage} />}

        {analysisState === 'completed' && results && (<ResultsDisplay results={results} />)}


      {analysisState === 'error' && (
        <div className="mx-auto mt-10 bg-white border border-red-300 text-center rounded-xl p-8 shadow-lg max-w-xl">
          <div className="text-red-500 mb-3">
            <WarningIcon className="mx-auto h-[50px] aspect-square text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Analysis Failed</h2>
          <p className="text-gray-600">{statusMessage || 'Something went wrong during analysis.'}</p>
          <button
            onClick={() => {
              setAnalysisState('idle');
              setVideo(null);
              setDeck(null);
              setVideoType('');
              setDeckType('');
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


