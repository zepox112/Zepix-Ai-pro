const { default: makeWASocket, useMultiFileAuthState, delay, fetchLatestBaileysVersion, DisconnectReason } = require("@whiskeysockets/baileys")
const pino = require('pino')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 10000

// Hii inazuia Render isiue bot yako (Keep-Alive)
app.get('/', (req, res) => res.status(200).send('Zepox AI Is Online'))
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Seva imewaka kwenye port ${PORT}. Sasa unaweza kuunganisha WhatsApp.`)
})

async function startZepox() {
    // Tunahifadhi session mtandaoni kulinda RAM yako
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    const { version } = await fetchLatestBaileysVersion()
    
    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        browser: ["Ubuntu", "Chrome", "20.0.04"] 
    })

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
            console.log("Muunganisho umekatika, najaribu kuwaka upya...")
            if (shouldReconnect) startZepox()
        } else if (connection === 'open') {
            console.log("HONGERA! WHATSAPP IMEUNGANISHWA TAYARI!")
        }
    })

    if (!sock.authState.creds.registered) {
        console.log("Inatengeneza kodi... Subiri sekunde 10...")
        await delay(10000)
        try {
            const phone = "255699121547" 
            const code = await sock.requestPairingCode(phone)
            console.log("\n" + "=".repeat(30))
            console.log("KODI YAKO HALISI: " + code)
            console.log("=".repeat(30) + "\n")
        } catch (err) {
            console.log("Tatizo la mtandao kwenye Render, inajaribu tena...")
        }
    }
    sock.ev.on('creds.update', saveCreds)
}

startZepox()
