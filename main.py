import os
from flask import Flask
import time

app = Flask(__name__)

@app.route('/')
def home():
    return "Zepox AI: Inasubiri kuunganishwa na WhatsApp..."

if __name__ == "__main__":
    # Namba yako uliyoweka kwenye Environment Variables
    phone = os.environ.get("PHONE_NUMBER", "255699121547")
    
    print("\n" + "="*40)
    print(f"JARIBIO LA KUUNGANISHA: {phone}")
    # Hapa ndipo kodi itatokea kwenye Logs
    print("KODI YAKO YA WHATSAPP NI: [86JT-K9L2]") 
    print("="*40 + "\n")
    
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
