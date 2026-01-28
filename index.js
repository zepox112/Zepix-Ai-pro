const { default: makeWASocket, useMultiFileAuthState, delay, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys")
const pino = require('pino')
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Zepox AI: Mfumo Imara Unafanya Kazi'))
app.listen(process.env.PORT || 10000)

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    const { version } = await fetchLatestBaileysVersion()
    
    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        // HII SEHEMU CHINI NDIYO INAFANYA IONEKANE KAMA SIMU YA KAWAIDA
        browser: ["Zepox AI", "Chrome", "1.0.0"] 
    })

    sock.ev.on('connection.update', async (update) => {
        const { connection } = update
        if (connection === 'open') {
            console.log("HONGERA! WHATSAPP IMEUNGANISHWA TAYARI!")
        }
    })

    if (!sock.authState.creds.registered) {
        console.log("Inatengeneza kodi isiyo na 'Spam'... Subiri sekunde 15...")
        await delay(15000)
        try {
            // Namba yako tuliyoweka kwenye Environment Variables Render
            const phone = process.env.PHONE_NUMBER || "255699121547"
            const code = await sock.requestPairingCode(phone)
            console.log("\n" + "=".repeat(30))
            console.log("KODI YAKO MPYA: " + code)
            console.log("=".repeat(30) + "\n")
        } catch (err) {
            console.log("Hitilafu: Jaribu kufanya 'Clear Build Cache' Render.")
        }
    }
    sock.ev.on('creds.update', saveCreds)
}
start()
