import os
# ... kodi nyingine ...
api_key = os.getenv("API_KEY")
bot_name = os.getenv("BOT_NAME")
instruction = os.getenv("SYSTEM_MESSAGE")
import os
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
