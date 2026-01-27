import os
from flask import Flask
# Hapa ndipo unapoimport maktaba za WhatsApp na Gemini

app = Flask(__name__)

@app.route('/')
def health_check():
    return "Zepox AI is Live!"

if __name__ == "__main__":
    # Maelekezo ya kuwasha WhatsApp bot yako yawekwe hapa
    
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
