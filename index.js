const { default: makeWASocket, useMultiFileAuthState, delay, DisconnectReason } = require("@whiskeysockets/baileys")
const pino = require('pino')
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Zepox AI Is Active'))
app.listen(process.env.PORT || 10000)

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' })
    })

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('Muunganisho umefungwa, najaribu tena...', shouldReconnect)
            if (shouldReconnect) connectToWhatsApp()
        } else if (connection === 'open') {
            console.log('WHATSAPP IMEUNGANISHWA TAYARI!')
        }
    })

    if (!sock.authState.creds.registered) {
        await delay(8000) 
        const code = await sock.requestPairingCode("255699121547")
        console.log("\n" + "="*30)
        console.log("KODI HALISI: " + code)
        console.log("="*30 + "\n")
    }
    sock.ev.on('creds.update', saveCreds)
}
connectToWhatsApp()
