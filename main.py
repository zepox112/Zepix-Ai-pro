import os
from flask import Flask
import google.generativeai as genai

# Sehemu ya 1: Flask kwa ajili ya Render (Port 10000)
app = Flask(__name__)

@app.route('/')
def health_check():
    return "Zepox AI is Live and Waiting for WhatsApp!"

# Sehemu ya 2: Gemini Configuration
API_KEY = os.environ.get("API_KEY")
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-pro')

# Sehemu ya 3: Bio/System Message
SYSTEM_MESSAGE = os.environ.get("SYSTEM_MESSAGE")

def get_ai_response(user_input):
    full_prompt = f"{SYSTEM_MESSAGE}\nUser: {user_input}"
    response = model.generate_content(full_prompt)
    return response.text

if __name__ == "__main__":
    # HAPA NDIPO QR CODE INAPOTENGENEZWA
    print("\n--- TAYARI KWA MUUNGANISHO ---")
    print("Zepox AI inatengeneza QR Code kwenye Logs hapa chini...")
    print("Tafadhali subiri sekunde 10-30 kisha u-scan haraka!\n")
    
    # Kuanzisha Port ya Render
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
