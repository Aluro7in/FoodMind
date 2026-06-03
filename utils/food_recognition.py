from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
import io
import json
import os

app = FastAPI(title="FoodMind AI Food Recognition API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load class names
class_names = [
    "apple", "banana", "bread", "broccoli", "burger", "cake", "carrot", "cheese",
    "chicken", "chocolate", "coffee", "cookie", "egg", "fish", "french_fries",
    "grapes", "ice_cream", "lemon", "lettuce", "milk", "orange", "pasta", "pizza",
    "potato", "rice", "salad", "sandwich", "soup", "strawberry", "tomato"
]

# Model setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load pre-trained ResNet model
model = models.resnet18(pretrained=True)
num_features = model.fc.in_features
model.fc = nn.Linear(num_features, len(class_names))

# Load model weights if available
model_path = "food_model.pth"
if os.path.exists(model_path):
    try:
        model.load_state_dict(torch.load(model_path, map_location=device))
        print("Model weights loaded successfully")
    except Exception as e:
        print(f"Could not load model weights: {e}")
        print("Using pre-trained ResNet18 without custom weights")

model.to(device)
model.eval()

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

@app.get("/")
async def root():
    return {
        "message": "FoodMind AI Food Recognition API",
        "version": "1.0.0",
        "status": "active",
        "model": "ResNet18",
        "classes": len(class_names)
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": True,
        "device": str(device),
        "classes_available": len(class_names)
    }

@app.post("/predict")
async def predict_food(file: UploadFile = File(...)):
    try:
        # Validate file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read and process image
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
        
        # Preprocess image
        input_tensor = transform(image).unsqueeze(0).to(device)
        
        # Make prediction
        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
            confidence, predicted_idx = torch.max(probabilities, 0)
            
            predicted_class = class_names[predicted_idx.item()]
            confidence_score = confidence.item() * 100
        
        # Mock nutritional data based on predicted food
        nutrition_data = get_nutrition_data(predicted_class)
        
        return {
            "class_name": predicted_class,
            "confidence": round(confidence_score, 2),
            "nutrition": nutrition_data,
            "status": "success"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

def get_nutrition_data(food_class):
    """Mock nutritional data for different food classes"""
    nutrition_db = {
        "apple": {"calories": 52, "protein": 0.3, "carbs": 14, "fat": 0.2, "fiber": 2.4},
        "banana": {"calories": 89, "protein": 1.1, "carbs": 23, "fat": 0.3, "fiber": 2.6},
        "bread": {"calories": 265, "protein": 9, "carbs": 49, "fat": 3.2, "fiber": 2.7},
        "broccoli": {"calories": 34, "protein": 2.8, "carbs": 7, "fat": 0.4, "fiber": 2.6},
        "burger": {"calories": 540, "protein": 25, "carbs": 40, "fat": 31, "fiber": 3},
        "cake": {"calories": 367, "protein": 5, "carbs": 58, "fat": 14, "fiber": 1.2},
        "carrot": {"calories": 41, "protein": 0.9, "carbs": 10, "fat": 0.2, "fiber": 2.8},
        "cheese": {"calories": 402, "protein": 25, "carbs": 1.3, "fat": 33, "fiber": 0},
        "chicken": {"calories": 239, "protein": 27, "carbs": 0, "fat": 14, "fiber": 0},
        "chocolate": {"calories": 546, "protein": 5, "carbs": 61, "fat": 31, "fiber": 7},
        "coffee": {"calories": 2, "protein": 0.3, "carbs": 0, "fat": 0, "fiber": 0},
        "cookie": {"calories": 502, "protein": 6, "carbs": 64, "fat": 25, "fiber": 2},
        "egg": {"calories": 155, "protein": 13, "carbs": 1.1, "fat": 11, "fiber": 0},
        "fish": {"calories": 206, "protein": 22, "carbs": 0, "fat": 12, "fiber": 0},
        "french_fries": {"calories": 365, "protein": 4, "carbs": 63, "fat": 17, "fiber": 4},
        "grapes": {"calories": 62, "protein": 0.6, "carbs": 16, "fat": 0.2, "fiber": 0.9},
        "ice_cream": {"calories": 207, "protein": 3.5, "carbs": 24, "fat": 11, "fiber": 0.7},
        "lemon": {"calories": 29, "protein": 1.1, "carbs": 9, "fat": 0.3, "fiber": 2.8},
        "lettuce": {"calories": 15, "protein": 1.4, "carbs": 2.9, "fat": 0.2, "fiber": 1.3},
        "milk": {"calories": 42, "protein": 3.4, "carbs": 5, "fat": 1, "fiber": 0},
        "orange": {"calories": 47, "protein": 0.9, "carbs": 12, "fat": 0.1, "fiber": 2.4},
        "pasta": {"calories": 220, "protein": 8, "carbs": 44, "fat": 1.1, "fiber": 2.5},
        "pizza": {"calories": 266, "protein": 11, "carbs": 33, "fat": 10, "fiber": 2.3},
        "potato": {"calories": 77, "protein": 2, "carbs": 17, "fat": 0.1, "fiber": 2.2},
        "rice": {"calories": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "fiber": 0.4},
        "salad": {"calories": 33, "protein": 3, "carbs": 6, "fat": 0.3, "fiber": 2.1},
        "sandwich": {"calories": 304, "protein": 12, "carbs": 39, "fat": 11, "fiber": 3.8},
        "soup": {"calories": 56, "protein": 3, "carbs": 8, "fat": 1.9, "fiber": 1.5},
        "strawberry": {"calories": 32, "protein": 0.7, "carbs": 8, "fat": 0.3, "fiber": 2},
        "tomato": {"calories": 18, "protein": 0.9, "carbs": 3.9, "fat": 0.2, "fiber": 1.2}
    }
    
    return nutrition_db.get(food_class, {
        "calories": 150, "protein": 5, "carbs": 20, "fat": 5, "fiber": 2
    })

@app.get("/classes")
async def get_classes():
    return {"classes": class_names, "total": len(class_names)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)