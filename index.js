const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys")
const pino = require('pino')
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Bot is Running'))
app.listen(process.env.PORT || 10000)

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' })
    })

    if (!sock.authState.creds.registered) {
        await delay(5000)
        const code = await sock.requestPairingCode("255699121547")
        console.log("\n\n*******************************")
        console.log("KODI YAKO: " + code)
        console.log("*******************************\n\n")
    }
    sock.ev.on('creds.update', saveCreds)
}
start()
