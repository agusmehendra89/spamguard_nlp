# SpamGuard - NLP Spam Message Detection

**Nama Pengembang:** Agus Mahendra  
**Mata Kuliah:** Natural Language Processing  
**Jenis Proyek:** Ujian Akhir Semester - Proyek NLP  
**Tema:** Deteksi Spam pada Pesan Teks  

---

## Deskripsi Proyek

SpamGuard adalah aplikasi berbasis **Natural Language Processing (NLP)** untuk mendeteksi apakah sebuah pesan teks termasuk **spam** atau **bukan spam (ham)**.

Sistem ini menggunakan metode **TF-IDF (Term Frequency-Inverse Document Frequency)** sebagai representasi teks dan **Multinomial Naive Bayes** sebagai model klasifikasi. Aplikasi terdiri dari dua bagian utama, yaitu:

1. **Backend API** menggunakan FastAPI untuk memproses input teks dan menghasilkan prediksi.
2. **Frontend Web** menggunakan Next.js untuk menyediakan antarmuka input pesan bagi pengguna.

---

## Tujuan Proyek

Tujuan dari proyek ini adalah membangun sistem NLP sederhana yang mampu:

- Menerima input pesan teks dari pengguna.
- Melakukan preprocessing teks.
- Mengubah teks menjadi representasi numerik menggunakan TF-IDF.
- Mengklasifikasikan pesan menjadi `spam` atau `ham`.
- Menampilkan hasil prediksi dan confidence score kepada pengguna.
- Mengimplementasikan model machine learning ke dalam aplikasi web.

---

## Fitur Utama

- Input pesan teks dari pengguna.
- Preprocessing teks secara otomatis.
- Representasi teks menggunakan TF-IDF.
- Klasifikasi pesan menjadi `spam` atau `ham`.
- Menampilkan confidence score.
- Menampilkan probabilitas spam dan ham.
- Menampilkan hasil preprocessing teks.
- Backend REST API menggunakan FastAPI.
- Frontend web menggunakan Next.js.
- Dokumentasi endpoint melalui Swagger UI.

---

## Teknologi yang Digunakan

### Machine Learning / NLP

- Python
- Pandas
- NumPy
- Scikit-learn
- TF-IDF Vectorizer
- Multinomial Naive Bayes
- Joblib

### Backend

- FastAPI
- Uvicorn
- Pydantic
- CORS Middleware

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

---

## Dataset

Dataset yang digunakan adalah **SMS Spam Collection Dataset**. Dataset ini berisi kumpulan pesan SMS yang telah diberi label.

Label pada dataset:

- `ham`: pesan normal atau bukan spam.
- `spam`: pesan yang terindikasi spam.

Dataset ini cocok digunakan untuk tugas klasifikasi teks karena memiliki format sederhana berupa pasangan teks pesan dan label.

Contoh data:

| Label | Pesan |
|---|---|
| ham | Hey, are we still meeting tonight? |
| spam | Congratulations! You won a free prize. Click this link now! |

---

## Alur Sistem

```text
Input pesan pengguna
↓
Preprocessing teks
↓
TF-IDF Vectorizer
↓
Model Multinomial Naive Bayes
↓
Prediksi spam / ham
↓
Hasil ditampilkan di frontend
```

---

## Struktur Folder Proyek

```text
spamguard-nlp/
│
├── backend/
│   ├── main.py
│   ├── preprocessing.py
│   ├── requirements.txt
│   ├── model/
│   │   ├── spam_model.pkl
│   │   └── tfidf_vectorizer.pkl
│   └── training/
│       └── SpamGuard_NLP_Training.ipynb
│
├── frontend/
│   ├── app/
│   │   └── page.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.local
│
├── README.md
└── .gitignore
```

---

## Tahapan Pengerjaan Model NLP

### 1. Pengumpulan dan Pemahaman Data

Dataset SMS Spam Collection digunakan sebagai data utama. Dataset ini memiliki dua kategori label, yaitu `ham` dan `spam`.

Tahapan awal yang dilakukan:

- Membaca dataset menggunakan Pandas.
- Melihat lima data pertama.
- Memeriksa nama kolom.
- Memeriksa jumlah data.
- Mengecek missing value.
- Mengecek data duplikat.
- Melihat distribusi label.

---

### 2. Preprocessing Teks

Preprocessing dilakukan agar teks lebih bersih sebelum diproses oleh model machine learning.

Tahapan preprocessing:

1. **Case folding**  
   Mengubah seluruh teks menjadi huruf kecil.

2. **Menghapus URL**  
   Menghapus teks seperti `http://`, `https://`, atau `www`.

3. **Menghapus email**  
   Menghapus pola alamat email dari teks.

4. **Menghapus angka, simbol, dan tanda baca**  
   Membersihkan karakter yang tidak diperlukan.

5. **Menghapus spasi berlebih**  
   Merapikan teks agar tidak memiliki spasi ganda.

6. **Menghapus stopword Bahasa Inggris**  
   Menghapus kata umum yang kurang berpengaruh terhadap klasifikasi.

Contoh:

```text
Input:
Congratulations! You won a free prize. Click this link now!

Hasil preprocessing:
congratulations won free prize click link
```

---

### 3. Representasi Teks Menggunakan TF-IDF

Setelah teks dibersihkan, teks diubah menjadi bentuk numerik menggunakan **TF-IDF Vectorizer**.

TF-IDF digunakan untuk memberi bobot pada kata berdasarkan seberapa penting kata tersebut dalam sebuah dokumen dibandingkan seluruh kumpulan dokumen.

Konsep sederhananya:

```text
Pesan teks
↓
Daftar kata penting
↓
Bobot numerik tiap kata
↓
Input ke model machine learning
```

---

### 4. Pelatihan Model

Model yang digunakan adalah **Multinomial Naive Bayes**.

Alasan menggunakan Multinomial Naive Bayes:

- Cocok untuk klasifikasi teks.
- Ringan dan cepat dilatih.
- Bekerja baik pada fitur berbasis frekuensi atau bobot kata.
- Cocok untuk dataset SMS yang berisi teks pendek.

Dataset dibagi menjadi:

- Data latih: 80%
- Data uji: 20%

---

### 5. Evaluasi Model

Evaluasi model dilakukan menggunakan beberapa metrik:

- Accuracy
- Precision
- Recall
- F1-score
- Confusion Matrix

Contoh hasil pengujian API:

```json
{
  "original_message": "Congratulations! You won a free prize. Click this link now!",
  "clean_message": "congratulations won free prize click link",
  "prediction": "spam",
  "label_description": "Pesan terindikasi spam.",
  "confidence": 0.8616,
  "probability_ham": 0.1384,
  "probability_spam": 0.8616
}
```

Catatan: nilai evaluasi lengkap dapat dilihat pada notebook training `SpamGuard_NLP_Training.ipynb`.

---

## Penyimpanan Model

Setelah model selesai dilatih, model dan vectorizer disimpan menggunakan Joblib.

File yang dihasilkan:

```text
backend/model/spam_model.pkl
backend/model/tfidf_vectorizer.pkl
```

Keterangan:

- `spam_model.pkl`: file model klasifikasi spam.
- `tfidf_vectorizer.pkl`: file vectorizer untuk mengubah teks menjadi fitur numerik.

Kedua file ini wajib digunakan bersama. Model tidak bisa langsung membaca teks mentah tanpa vectorizer.

---

## Backend API

Backend dibuat menggunakan FastAPI.

### Endpoint

#### 1. GET `/`

Endpoint untuk mengecek apakah API berjalan.

Contoh response:

```json
{
  "message": "SpamGuard API is running",
  "endpoint": "/predict",
  "docs": "/docs"
}
```

#### 2. POST `/predict`

Endpoint untuk memprediksi apakah pesan termasuk spam atau ham.

Request body:

```json
{
  "message": "Congratulations! You won a free prize. Click this link now!"
}
```

Response:

```json
{
  "original_message": "Congratulations! You won a free prize. Click this link now!",
  "clean_message": "congratulations won free prize click link",
  "prediction": "spam",
  "label_description": "Pesan terindikasi spam.",
  "confidence": 0.8616,
  "probability_ham": 0.1384,
  "probability_spam": 0.8616
}
```

---

## Cara Menjalankan Backend

Masuk ke folder backend:

```bash
cd backend
```

Buat virtual environment:

```bash
python -m venv venv
```

Aktifkan virtual environment:

```bash
venv\Scripts\activate
```

Install dependency:

```bash
pip install -r requirements.txt
```

Jalankan server FastAPI:

```bash
python -m uvicorn main:app --reload
```

Backend berjalan di:

```text
http://127.0.0.1:8000
```

Dokumentasi API dapat diakses melalui:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Web

Frontend dibuat menggunakan Next.js, TypeScript, dan Tailwind CSS.

Fitur pada frontend:

- Form input pesan.
- Tombol analisis pesan.
- Loading state.
- Tampilan hasil prediksi.
- Confidence score.
- Probabilitas spam dan ham.
- Hasil preprocessing teks.

---

## Cara Menjalankan Frontend

Masuk ke folder frontend:

```bash
cd frontend
```

Install dependency:

```bash
npm install
```

Buat file `.env.local` di dalam folder frontend:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Jalankan frontend:

```bash
npm run dev
```

Frontend berjalan di:

```text
http://localhost:3000
```

---

## Contoh Penggunaan

### Contoh Pesan Spam

Input:

```text
Congratulations! You won a free prize. Click this link now!
```

Output:

```text
Prediction: spam
Confidence: 86.16%
```

### Contoh Pesan Normal

Input:

```text
Hey, are we still meeting tonight?
```

Output:

```text
Prediction: ham
```

---

## Dokumentasi API

FastAPI menyediakan dokumentasi otomatis melalui Swagger UI.

URL dokumentasi:

```text
http://127.0.0.1:8000/docs
```

Melalui halaman ini, pengguna dapat mencoba endpoint `/predict` secara langsung.

---

## Hasil Implementasi

Sistem berhasil menerima input teks dari pengguna, melakukan preprocessing, mengubah teks menjadi representasi numerik menggunakan TF-IDF, memproses data melalui model Naive Bayes, dan mengembalikan hasil klasifikasi berupa `spam` atau `ham`.

---

## Kesimpulan

SpamGuard berhasil menerapkan konsep Natural Language Processing untuk menyelesaikan masalah klasifikasi pesan spam. Sistem ini mencakup tahapan utama NLP, yaitu pengumpulan dataset, preprocessing teks, ekstraksi fitur menggunakan TF-IDF, pelatihan model, evaluasi, penyimpanan model, serta implementasi model ke dalam backend API dan frontend web.

Model yang digunakan cukup ringan sehingga aplikasi dapat berjalan dengan cepat dan mudah digunakan sebagai sistem deteksi spam berbasis web.

---

## Pengembang

**Agus Mahendra**

---

## Status Proyek

```text
Backend: Selesai
Frontend: Selesai
Model NLP: Selesai
Dokumentasi: Selesai
```