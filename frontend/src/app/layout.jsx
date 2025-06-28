import './globals.css'; // ✅ Import Tailwind base styles

export const metadata = {
  title: 'Infounder - AI Pitch Analysis',
  description: 'Get AI-powered feedback on your pitch videos and decks',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
