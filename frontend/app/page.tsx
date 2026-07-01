"use client";

import { useState } from "react";

type PredictionResult = {
  original_message: string;
  clean_message: string;
  prediction: string;
  label_description: string;
  confidence: number;
  probability_ham: number;
  probability_spam: number;
};

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handlePredict() {
    if (!message.trim()) {
      setErrorMessage("Masukkan pesan terlebih dahulu.");
      setResult(null);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setResult(null);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal memproses prediksi.");
      }

      const data: PredictionResult = await response.json();
      setResult(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menghubungi API.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const isSpam = result?.prediction === "spam";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <section className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            NLP Project
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            SpamGuard
          </h1>
          <p className="mt-4 text-slate-300">
            Sistem deteksi spam pada pesan teks menggunakan TF-IDF dan Naive
            Bayes.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <label className="mb-3 block text-sm font-medium text-slate-200">
            Masukkan pesan yang ingin diperiksa
          </label>

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Contoh: Congratulations! You won a free prize. Click this link now!"
            className="min-h-40 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none transition focus:border-cyan-400"
          />

          {errorMessage && (
            <p className="mt-3 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </p>
          )}

          <button
            onClick={handlePredict}
            disabled={isLoading}
            className="mt-5 w-full rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Menganalisis..." : "Analisis Pesan"}
          </button>
        </div>

        {result && (
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div
              className={`mb-5 rounded-xl px-4 py-3 ${
                isSpam
                  ? "bg-red-500/10 text-red-300"
                  : "bg-emerald-500/10 text-emerald-300"
              }`}
            >
              <p className="text-sm font-medium">Hasil Prediksi</p>
              <h2 className="mt-1 text-2xl font-bold">
                {isSpam ? "Spam" : "Bukan Spam"}
              </h2>
              <p className="mt-1 text-sm">{result.label_description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Confidence</p>
                <p className="mt-1 text-2xl font-bold">
                  {(result.confidence * 100).toFixed(2)}%
                </p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Probabilitas Ham</p>
                <p className="mt-1 text-2xl font-bold">
                  {(result.probability_ham * 100).toFixed(2)}%
                </p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Probabilitas Spam</p>
                <p className="mt-1 text-2xl font-bold">
                  {(result.probability_spam * 100).toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-slate-950 p-4">
              <p className="text-sm font-medium text-slate-300">
                Hasil preprocessing:
              </p>
              <p className="mt-2 text-sm text-slate-400">
                {result.clean_message || "-"}
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
