import io
import google.generativeai as genai
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
from ultralytics import YOLO

GOOGLE_API_KEY = "API KEY DISINI YAAA"
genai.configure(api_key=GOOGLE_API_KEY)

generation_config = {
  "temperature": 0.7,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 1024,
}
model_ai = genai.GenerativeModel(
    model_name="gemini-2.5-flash",
    generation_config=generation_config,
    system_instruction="Kamu adalah ToxoBuddy, asisten AI medis yang ramah, empatik, dan ahli dalam penyakit Toksoplasmosis. Tugasmu adalah memberikan edukasi, menjawab pertanyaan seputar pencegahan, penularan (kucing, makanan mentah, tanah), dan dampaknya pada ibu hamil. Gunakan bahasa Indonesia yang mudah dipahami, jangan terlalu kaku. Jika ditanya di luar topik medis atau toksoplasmosis, tolak dengan sopan dan arahkan kembali ke topik kesehatan."
)

app = FastAPI(title="ToxoAware API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("best.pt")

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def root():
    return {"message": "ToxoAware Backend is Running!"}

@app.post("/api/scan-meat")
async def scan_meat(image: UploadFile = File(...)):
    contents = await image.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    
    results = model.predict(img)
    
    doneness = "UNKNOWN"
    safe_to_eat = False
    confidence = 0.0

    if len(results) > 0:
        result = results[0]
        
        if hasattr(result, 'probs') and result.probs is not None:
            class_id = result.probs.top1
            confidence = float(result.probs.top1conf.item())
            doneness = result.names[class_id]
            
        elif hasattr(result, 'boxes') and result.boxes is not None and len(result.boxes) > 0:
            best_box = result.boxes[0]
            class_id = int(best_box.cls[0].item())
            confidence = float(best_box.conf[0].item())
            doneness = result.names[class_id]

        # 2. Blokir hasil confidence level di bawah 5% (0.05) yang pasti bukan daging sapi
        if confidence < 0.05:
            doneness = "BUKAN DAGING SAPI / TIDAK TERDETEKSI"
            safe_to_eat = False
        else:
            # 1. Mengubah deskripsi tingkat kematangan "well done"
            if doneness.lower() == "well done":
                doneness = "Matang sempurna, sudah siap dikonsumsi!"
                safe_to_eat = True

    return {
        "status": "success",
        "doneness": doneness.upper() if "!" not in doneness else doneness,
        "confidence": round(confidence * 100, 2),
        "safe_to_eat": safe_to_eat
    }

@app.post("/api/chat")
async def chat_buddy(request: ChatRequest):
    try:
        response = model_ai.generate_content(request.message)
        return {"reply": response.text}
    except Exception as e:
        return {"reply": "Maaf, ToxoBuddy sedang mengalami gangguan koneksi. Coba lagi sebentar ya!"}
