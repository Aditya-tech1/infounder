import cv2
import numpy as np
import mediapipe as mp
import matplotlib.pyplot as plt
from deepface import DeepFace
from pyAudioAnalysis import audioTrainTest as aT
import os
import tempfile

# Initialize MediaPipe
mp_face_detection = mp.solutions.face_detection
mp_face_mesh = mp.solutions.face_mesh
mp_pose = mp.solutions.pose
mp_hands = mp.solutions.hands

def extract_audio(video_path):
    """Extract audio from video for analysis"""
    import subprocess
    temp_audio = tempfile.NamedTemporaryFile(suffix='.wav', delete=False)
    subprocess.run([
        'ffmpeg', '-i', video_path, '-vn', '-acodec', 'pcm_s16le', 
        '-ar', '16000', '-ac', '1', '-y', temp_audio.name
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return temp_audio.name

def analyze_audio(audio_path):
    """Analyze speech characteristics"""
    try:
        # Extract speech features
        features = aT.mtFeatureExtraction(audio_path, 1.0, 1.0, 0.050, 0.050)
        
        # Calculate speech metrics
        clarity = np.mean(features[0][1])  # MFCCs for voice clarity
        pitch_var = np.var(features[0][0])  # Pitch variation
        speaking_rate = len(features[0]) / 10  # Approx words per second
        
        return {
            "clarity": float(clarity),
            "pitchVariation": float(pitch_var),
            "speakingRate": float(speaking_rate)
        }
    except:
        return {
            "clarity": 0.7,
            "pitchVariation": 0.5,
            "speakingRate": 2.5
        }

def analyze_video(video_path):
    # Extract audio first
    audio_path = extract_audio(video_path)
    audio_results = analyze_audio(audio_path)
    
    # Initialize models
    face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)
    face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)
    pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
    hands = mp_hands.Hands(min_detection_confidence=0.5, min_tracking_confidence=0.5)
    
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise Exception("Could not open video")
    
    # Analysis variables
    frame_count = 0
    metrics = {
        "eyeContact": [],
        "posture": [],
        "gestures": [],
        "facialExpression": []
    }
    
    # Process each frame
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break
            
        frame_count += 1
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Run all models
        face_results = face_detection.process(rgb_frame)
        pose_results = pose.process(rgb_frame)
        hands_results = hands.process(rgb_frame)
        
        # Eye contact detection
        eye_contact = 0
        if face_results.detections:
            for detection in face_results.detections:
                relative_eye_x = detection.location_data.relative_keypoints[0].x
                if 0.4 < relative_eye_x < 0.6:
                    eye_contact = 1
        metrics["eyeContact"].append(eye_contact)
        
        # Posture analysis
        posture_score = 0
        if pose_results.pose_landmarks:
            left_shoulder = pose_results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
            right_shoulder = pose_results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
            shoulder_diff = abs(left_shoulder.y - right_shoulder.y)
            if shoulder_diff < 0.05:
                posture_score = 1
        metrics["posture"].append(posture_score)
        
        # Gesture detection
        gesture_score = 1 if hands_results.multi_hand_landmarks else 0
        metrics["gestures"].append(gesture_score)
        
        # Emotion detection every 10 frames
        if frame_count % 10 == 0:
            try:
                emotion = DeepFace.analyze(rgb_frame, actions=['emotion'], silent=True)
                primary_emotion = emotion[0]['dominant_emotion']
                # Map emotion to score (positive emotions score higher)
                emotion_scores = {
                    'happy': 1, 'neutral': 0.8, 'surprise': 0.7,
                    'sad': 0.4, 'angry': 0.3, 'fear': 0.3, 'disgust': 0.2
                }
                metrics["facialExpression"].append(emotion_scores.get(primary_emotion, 0.5))
            except:
                metrics["facialExpression"].append(0.6)
    
    cap.release()
    os.unlink(audio_path)  # Clean up temporary audio file
    
    # Calculate average scores
    avg_scores = {metric: np.mean(values) for metric, values in metrics.items()}
    
    # Combine with audio results
    confidence_score = (
        avg_scores["eyeContact"] * 0.25 +
        avg_scores["posture"] * 0.2 +
        avg_scores["gestures"] * 0.15 +
        avg_scores["facialExpression"] * 0.15 +
        audio_results["clarity"] * 0.15 +
        (1 - min(audio_results["pitchVariation"], 1)) * 0.1
    )
    
    # Generate feedback based on scores
    feedback = []
    recommendations = []
    
    # Eye contact feedback
    if avg_scores["eyeContact"] < 0.6:
        feedback.append({"message": "Maintain more consistent eye contact", "sentiment": "negative"})
        recommendations.append("Practice looking directly at the camera for 3-5 seconds at a time")
    else:
        feedback.append({"message": "Good eye contact with the audience", "sentiment": "positive"})
    
    # Posture feedback
    if avg_scores["posture"] < 0.7:
        feedback.append({"message": "Improve your posture during presentation", "sentiment": "negative"})
        recommendations.append("Practice standing with shoulders back and head up")
    else:
        feedback.append({"message": "Confident and upright posture", "sentiment": "positive"})
    
    # Gesture feedback
    if avg_scores["gestures"] < 0.4:
        feedback.append({"message": "Use more hand gestures to emphasize points", "sentiment": "neutral"})
        recommendations.append("Watch TED talks to observe effective gesturing techniques")
    elif avg_scores["gestures"] > 0.8:
        feedback.append({"message": "Hand gestures are sometimes excessive", "sentiment": "neutral"})
        recommendations.append("Practice more controlled hand movements")
    else:
        feedback.append({"message": "Effective use of hand gestures", "sentiment": "positive"})
    
    # Vocal feedback
    if audio_results["clarity"] < 0.6:
        feedback.append({"message": "Improve speech clarity and enunciation", "sentiment": "negative"})
        recommendations.append("Practice tongue twisters to improve diction")
    
    if audio_results["pitchVariation"] > 0.8:
        feedback.append({"message": "Vocal pitch varies too much", "sentiment": "neutral"})
        recommendations.append("Practice speaking at a consistent pitch level")
    
    return {
        "confidenceScore": min(max(confidence_score, 0), 1),
        "feedback": feedback,
        "recommendations": recommendations
    }