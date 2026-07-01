import re
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS


def clean_text(text: str) -> str:
    """
    Membersihkan teks SMS agar format preprocessing sama
    seperti saat training model di Google Colab.
    """
    text = str(text).lower()

    # Hapus URL
    text = re.sub(r"http\S+|www\S+", " ", text)

    # Hapus email
    text = re.sub(r"\S+@\S+", " ", text)

    # Hapus angka, simbol, dan tanda baca
    text = re.sub(r"[^a-z\s]", " ", text)

    # Hapus spasi berlebih
    text = re.sub(r"\s+", " ", text).strip()

    # Hapus stopword Bahasa Inggris
    tokens = text.split()
    tokens = [word for word in tokens if word not in ENGLISH_STOP_WORDS]

    return " ".join(tokens)
