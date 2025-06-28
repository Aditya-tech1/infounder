'use client';
// pages/_app.js
import '../globals.css'; // preferred absolute import



import { useState, useRef } from 'react';
import { File, Presentation, Clapperboard, FileText } from 'lucide-react';

// A reusable component for the type selection buttons
const TypeButton = ({ id, label, icon, currentType, setType }) => {
  const isSelected = currentType === id;

  // Base styles for all buttons
  const baseClasses =
    'flex-1 flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105';
  
  // Styles for the selected button
  const selectedClasses = 'bg-purple-700 border-2 border-purple-300 text-white shadow-lg';
  
  // Styles for unselected buttons
  const unselectedClasses = 'bg-purple-900/50 border-2 border-gray-600 text-gray-300 hover:border-purple-400';

  return (
    <button
      onClick={() => setType(id)}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      {icon}
      <span className="mt-2 text-sm font-medium">{label}</span>
    </button>
  );
};


export default function DragUpload() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState('Presentation'); // Default selection
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0116] p-4">
      {/* File Drop Zone */}
      <div
        className="w-full max-w-sm h-52 bg-purple-900 text-white flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl cursor-pointer transition hover:border-purple-300"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        <File className="w-8 h-8 mb-2 text-white opacity-80" />
        <p className="text-md font-medium opacity-80">
          {file ? `File: ${file.name}` : 'Drag your File or Click Here'}
        </p>
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {/* New Type Selection Section */}
      <div className="w-full max-w-sm mt-6">
        <p className="text-white text-center font-semibold mb-3">Select the file type:</p>
        <div className="flex items-center justify-between gap-3">
          <TypeButton 
            id="Presentation"
            label="Presentation"
            icon={<Presentation className="w-7 h-7" />}
            currentType={type}
            setType={setType}
          />
          <TypeButton 
            id="Video"
            label="Video"
            icon={<Clapperboard className="w-7 h-7" />}
            currentType={type}
            setType={setType}
          />
          <TypeButton 
            id="PDF"
            label="PDF"
            icon={<FileText className="w-7 h-7" />}
            currentType={type}
            setType={setType}
          />
        </div>
      </div>
      
      {/* Continue Button */}
      <div className="w-full max-w-sm mt-6">
        <button
          disabled={!file}
          className="w-full px-4 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all duration-200 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            console.log("Continue with:", { file, type });
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}