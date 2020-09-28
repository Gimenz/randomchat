const { create, decryptMedia } = require('@open-wa/wa-automate')
const fs = require('fs')
const { color } = require('./util')
const clientOptions = require('./util').options
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta').locale('id')
let ban = JSON.parse(fs.readFileSync('./lib/banned.json'))
const menuId = require('./lib/menu')

const startServer = async () => {
    create('Imperial', clientOptions)
        .then((client) => {
            console.log('[DEV] masgimenz')
            console.log('[SERVER] Server Started!')
            // Force it to keep the current session
            client.onStateChanged((state) => {
                console.log('[Client State]', state)
                if (state === 'CONFLICT') client.forceRefocus()
            })
            // listening on message
           client.onMessage((message) => {
                msgHandler(client, message)
            })
            // listening on Incoming Call
            client.onIncomingCall((call) => {
                client.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. CALL = AUTOBLOCK!!!')
                client.contactBlock(call.peerJid)
                ban.push(call.peerJid)
                fs.writeFileSync('./lib/banned.json', JSON.stringify(ban))
                client.deleteChat(call.peerJid)
            })
        })
        .catch((err) => {
            console.error(err)
        })
}

async function msgHandler (client, message) {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, quotedMsgId, mentionedJidList, author} = message
        let { body } = message

        const { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        if (pushname == undefined || pushname.trim() == '') console.log(sender)
        const botNumber = await client.getHostNumber() + '@c.us'
        const isBanned = ban.includes(sender.id)
        const isOwner = sender.id === 'nomermu deleh kene [dudu nomer bot]@c.us'
        const pengirim = JSON.parse(fs.readFileSync('./lib/user.json'))
        const togel = pengirim[Math.floor(Math.random()*pengirim.length)];

        // Checking processTime
        const processTime = now => moment.duration(now - moment(t * 1000)).asSeconds() // t => timestamp when message was received

        const prefix = '#'
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
        const args = body.slice(prefix.length).trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)

        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'

        if (!isCmd && !isGroupMsg) { return console.log('[RECV]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Message from', color(pushname)) }
        if (!isCmd && isGroupMsg) { return console.log('[RECV]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Message from', color(pushname), 'in', color(name || formattedTitle)) }
        if (isCmd && !isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }

        if (!isBanned) {
        switch (command) {

        case 'find':
            const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
            if (isMedia && args.length >= 1) {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                const opo = body.slice(6)
                const uwong = togel
                //pengirim.push(from) //otomatis menambahkan nomor ke database
                //fs.writeFileSync('./lib/user.json', JSON.stringify(pengirim))
                client.sendImage(uwong, imageBase64, 'gambar.jpeg',`${opo}\n\nHai, kamu mendapat pesan dari : wa.me/${from.replace(/[@c.us]/g, '')}`)
                    .then(() => client.reply(from, 'Berhasil mengirim pesan\nTunggu pesan dari seseorang, kalo ga di bales coba lagi aja', id))
            } else if (isQuotedImage && args.length >= 1) {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                const opo = body.slice(6)
                const uwong = togel
                //pengirim.push(from) //otomatis menambahkan nomor ke database
                //fs.writeFileSync('./lib/user.json', JSON.stringify(pengirim))
                client.sendImage(uwong, imageBase64, 'gambar.jpeg',`${opo}\n\nHai, kamu mendapat pesan dari : wa.me/${from.replace(/[@c.us]/g, '')}`)
                    .then(() => client.reply(from, 'Berhasil mengirim pesan\nTunggu pesan dari seseorang, kalo ga di bales coba lagi aja', id))                
            } else if (args.length >= 1) { 
                const opo = body.slice(6)
                const uwong = togel
                //pengirim.push(from) //otomatis menambahkan nomor ke database
                //fs.writeFileSync('./lib/user.json', JSON.stringify(pengirim))
                client.sendText(uwong, `${opo}\n\nHai, kamu mendapat pesan dari : wa.me/${from.replace(/[@c.us]/g, '').replace(/[-]/g, '')}`)
                    .then(() => client.reply(from, 'Berhasil mengirim pesan\nTunggu pesan dari seseorang, kalo ga di bales coba lagi aja', id))   
            } else {
                await client.reply(from, 'Format salah! Untuk membuka daftar perintah kirim #menu', id)
            }       
            break 
        case 'add': //menambahkan nomor ke database
            if (!args.length >= 1) return client.reply(from, 'Masukkan nomornya, *GUNAKAN AWALAN 62* contoh: 6285226236155')  
            {
                const text = body.slice(5).replace(/[-\s+]/g,'')
                pengirim.push(text+'@c.us')
                fs.writeFileSync('./lib/user.json', JSON.stringify(pengirim))
                client.reply(from, 'Sukses memasukkan nomor ke database', message.id)
            }
            break              
        case 'remove': //menghapus nomor dari database
            if (!isOwner) return client.reply(from, 'Fitur ini hanya dapat digunakan oleh admin bot')  
            if (!args.length >= 1) return client.reply(from, 'Masukkan nomornya, *GUNAKAN AWALAN 62* contoh: 6285226236155')  
            {
                let inx = pengirim.indexOf(args[0]+'@c.us')
                pengirim.splice(inx,1)
                fs.writeFileSync('./lib/user.json', JSON.stringify(pengirim))
                client.reply(from, 'Sukses menghapus nomor dari database', id)
            }
            break
        case 'list': //melihat daftar nomor di database 
            if (!isOwner) return client.reply(from, 'Fitur ini hanya dapat digunakan oleh admin bot')  
            var text = fs.readFileSync('./lib/user.json','utf8')
            client.sendText(from, text) 
            break                               
        case 'donasi': {
            await client.sendText(from, menuId.textDonasi())
            }
            break
        case 'tnc':{
            await client.sendText(from, menuId.textTnC())
            }
            break
        //daftar menu 
        case 'menu':                     
        case 'help': {
            await client.sendText(from, menuId.textMenu())
            }
            break   
        // About
        case 'ping': {
            const batteryLevel = await client.getBatteryLevel()
            const charged = await client.getIsPlugged();
                await client.sendText(from,`Pong, Bot Aktif\nSpeed: ${processTime(moment())} _detik_\n\n*Bot Device Battery Info*\nBattery Level : ${batteryLevel}%\nIs Charging : ${charged}`)
            }
            break
        case 'about': {
            await client.sendText (from, menuId.textAbout()) 
            }
            break 
        case 'clearall':
            if (!isOwner) return client.reply(from, 'Fitur ini hanya dapat digunakan oleh admin bot')  
            client.sendText(from, 'Genosida di mulai!')
            const groupCount = await client.getAllChatIds()
            const lkist = await client.getAllGroups()
            for(let gcList of lkist){
                client.deleteChat(gcList.contact.id)
            }
            for(let xchat of groupCount){
                client.deleteChat(xchat)
            }
            client.sendText(from, 'sukses!')
            break                            
        case 'ban':
            if (!isOwner) return client.reply(from, 'Fitur ini hanya dapat digunakan oleh admin bot')  
            for (let i = 0; i < mentionedJidList.length; i++) {
                ban.push(mentionedJidList[i])
                fs.writeFileSync('./lib/banned.json', JSON.stringify(ban))
                client.reply(from, 'Succes ban target! mampus', message.id)
            }
            break
        case 'unban':
            if (!isOwner) return client.reply(from, 'Fitur ini hanya dapat digunakan oleh admin bot')  
            let inx = ban.indexOf(mentionedJidList[0])
            ban.splice(inx, 1)
            fs.writeFileSync('./lib/banned.json', JSON.stringify(ban))
            client.reply(from, 'Succes unban target!', message.id)
            break                         
        case 'getbot': 
            client.sendText(from, `Nomor Bot WA : wa.me/${botNumber.replace('@c.us', '')}`)
            break
        default:
            console.log(color('[ERROR]', 'red'), color(time, 'yellow'), 'Unregistered Command from', color(pushname))
            break
        }
     }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}

startServer()
