import pdfplumber
import numpy as np
import cv2
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

BEST_PRACTICES = [
    "problem", "solution", "market size", "business model", 
    "product", "traction", "team", "competition", "financials",
    "ask"
]

def extract_slide_images(pdf_path):
    """Convert PDF pages to images for visual analysis"""
    images = []
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            im = page.to_image(resolution=150)
            img_array = np.array(im.original)
            images.append(img_array)
    return images

def analyze_design(images):
    """Evaluate slide design quality"""
    scores = []
    for img in images:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        contrast = np.std(gray)
        
        edges = cv2.Canny(gray, 100, 200)
        edge_density = np.sum(edges) / (edges.shape[0] * edges.shape[1])
        
        if len(img.shape) == 3:  
            lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
            a, b = lab[:,:,1], lab[:,:,2]
            colorfulness = np.sqrt(np.mean(a*2) + np.mean(b*2))
        else:
            colorfulness = 0
        
        score = (
            min(contrast/50, 1) * 0.4 + 
            min(edge_density*100, 1) * 0.3 + 
            min(colorfulness/30, 1) * 0.3
        )
        scores.append(score)
    
    return np.mean(scores)

def analyze_content(text):
    """Evaluate content completeness and quality"""
    missing_sections = []
    feedback = []
    recommendations = []
    
    lower_text = text.lower()
    present_sections = []
    
    for section in BEST_PRACTICES:
        if re.search(r'\b' + re.escape(section) + r'\b', lower_text):
            present_sections.append(section)
            feedback.append({"message": f"Found '{section}' section", "sentiment": "positive"})
        else:
            missing_sections.append(section)
            feedback.append({"message": f"Missing '{section}' section", "sentiment": "negative"})
            recommendations.append(f"Add a section about '{section}'")
    
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([" ".join(BEST_PRACTICES), text])
    similarity = cosine_similarity(vectors[0], vectors[1])[0][0]
    
    slide_count = len(text.split('\f'))  
    if slide_count < 10:
        feedback.append({
            "message": f"Only {slide_count} slides - consider adding more content", 
            "sentiment": "negative"
        })
    elif slide_count > 20:
        feedback.append({
            "message": f"{slide_count} slides is too many - simplify your presentation", 
            "sentiment": "negative"
        })
    else:
        feedback.append({
            "message": f"Good slide count ({slide_count})", 
            "sentiment": "positive"
        })
    
    return {
        "contentScore": similarity,
        "presentSections": present_sections,
        "missingSections": missing_sections,
        "feedback": feedback,
        "recommendations": recommendations
    }

def analyze_deck(deck_path):
    
    full_text = ""
    with pdfplumber.open(deck_path) as pdf:
        for page in pdf.pages:
            full_text += page.extract_text() + "\f"  
    
    
    content_results = analyze_content(full_text)
    
    
    slide_images = extract_slide_images(deck_path)
    design_score = analyze_design(slide_images)
    
    
    return {
        "designScore": design_score * 10,  
        "feedback": content_results["feedback"],
        "recommendations": content_results["recommendations"]
    }