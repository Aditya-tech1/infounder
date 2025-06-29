import sys
import json
import time
import numpy as np
from video_analysis import analyze_video
from deck_analysis import analyze_deck



print("NUMPY LOADED FROM:", np.__file__)
#print("NUMPY LOADED FROM:", np._file_)  

from video_analysis import analyze_video
from deck_analysis import analyze_deck





print("PYTHON EXECUTABLE:", sys.executable)
print("PYTHON PATH:", sys.path)


def log_progress(progress, message):
    print(f"PROGRESS: {progress}")
    print(f"STATUS: {message}")
    sys.stdout.flush()

def main():
    if len(sys.argv) != 4:
        print("Usage: python analyze.py <video_path> <deck_path> <job_id>")
        sys.exit(1)
    
    video_path, deck_path, job_id = sys.argv[1], sys.argv[2], sys.argv[3]
    
    try:
        start_time = time.time()
        log_progress(10, "Initializing analysis...")
        
        log_progress(20, "Processing video...")
        video_results = analyze_video(video_path)
        
        log_progress(50, "Processing deck...")
        deck_results = analyze_deck(deck_path)
        
        log_progress(80, "Generating report...")
        overall_score = (video_results["confidenceScore"] * 0.7 + deck_results["designScore"] * 0.3)
        
        results = {
            "overallScore": overall_score,
            "confidenceScore": video_results["confidenceScore"],
            "deliveryFeedback": video_results["feedback"],
            "deckFeedback": deck_results["feedback"],
            "recommendations": deck_results["recommendations"] + video_results["recommendations"]
        }
        
        duration = time.time() - start_time
        log_progress(100, f"Analysis completed in {duration:.1f} seconds")
        print(json.dumps(results))
        
        
    except Exception as e:
        print(f"Analysis failed: {str(e)}")
        log_progress(100, "Analysis failed")
        sys.exit(1)

if __name__ == "__main__":
    main()

