import os
from flask import Flask
import time

app = Flask(__name__)

@app.route('/')
def home():
    return "Zepox AI: Pairing Mode Active!"

if __name__ == "__main__":
    phone = os.environ.get("PHONE_NUMBER", "255699121547")
    
    # Huu mstari ndio utatoa kodi kwenye Logs
    print("\n" + "*"*30)
    print(f"UNGANISHA WHATSAPP: {phone}")
    print("KODI YAKO NI: [XZ23-PL90]") # Mfano wa kodi
    print("*"*30 + "\n")
    
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
