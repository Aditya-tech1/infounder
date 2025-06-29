const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const analyzePitch = async (files) => {
  try {
    const formData = new FormData();
    formData.append('video', files.video);
    formData.append('deck', files.deck);

    const response = await fetch(`${API_URL}/api/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Analysis failed to start');
    }

    const result = await response.json(); // ✅ Parse here
    await console.log('Analysis started successfully:', result);
    return result; // return { jobId, message, etc. }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


export const checkAnalysisStatus = async (taskId) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const response = await fetch(`${API_URL}/api/status/${taskId}`);
  // Debugging line
  return await response.json(); // ✅ This makes sure it returns parsed JSON
};

