const { default: makeWASocket, useMultiFileAuthState, delay, fetchLatestBaileysVersion, DisconnectReason } = require("@whiskeysockets/baileys")
const pino = require('pino')
const express = require('express')
const app = express()

// Hii inazuia Render isizime (keeps the server alive)
app.get('/', (req, res) => res.send('Zepox AI: Mfumo Uko Imara'))
app.listen(process.env.PORT || 10000)

async function startZepox() {
    // Tunatumia 'auth_info' kuhifadhi session yako mtandaoni (RAM inalindwa)
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    const { version } = await fetchLatestBaileysVersion()
    
    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        // Hii sehemu inadanganya WhatsApp kuwa hii ni simu ya Android na siyo bot
        browser: ["Android", "Chrome", "11.0.0"] 
    })

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('Muunganisho umekatika, najaribu tena...', shouldReconnect)
            if (shouldReconnect) startZepox()
        } else if (connection === 'open') {
            console.log("HONGERA! WHATSAPP IMEUNGANISHWA TAYARI!")
        }
    })

    if (!sock.authState.creds.registered) {
        console.log("Inatengeneza kodi isiyo na 'Spam'... Subiri sekunde 15...")
        await delay(15000)
        try {
            // Inasoma namba uliyoweka kwenye Render Settings
            const phone = process.env.PHONE_NUMBER || "255699121547"
            const code = await sock.requestPairingCode(phone)
            console.log("\n" + "=".repeat(30))
            console.log("KODI YAKO MPYA: " + code)
            console.log("=".repeat(30) + "\n")
        } catch (err
