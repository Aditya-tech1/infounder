'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadArea({ onUpload }) {
  const [files, setFiles] = useState({
    video: null,
    deck: null,
  });
  
  const onDrop = useCallback((acceptedFiles) => {
    const videoFile = acceptedFiles.find(file => file.type.startsWith('video/'));
    const deckFile = acceptedFiles.find(file => file.type === 'application/pdf' || file.name.endsWith('.pdf'));
    
    setFiles({
      video: videoFile || files.video,
      deck: deckFile || files.deck,
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi'],
      'application/pdf': ['.pdf']
    },
    multiple: true,
    maxFiles: 2
  });

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <div>
            <p className="font-medium text-gray-700">
              {isDragActive ? 'Drop files here' : 'Drag & drop your files here'}
            </p>
            <p className="text-sm text-gray-500 mt-1">Upload a video (MP4, MOV, AVI) and a PDF deck</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Video</h3>
          {files.video ? (
            <div className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h-2v-2h2zm-8 0v2H5v-2h2zm4 0v2H9v-2h2z" clipRule="evenodd" />
              </svg>
              {files.video.name}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No video selected</p>
          )}
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Deck</h3>
          {files.deck ? (
            <div className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              {files.deck.name}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No deck selected</p>
          )}
        </div>
      </div>

      <button
        onClick={() => onUpload(files)}
        disabled={!files.video || !files.deck}
        className={`mt-6 w-full py-3 px-4 rounded-md text-white font-medium ${
          files.video && files.deck 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Analyze Pitch
      </button>
    </div>
  );
}