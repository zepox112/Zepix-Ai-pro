import os
from flask import Flask
import time
import random
import string

app = Flask(__name__)

# Kazi ya kutengeneza kodi mpya kila ikishindikana
def generate_new_pairing_code():
    chars = string.ascii_uppercase + string.digits
    part1 = ''.join(random.choice(chars) for _ in range(4))
    part2 = ''.join(random.choice(chars) for _ in range(4))
    return f"{part1}-{part2}"

@app.route('/')
def home():
    return "Zepox AI: Pairing Mode Active!"

if __name__ == "__main__":
    phone = os.environ.get("PHONE_NUMBER", "255699121547")
    new_code = generate_new_pairing_code()
    
    print("\n" + "!"*40)
    print(f"JARIBIO JIPYA LA KUUNGANISHA: {phone}")
    print(f"INGIZA HII KODI MPYA KWENYE SIMU: [{new_code}]")
    print("!"*40 + "\n")
    
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
