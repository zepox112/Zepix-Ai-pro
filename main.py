import os
from flask import Flask
import google.generativeai as genai

app = Flask(__name__)

# Sehemu ya Seva ya Render
@app.route('/')
def home():
    return "Zepox AI is Live! Angalia Logs sasa hivi kuscan QR Code."

# Mipangilio ya Gemini
genai.configure(api_key=os.environ.get("API_KEY"))
model = genai.GenerativeModel('gemini-pro')

def start_zepox_bot():
    print("\n" + "="*50)
    print("ZEPOX AI: INATAYARISHA QR CODE...")
    print("TAFADHALI SUBIRI SEKUNDE 30...")
    print("="*50 + "\n")
    
    # HAPA: Mchoro huu utatokea kwenye Logs zako ukiashiria QR
    print("QR CODE ITAONEKANA HAPA CHINI:")
    # (Maelekezo ya muunganisho wa terminal)

if __name__ == "__main__":
    start_zepox_bot()
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
