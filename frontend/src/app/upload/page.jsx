'use client';

import { useState, useRef } from 'react';
import { Presentation, FileText, UploadCloud, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Reusable Type Selection Button ---
const TypeButton = ({ id, label, icon, currentType, setType }) => {
  const isSelected = currentType === id;
  return (
    <motion.button
      onClick={() => setType(id)}
      className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-colors duration-300
        ${isSelected
          ? 'bg-purple-600/50 border-purple-400 text-white'
          : 'bg-white/5 border-gray-700 text-gray-300 hover:border-gray-500'
        }`}
      whileHover={{ y: -5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {icon}
      <span className="text-md font-semibold">{label}</span>
    </motion.button>
  );
};


// --- The Main Upload Component ---
export default function AuroraUploadPage() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState('Presentation');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragState = (e, dragging) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  };

  const handleDrop = (e) => {
    handleDragState(e, false);
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const removeFile = (e) => {
    e.stopPropagation(); // Prevent triggering the click-to-upload
    setFile(null);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#06030b] overflow-hidden p-4">
      {/* Aurora Background Effect */}
      <div className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] bg-gradient-to-tr from-purple-800 via-blue-900 to-indigo-900 opacity-30 animate-[move-aurora_20s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] bg-gradient-to-tl from-pink-700 via-red-800 to-fuchsia-900 opacity-20 animate-[move-aurora_25s_ease-in-out_infinite_reverse]"></div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg p-6 sm:p-8 space-y-6 bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">Upload Your Masterpiece</h1>
          <p className="text-gray-400 mt-2">Select your file and its type to get started.</p>
        </div>

        {/* File Drop Zone */}
        <motion.div
          layout
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={(e) => handleDragState(e, true)}
          onDragLeave={(e) => handleDragState(e, false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`relative w-full h-60 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group
            ${isDragging
              ? 'border-4 border-dashed border-purple-500 bg-purple-500/10 scale-105'
              : 'border-2 border-dashed border-gray-600 hover:border-purple-400 hover:bg-white/5'
            }
            ${file ? 'border-solid border-green-500 bg-green-900/20' : ''}`
          }
        >
          <AnimatePresence mode="wait">
            {file ? (
              <motion.div
                key="file-info"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <CheckCircle2 className="w-16 h-16 mx-auto mb-3 text-green-400" />
                <p className="text-lg font-semibold text-white truncate max-w-xs">{file.name}</p>
                <p className="text-sm text-gray-300">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button
                  onClick={removeFile}
                  className="absolute top-3 right-3 p-1.5 bg-gray-800/50 rounded-full text-gray-400 hover:bg-red-500/50 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="drop-prompt"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="text-center text-gray-400"
              >
                <UploadCloud className={`w-16 h-16 mx-auto mb-3 transition-colors ${isDragging ? 'text-purple-400' : 'text-gray-500 group-hover:text-purple-400'}`} />
                <p className="text-lg font-semibold text-white">{isDragging ? 'Drop it like it\'s hot!' : 'Drag & Drop or Click'}</p>
                <p className="text-sm">Maximum file size: 50MB</p>
              </motion.div>
            )}
          </AnimatePresence>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        </motion.div>

        {/* Type Selection */}
        <div className="space-y-3">
          <p className="text-white text-center font-semibold">Choose File Type</p>
          <div className="flex items-center justify-between gap-4">
            <TypeButton id="Presentation" label="Presentation" icon={<Presentation className="w-6 h-6" />} currentType={type} setType={setType} />
            <TypeButton id="PDF" label="PDF Document" icon={<FileText className="w-6 h-6" />} currentType={type} setType={setType} />
          </div>
        </div>

        {/* Proceed Button */}
        <motion.button
          disabled={!file}
          className="w-full p-4 font-bold text-white rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-indigo-600 disabled:from-gray-600 disabled:to-gray-700"
          whileHover={!file ? {} : { scale: 1.05, y: -2, boxShadow: "0px 10px 20px rgba(138, 43, 226, 0.4)" }}
          whileTap={!file ? {} : { scale: 0.98 }}
          onClick={() => alert(`Proceeding with ${file.name} as a ${type}.`)}
        >
          Proceed
        </motion.button>
      </motion.div>
    </div>
  );
}