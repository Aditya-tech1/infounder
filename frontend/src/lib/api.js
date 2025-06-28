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

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const checkAnalysisStatus = async (jobId) => {
  try {
    const response = await fetch(`${API_URL}/api/status/${jobId}`);
    // console.log(response);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to check status');
    }

    return response.json();
  } catch (error) {
    console.error('Status Check Error:', error);
    throw error;
  }
};