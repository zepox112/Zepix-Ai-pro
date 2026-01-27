import os
from flask import Flask
import google.generativeai as genai

# 1. Sehemu ya Flask kwa ajili ya Render Port
app = Flask(__name__)

@app.route('/')
def home():
    return "Zepox AI is Running on Render!"

# 2. Mipangilio ya Gemini AI
API_KEY = os.environ.get("API_KEY")
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-pro')

# 3. Maelezo ya Bio (System Message)
SYSTEM_MESSAGE = os.environ.get("SYSTEM_MESSAGE", "Wewe ni Zepox AI, msaidizi uliyeundwa na Zephania.")

# 4. Kazi ya kuwasha Bot (Hapa ndipo QR Code itatengenezwa kwenye Logs)
def start_bot():
    print("-----------------------------------------")
    print("Zepox AI inatayarisha QR Code...")
    print("Tafadhali angalia Logs hapa chini kuscan:")
    print("-----------------------------------------")
    # (Hapa msimbo wa muunganisho wa WhatsApp utafanya kazi kupitia maktaba uliyoweka)

if __name__ == "__main__":
    # Washa Port ya Render ili isikatae (Failed)
    port = int(os.environ.get("PORT", 10000))
    
    # Run server
    app.run(host='0.0.0.0', port=port)
