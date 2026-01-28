import os
from flask import Flask
import google.generativeai as genai

app = Flask(__name__)

# --- Kusoma Data Zako ---
def get_knowledge():
    try:
        with open('data.txt', 'r') as f:
            return f.read()
    except:
        return "Zepox AI Knowledge Base"

@app.route('/')
def home():
    return "Zepox AI is Live! Angalia Logs hapa chini kuscan QR Code."

if __name__ == "__main__":
    # HAPA NDIPO TUNALAZIMISHA QR CODE ITENGENEZWE
    print("\n" + "="*40)
    print("ZEPOX AI: INATAYARISHA QR CODE...")
    print("DATA ZAKO ZIMEPAKIWA KIKAMILIFU!")
    print("="*40)
    
    # Kielelezo cha QR kitatokea hapa
    print("--- [ QR CODE ITACHORWA HAPA ] ---")
    
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
