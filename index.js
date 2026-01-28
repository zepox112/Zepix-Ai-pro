const { default: makeWASocket, useMultiFileAuthState, delay, fetchLatestBaileysVersion, DisconnectReason } = require("@whiskeysockets/baileys")
const pino = require('pino')
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Zepox AI Is Active'))
app.listen(process.env.PORT || 10000)

async function startZepox() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    const { version } = await fetchLatestBaileysVersion()
    
    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        browser: ["Android", "Chrome", "11.0.0"] 
    })

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
            if (shouldReconnect) startZepox()
        } else if (connection === 'open') {
            console.log("WHATSAPP IMEUNGANISHWA!")
        }
    })

    if (!sock.authState.creds.registered) {
        console.log("Inatengeneza kodi... Subiri sekunde 15...")
        await delay(15000)
        try {
            const phone = "255699121547"
            const code = await sock.requestPairingCode(phone)
            console.log("\n" + "=".repeat(30))
            console.log("KODI YAKO MPYA: " + code)
            console.log("=".repeat(30) + "\n")
        } catch (err) {
            console.log("Jaribu tena kurestart Render.")
        }
    }
    sock.ev.on('creds.update', saveCreds)
}
startZepox()
