const { default: makeWASocket, useMultiFileAuthState, delay, fetchLatestBaileysVersion, DisconnectReason } = require("@whiskeysockets/baileys")
const pino = require('pino')
const express = require('express')
const app = express()

// Hii inatuliza seva ya Render isijizime kila dakika 2
app.get('/', (req, res) => res.send('Zepox AI Iko Imara!'))
const server = app.listen(process.env.PORT || 10000, '0.0.0.0', () => {
    console.log('SEVA IMETULIA: Sasa unaweza kuingiza kodi bila haraka.')
})

async function startZepox() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    const { version } = await fetchLatestBaileysVersion()
    
    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        // Hii inafanya ionekane kama kifaa cha kawaida kisicho na spam
        browser: ["Ubuntu", "Chrome", "20.0.04"] 
    })

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
            if (shouldReconnect) startZepox()
        } else if (connection === 'open') {
            console.log("HONGERA! WHATSAPP IMEUNGANISHWA TAYARI!")
        }
    })

    if (!sock.authState.creds.registered) {
        // Tunasubiri kidogo ili Render iwe "Live" kabisa
        await delay(15000)
        try {
            const phone = "255699121547" 
            const code = await sock.requestPairingCode(phone)
            console.log("\n" + "=".repeat(40))
            console.log("KODI YAKO MPYA: " + code)
            console.log("=".repeat(40) + "\n")
        } catch (err) {
            console.log("Hitilafu: Seva inajirestart, subiri kodi inayofuata.")
        }
    }
    sock.ev.on('creds.update', saveCreds)
}

startZepox()
