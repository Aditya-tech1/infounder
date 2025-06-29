// src/app/results/page.jsx

import Scorecard from '@/components/Scorecard';

// Sample data for the report
const sampleReportData = {
  overallScore: 3.1,
  confidenceScore: 0.88,
  deliveryFeedback: [
    { message: 'Good eye contact with the audience', sentiment: 'positive' },
    { message: 'Confident and upright posture', sentiment: 'positive' },    
    { message: 'Hand gestures are sometimes excessive', sentiment: 'neutral' }
  ],
  deckFeedback: [
    { message: "Missing 'problem' section", sentiment: 'negative' },        
    { message: "Missing 'solution' section", sentiment: 'negative' },       
  ],
  recommendations: [
    "Add a section about 'problem'",
    "Add a section about 'solution'",
  ]
};

// This is the page component that will display the report
export default function ResultsPage() {
  return (
    // Sets the dark background for the whole page
    <main style={{ 
      backgroundColor: '#1a0f2b', // Dark purple from your theme
      backgroundImage: 'radial-gradient(circle at top, rgba(120, 31, 237, 0.15), transparent 40%)',
      padding: '40px 20px', 
      minHeight: '100vh' 
    }}>
      {/* The main page title, now styled to match your theme */}
      <h1 style={{ 
        textAlign: 'center', 
        fontSize: '2.5rem', 
        fontWeight: '600',
        color: '#ffffff', 
        marginBottom: '40px',
        fontFamily: "'Playfair Display', serif" // Elegant serif font
      }}>
        Your Pitch Analysis Report
      </h1>
      
      <Scorecard reportData={sampleReportData} />
    </main>
  );
}