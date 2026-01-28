const { default: makeWASocket, useMultiFileAuthState, delay, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys")
const pino = require('pino')
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Zepox AI Is Waiting...'))
app.listen(process.env.PORT || 10000)

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    const { version } = await fetchLatestBaileysVersion()
    
    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' })
    })

    // Subiri muunganisho ufunguke kabla ya kuomba kodi
    sock.ev.on('connection.update', async (update) => {
        const { connection } = update
        if (connection === 'open') {
            console.log("WHATSAPP IMEUNGANISHWA!")
        }
    })

    if (!sock.authState.creds.registered) {
        console.log("Inatafuta Pairing Code... Tafadhali subiri sekunde 15...")
        await delay(15000) // Tumeongeza muda hapa kuzuia error
        try {
            const code = await sock.requestPairingCode("255699121547")
            console.log("\n" + "=".repeat(30))
            console.log("KODI YAKO HALISI NI: " + code)
            console.log("=".repeat(30) + "\n")
        } catch (err) {
            console.log("Jaribio limefeli, Render inajirestart yenyewe...")
        }
    }
    sock.ev.on('creds.update', saveCreds)
}
start()
