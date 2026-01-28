const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys")
const pino = require('pino')

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' })
    })

    if (!sock.authState.creds.registered) {
        // Hapa bot inaomba kodi halali kwa namba yako
        await delay(5000) 
        const code = await sock.requestPairingCode("255699121547")
        console.log("\n*******************************")
        console.log("KODI HALISI YA WHATSAPP NI: " + code)
        console.log("*******************************\n")
    }

    sock.ev.on('creds.update', saveCreds)
}
connectToWhatsApp()
