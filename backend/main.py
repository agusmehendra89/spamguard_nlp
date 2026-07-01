from pathlib import Path

import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from preprocessing import clean_text


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "spam_model.pkl"
VECTORIZER_PATH = BASE_DIR / "model" / "tfidf_vectorizer.pkl"


app = FastAPI(
    title="SpamGuard API",
    description="REST API untuk deteksi spam pada pesan teks menggunakan NLP, TF-IDF, dan Naive Bayes.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://spamguard-nlp-ukje.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)


class MessageRequest(BaseModel):
    message: str


class PredictionResponse(BaseModel):
    original_message: str
    clean_message: str
    prediction: str
    label_description: str
    confidence: float
    probability_ham: float
    probability_spam: float


@app.get("/")
def root():
    return {
        "message": "SpamGuard API is running",
        "endpoint": "/predict",
        "docs": "/docs",
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "model_loaded": model is not None,
        "vectorizer_loaded": vectorizer is not None,
    }


@app.post("/predict", response_model=PredictionResponse)
def predict_spam(request: MessageRequest):
    if not request.message or not request.message.strip():
        raise HTTPException(
            status_code=400,
            detail="Message tidak boleh kosong.",
        )

    clean_message = clean_text(request.message)

    if not clean_message:
        raise HTTPException(
            status_code=400,
            detail="Message tidak memiliki kata yang bisa diproses setelah preprocessing.",
        )

    vectorized_message = vectorizer.transform([clean_message])

    prediction = model.predict(vectorized_message)[0]
    probabilities = model.predict_proba(vectorized_message)[0]

    class_labels = list(model.classes_)
    probability_map = dict(zip(class_labels, probabilities))

    probability_ham = float(probability_map.get("ham", 0.0))
    probability_spam = float(probability_map.get("spam", 0.0))

    confidence = max(probability_ham, probability_spam)

    label_description = (
        "Pesan terindikasi spam."
        if prediction == "spam"
        else "Pesan termasuk normal atau bukan spam."
    )

    return {
        "original_message": request.message,
        "clean_message": clean_message,
        "prediction": prediction,
        "label_description": label_description,
        "confidence": round(confidence, 4),
        "probability_ham": round(probability_ham, 4),
        "probability_spam": round(probability_spam, 4),
    }