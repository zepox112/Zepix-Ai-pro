import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Zepox AI is Running!"

if __name__ == "__main__":
    # Sehemu ya kuwasha bot yako ya WhatsApp iwekwe hapa
    
    # Hii inatengeneza 'app' inayotakiwa na Render
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
