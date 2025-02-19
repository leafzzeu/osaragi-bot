require('./config')
const { default: makeWASocket, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, PHONENUMBER_MCC, fetchLatestBaileysVersion, makeInMemoryStore, jidDecode, proto, delay, prepareWAMessageMedia, generateWAMessageFromContent, generateForwardMessageContent, getContentType, downloadContentFromMessage, fetchLatestWaWebVersion } = require("@whiskeysockets/baileys");
const fs = require("fs");
const pino = require("pino");
const axios = require('axios')
const path = require('path')
const NodeCache = require("node-cache");
const msgRetryCounterCache = new NodeCache();
const fetch = require("node-fetch")
const FileType = require('file-type')
const _ = require('lodash')
const chalk = require('chalk')
const os = require('os');
const lolcatjs = require('lolcatjs')
const moment = require('moment-timezone')
const now = moment().tz('Asia/Jakarta')
const wita = now.clone().tz("Asia/Jakarta").locale("id").format("HH:mm:ss z")
const { Boom } = require("@hapi/boom");
const PhoneNumber = require("awesome-phonenumber");
const readline = require("readline");
const { formatSize, runtime, sleep, serialize, smsg, color, getBuffer } = require("./App/function/myfunc")
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./App/function/exif')
const { toAudio, toPTT, toVideo } = require('./App/function/converter')
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });

const low = require('./App/lowdb');
const yargs = require('yargs/yargs');
const { Low, JSONFile } = low;
const opts = yargs(process.argv.slice(2)).exitProcess(false).parse();
const dbPath = './Storage/database.json';

let db = new JSONFile(dbPath);
console.log("[Berhasil tersambung ke database Lokal]");

global.db = new Low(db);
global.DATABASE = global.db;

global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000));
if (global.db.data !== null) return;

global.db.READ = true;
await global.db.read();
global.db.READ = false;

global.db.data = {
users: {},
chats: {},
database: {},
groups: {},
game: {},
settings: {},
others: {},
sticker: {},
...(global.db.data || {})
};

global.db.chain = _.chain(global.db.data);
};

global.loadDatabase();

process.on('uncaughtException', console.error);

if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30 * 1000)

function createTmpFolder() {
    const folderName = "tmp"; 
    const folderPath = path.join(__dirname, folderName);

    // Cek apakah folder sudah ada
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath); // Buat folder jika belum ada
        console.log(chalk.cyan.bold(`Folder '${folderName}' berhasil dibuat.`)); // Pesan sukses
    } else {
        console.log(chalk.red.bold(`Folder '${folderName}' sudah ada.`)); // Pesan jika folder sudah ada
    }
}

createTmpFolder(); 

const usePairingCode = true
    const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
     }
    );
return new Promise((resolve) => {
    rl.question(text, resolve)
   }
  )
};

async function BotStarted() {
const readline = require("readline");
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
return new Promise((resolve) => {
rl.question(text, resolve)
})
};



const { version, isLatest } = await fetchLatestBaileysVersion();
const resolveMsgBuffer = new NodeCache();
const { state, saveCreds } = await useMultiFileAuthState("Storage/session");
	const leap = makeWASocket({
		printQRInTerminal: !usePairingCode,
		syncFullHistory: true,
		markOnlineOnConnect: true,
		connectTimeoutMs: 60000, 
		defaultQueryTimeoutMs: 0,
		keepAliveIntervalMs: 10000,
		generateHighQualityLinkPreview: true, 
		patchMessageBeforeSending: (message) => {
			const requiresPatch = !!(
				message.buttonsMessage 
				|| message.templateMessage
				|| message.listMessage
			);
			if (requiresPatch) {
				message = {
					viewOnceMessage: {
						message: {
							messageContextInfo: {
								deviceListMetadataVersion: 2,
								deviceListMetadata: {},
							},
							...message,
						},
					},
				};
			}

			return message;
		},
		version: (await (await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json')).json()).version,
		browser: ["Ubuntu", "Chrome", "20.0.04"],
		logger: pino({ level: 'fatal' }),
		auth: { 
			creds: state.creds, 
			keys: makeCacheableSignalKeyStore(state.keys, pino().child({ 
				level: 'silent', 
				stream: 'store' 
			})), 
		}
	});

if (usePairingCode && !leap.authState.creds.registered) {
            lolcatjs.fromString(`⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷
⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇
⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽
⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕
⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕
⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕
⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄
⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕
⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿
⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟
⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠
⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙
⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣ `);
            console.log(`Is connecting Number ${global.pairing}\n`);
            await sleep(4000);
            const code = await leap.requestPairingCode(global.pairing, global.custpair);
            console.log('Process...');
            console.log(`Your Pairing Code: ${chalk.yellow.bold((code))}`);
}

store.bind(leap.ev);

leap.ev.on('messages.upsert', async chatUpdate => {
    try {
        const kay = chatUpdate.messages[0];
        if (!kay.message) return;
        kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message;
        if (kay.key && kay.key.remoteJid === 'status@broadcast') return;
        if (!leap.public && !kay.key.fromMe && chatUpdate.type === 'notify') return;
        if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return;
        const messageId = kay.key.id;
        if (processedMessages.has(messageId)) return;
        processedMessages.add(messageId);
        const m = smsg(leap, kay, store);
        require('./response')(leap, m, chatUpdate, store);
    } catch (err) {
        console.log(err);
    }
})
const processedMessages = new Set();
// Setting
leap.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
    } else {
        return jid;
    }
};

leap.ev.on("contacts.update", (update) => {
    for (let contact of update) {
        let id = leap.decodeJid(contact.id);
        if (store && store.contacts) {
            store.contacts[id] = { id, name: contact.notify };
        }
    }
});
    
leap.getName = (jid, withoutContact = false) => {
    id = leap.decodeJid(jid);
    withoutContact = leap.withoutContact || withoutContact;
    let v;

    if (id.endsWith("@g.us")) {
        return new Promise(async (resolve) => {
            v = store.contacts[id] || {};
            if (!(v.name || v.subject)) v = leap.groupMetadata(id) || {};
            resolve(v.name || v.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
        });
    } else {
        v = id === "0@s.whatsapp.net"
            ? { id, name: "WhatsApp" }
            : id === leap.decodeJid(leap.user.id)
                ? leap.user
                : store.contacts[id] || {};
    }

    return (withoutContact ? "" : v.name) || v.subject || v.verifiedName || PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international");
};

leap.public = true;

leap.serializeM = (m) => smsg(leap, m, store)

leap.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await leap.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

leap.ev.on("connection.update",async  (s) => {
const { connection, lastDisconnect } = s
if (connection == "open") {
lolcatjs.fromString(`▧  Information connect :
│ » User id: ${leap.user.id}
│ » Name: ${leap.user.name}
└───···`)
const teks = `▧  Information connect :
│ » User id: ${leap.user.id}
│ » Name: ${leap.user.name}
└───···`
await leap.sendMessage(global.owner0, { text: teks,
 contextInfo: {
   externalAdReply: {
     title: "Bot Status : Connected✅",
     body: "enjoy~",
     thumbnailUrl: global.icon,
     sourceUrl: global.Url,
     mediaType: 1,
     renderLargerThumbnail: true,
    }
   }
  })
        }
        if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect.error.output.statusCode != 401
        ) {
            BotStarted()
        }
    }
)

leap.ev.on("creds.update", saveCreds);

leap.getFile = async (PATH, returnAsFilename) => {
    let res, filename;
    const data = Buffer.isBuffer(PATH) 
        ? PATH 
        : /^data:.*?\/.*?;base64,/i.test(PATH) 
            ? Buffer.from(PATH.split`,` [1], 'base64') 
            : /^https?:\/\//.test(PATH) 
                ? await (res = await fetch(PATH)).buffer() 
                : fs.existsSync(PATH) 
                    ? (filename = PATH, fs.readFileSync(PATH)) 
                    : typeof PATH === 'string' 
                        ? PATH 
                        : Buffer.alloc(0);

    if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer');

    const type = await FileType.fromBuffer(data) || {
        mime: 'application/octet-stream',
        ext: '.bin'
    };

    if (data && returnAsFilename && !filename) {
        filename = path.join(__dirname, './tmp/' + new Date * 1 + '.' + type.ext);
        await fs.promises.writeFile(filename, data);
    }

    return {
        res,
        filename,
        ...type,
        data,
        deleteFile() {
            return filename && fs.promises.unlink(filename);
        }
    };
};

leap.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || '';
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);

    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
}

leap.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
    let type = await leap.getFile(path, true);
    let { res, data: file, filename: pathFile } = type;

    if (res && res.status !== 200 || file.length <= 65536) {
        try {
            throw { json: JSON.parse(file.toString()) };
        } catch (e) {
            if (e.json) throw e.json;
        }
    }

    let opt = { filename };
    if (quoted) opt.quoted = quoted;
    if (!type) options.asDocument = true;

    let mtype = '', mimetype = type.mime, convert;

    if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) {
        mtype = 'sticker';
    } else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) {
        mtype = 'image';
    } else if (/video/.test(type.mime)) {
        mtype = 'video';
    } else if (/audio/.test(type.mime)) {
        convert = await (ptt ? toPTT : toAudio)(file, type.ext);
        file = convert.data;
        pathFile = convert.filename;
        mtype = 'audio';
        mimetype = 'audio/ogg; codecs=opus';
    } else {
        mtype = 'document';
    }

    if (options.asDocument) mtype = 'document';

    let message = {
        ...options,
        caption,
        ptt,
        [mtype]: { url: pathFile },
        mimetype
    };

    let m;
    try {
        m = await leap.sendMessage(jid, message, { ...opt, ...options });
    } catch (e) {
        console.error(e);
        m = null;
    } finally {
        if (!m) m = await leap.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
        return m;
    }
}

leap.sendTextWithMentions = async (jid, text, quoted, options = {}) => {
    leap.sendMessage(jid, {
        text: text,
        contextInfo: {
            mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net')
        },
        ...options
    }, { quoted });
};

leap.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) 
        ? path 
        : /^data:.*?\/.*?;base64,/i.test(path) 
            ? Buffer.from(path.split`,`[1], 'base64') 
            : /^https?:\/\//.test(path) 
                ? await (await getBuffer(path)) 
                : fs.existsSync(path) 
                    ? fs.readFileSync(path) 
                    : Buffer.alloc(0);

    let buffer;
    if (options && (options.packname || options.author)) {
        buffer = await writeExifVid(buff, options);
    } else {
        buffer = await videoToWebp(buff);
    }

    await leap.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
    return buffer;
};


leap.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message;
    let mime = (message.msg || message).mimetype || '';
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? (filename + '.' + type.ext) : filename;
    await fs.writeFileSync(trueFileName, buffer);
    
    return trueFileName;
};
 
const path = require('path');

leap.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message;
    let mime = (message.msg || message).mimetype || '';
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await(const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename;
    let savePath = path.join(__dirname, 'tmp', trueFileName); // Save to 'tmp' folder
    await fs.writeFileSync(savePath, buffer);
    return savePath;
};
leap.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await leap.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

leap.sendImage = async (e, t, a = "", s = "", f) => {
    let r = Buffer.isBuffer(t)
      ? t
      : /^data:.*?\/.*?;base64,/i.test(t)
      ? Buffer.from(t.split`,`[1], "base64")
      : /^https?:\/\//.test(t)
      ? await await getBuffer(t)
      : fs.existsSync(t)
      ? fs.readFileSync(t)
      : Buffer.alloc(0);
    return await leap.sendMessage(
      e,
      { image: r, caption: a, ...f },
      { quoted: s }
    );
  };
  
leap.sendText = (jid, text, quoted = '', options) => leap.sendMessage(jid, { text: text, ...options }, { quoted })

leap.sendTextWithMentions = async (jid, text, quoted, options = {}) => leap.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
return leap;
}

BotStarted();

//batas
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})