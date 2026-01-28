import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Zepox AI is Live! Angalia Logs kupata Pairing Code."

if __name__ == "__main__":
    # Inachukua namba uliyoweka Render
    phone = os.environ.get("PHONE_NUMBER", "255699121547")
    
    print("\n" + "="*40)
    print(f"ZEPOX AI: INAUNGANISHA NA {phone}")
    print("SUBIRI KIDOGO... KODI YAKO INATAYARISHWA")
    print("="*40 + "\n")
    
    # HAPA NDIPO KODI YA TARAKIMU 8 ITACHAPWA
    print("KODI YAKO: [ITAONEKANA HAPA KATIKA SEKUNDE 10]")
    
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
