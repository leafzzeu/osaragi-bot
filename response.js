require("./config");
const {
    makeWASocket,
    makeCacheableSignalKeyStore,
    downloadContentFromMessage,
    emitGroupParticipantsUpdate,
    emitGroupUpdate,
    generateWAMessageContent,
    generateWAMessage,
    makeInMemoryStore,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    MediaType,
    areJidsSameUser,
    WAMessageStatus,
    downloadAndSaveMediaMessage,
    AuthenticationState,
    GroupMetadata,
    initInMemoryKeyStore,
    getContentType,
    MiscMessageGenerationOptions,
    useSingleFileAuthState,
    BufferJSON,
    WAMessageProto,
    MessageOptions,
    WAFlag,
    WANode,
    WAMetric,
    ChatModification,
    MessageTypeProto,
    WALocationMessage,
    ReconnectMode,
    WAContextInfo,
    proto,
    WAGroupMetadata,
    ProxyAgent,
    waChatKey,
    MimetypeMap,
    MediaPathMap,
    WAContactMessage,
    WAContactsArrayMessage,
    WAGroupInviteMessage,
    WATextMessage,
    WAMessageContent,
    WAMessage,
    BaileysError,
    WA_MESSAGE_STATUS_TYPE,
    MediaConnInfo,
    URL_REGEX,
    WAUrlInfo,
    WA_DEFAULT_EPHEMERAL,
    WAMediaUpload,
    mentionedJid,
    processTime,
    Browser,
    MessageType,
    Presence,
    WA_MESSAGE_STUB_TYPES,
    Mimetype,
    relayWAMessage,
    Browsers,
    GroupSettingChange,
    DisconnectReason,
    WASocket,
    getStream,
    WAProto,
    isBaileys,
    PHONENUMBER_MCC,
    AnyMessageContent,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    templateMessage,
    InteractiveMessage,
    Header
} = require("@whiskeysockets/baileys");
const { exec, spawn, execSync } = require("child_process");
const fs = require("fs");
const util = require("util");
const fetch = require("node-fetch");
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");
const speed = require('performance-now');
const crypto = require("crypto");
const FormData = require("form-data");
const cheerio = require("cheerio");
const Jimp = require("jimp")
const os = require("os");
const moment = require("moment-timezone");
const { addExif } = require("./App/function/exif");
const {
    smsg,
    formatDate,
    getTime,
    getGroupAdmins,
    formatp,
    await,
    sleep,
    runtime,
    clockString,
    msToDate,
    sort,
    toNumber,
    enumGetKey,
    fetchJson,
    getBuffer,
    json,
    delay,
    format,
    logic,
    generateProfilePicture,
    parseMention,
    getRandom,
    fetchBuffer,
    buffergif,
    GIFBufferToVideoBuffer,
    totalcase
} = require("./App/function/myfunc");
const {
    bytesToSize,
    checkBandwidth,
    formatSize,
    jsonformat,
    nganuin,
    shorturl,
    color
} = require("./App/function/funcc");
const {
    toAudio,
    toPTT,
    toVideo,
    ffmpeg,
    addExifAvatar
} = require("./App/function/converter");
const {
    addPremiumUser,
    getPremiumExpired,
    getPremiumPosition,
    expiredCheck,
    checkPremiumUser,
    getAllPremiumUser
} = require("./App/function/premiun");
let premium = JSON.parse(fs.readFileSync("./Storage/premium.json"));
module.exports = leap = async (leap, m, chatUpdate, store) => {
    try {
        const body =
            m && m.mtype
                ? m.mtype === "conversation"
                    ? m.message?.conversation
                    : m.mtype === "imageMessage"
                    ? m.message?.imageMessage?.caption
                    : m.mtype === "videoMessage"
                    ? m.message?.videoMessage?.caption
                    : m.mtype === "extendedTextMessage"
                    ? m.message?.extendedTextMessage?.text
                    : m.mtype === "buttonsResponseMessage"
                    ? m.message?.buttonsResponseMessage?.selectedButtonId
                    : m.mtype === "listResponseMessage"
                    ? m.message?.listResponseMessage?.singleSelectReply
                          ?.selectedRowId
                    : m.mtype === "templateButtonReplyMessage"
                    ? m.message?.templateButtonReplyMessage?.selectedId
                    : m.mtype === "messageContextInfo"
                    ? m.message?.buttonsResponseMessage?.selectedButtonId ||
                      m.message?.listResponseMessage?.singleSelectReply
                          ?.selectedRowId ||
                      m.text
                    : ""
                : "";

        const budy = m && typeof m.text === "string" ? m.text : "";
        const prefix =
            /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(body)
                ? body.match(
                      /^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi
                  )
                : "";
        const isCmd = body.startsWith(prefix);
        const from = m.key.remoteJid;
        const command = isCmd
            ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase()
            : "";
        const cmd = prefix + command
        const args = body.trim().split(/ +/).slice(1);
        const full_args = body.replace(command, "").slice(1).trim();
        const pushname = m.pushName || "No Name";
        const botNumber = await leap.decodeJid(leap.user.id);
        const { type, fromMe } = m;
        const sender = m.sender;
        const senderNumber = sender.split("@")[0];
        const isCreator =
            (m &&
                m.sender &&
                [botNumber, ...global.owner]
                    .map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
                    .includes(m.sender)) ||
            false;
        const itsMe = (m && m.sender && m.sender == botNumber) || false;
        const text = (q = args.join(" "));
        var msg_text = typeof m.text === "string" ? m.text : "";
        const fatkuns = m && (m.quoted || m);
        const quoted =
            fatkuns?.mtype == "buttonsMessage"
                ? fatkuns[Object.keys(fatkuns)[1]]
                : fatkuns?.mtype == "templateMessage"
                ? fatkuns.hydratedTemplate[
                      Object.keys(fatkuns.hydratedTemplate)[1]
                  ]
                : fatkuns?.mtype == "product"
                ? fatkuns[Object.keys(fatkuns)[0]]
                : m.quoted || m;
        const mime = (quoted?.msg || quoted || {}).mimetype || "";
        const qmsg = quoted?.msg || quoted;
        const isMedia = /image|video|sticker|audio/.test(mime);
        const isImage = type === "imageMessage";
        const isVideo = type === "videoMessage";
        const isSticker = type == "stickerMessage";
        const isAudio = type == "audioMessage";
        const groupMetadata = m.isGroup
            ? await leap.groupMetadata(m.chat).catch(e => {})
            : {};
        const participants = m.isGroup
            ? (await groupMetadata.participants) || []
            : [];
        const groupAdmins = m.isGroup
            ? (await getGroupAdmins(participants)) || []
            : [];
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
        const isBot = botNumber.includes(senderNumber);
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
        const isPremium =
            isCreator || isCreator || checkPremiumUser(m.sender, premium);
        expiredCheck(leap, m, premium);
        const groupOwner = m.isGroup ? groupMetadata.owner || "" : "";
        const isGroupOwner = m.isGroup
            ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender)
            : false;
        const froms = m.quoted
            ? m.quoted.sender
            : text
            ? text.replace(/[^0-9]/g, "")
                ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
                : false
            : false;

        // FUNTION DISINI WAE YAK
        const more = String.fromCharCode(8206).repeat(1001)
        const hariini = moment.tz("Asia/Jakarta").format("DD MMMM YYYY");
        const wib = moment.tz("Asia/Jakarta").format("HH : mm : ss");
        const wit = moment.tz("Asia/Jayapura").format("HH : mm : ss");
        const wita = moment.tz("Asia/Makassar").format("HH : mm : ss");
        let dt = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("a");
        const salam = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1);
        let dot = new Date(new Date() + 3600000);
        const dateIslamic = Intl.DateTimeFormat("id" + "-TN-u-ca-islamic", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(dot);
        const lilydate = moment.tz("Asia/Jakarta").format("DD/MM/YYYY");
        const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss");
        if (time2 < "23:59:00") {
            var ucapanWaktu = "Selamat Malam🌃";
        }
        if (time2 < "19:00:00") {
            var ucapanWaktu = "Selamat Petang🌆";
        }
        if (time2 < "18:00:00") {
            var ucapanWaktu = "Selamat Sore🌇";
        }
        if (time2 < "15:00:00") {
            var ucapanWaktu = "Selamat Siang🏙️";
        }
        if (time2 < "10:00:00") {
            var ucapanWaktu = "Selamat Pagi🌅";
        }
        if (time2 < "05:00:00") {
            var ucapanWaktu = "Selamat Subuh🌠";
        }
        if (time2 < "03:00:00") {
            var ucapanWaktu = "Selamat Tengah Malam🌌";
        }

        if (time2 < "23:59:00") {
            var emojiwaktu = `🌌`;
        }
        if (time2 < "19:00:00") {
            var emojiwaktu = `🌙`;
        }
        if (time2 < "18:00:00") {
            var emojiwaktu = `🌅`;
        }
        if (time2 < "17:00:00") {
            var emojiwaktu = `🌅`;
        }
        if (time2 < "15:00:00") {
            var emojiwaktu = `☀️`;
        }
        if (time2 < "11:00:00") {
            var emojiwaktu = `🌄`;
        }
        if (time2 < "05:00:00") {
            var emojiwaktu = `🌙`;
        }

async function fetchBuffer(url) {
    const response = await axios.get(url, {
        responseType: 'arraybuffer' 
    });
    return Buffer.from(response.data); 
}

        async function pepe(media) {
            const jimp = await Jimp.read(media),
            min = jimp.getWidth(),
            max = jimp.getHeight(),
            cropped = jimp.crop(0, 0, min, max)

            return {
                img: await cropped.scaleToFit(720,720).getBufferAsync(Jimp.MIME_JPEG),
                preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG),
            }
        }

        async function dellCase(filePath, caseNameToRemove) {
            fs.readFile(filePath, "utf8", (err, data) => {
                if (err) {
                    console.error("Terjadi kesalahan:", err);
                    return;
                }

                const regex = new RegExp(
                    `case\\s+'${caseNameToRemove}':[\\s\\S]*?break`,
                    "g"
                );
                const modifiedData = data.replace(regex, "");

                fs.writeFile(filePath, modifiedData, "utf8", err => {
                    if (err) {
                        console.error(
                            "Terjadi kesalahan saat menulis file:",
                            err
                        );
                        return;
                    }

                    console.log(
                        `Teks dari case '${caseNameToRemove}' telah dihapus dari file.`
                    );
                });
            });
        }

        const totalFitur = () => {
            var mytext = fs.readFileSync("./response.js").toString();
            var numUpper = (mytext.match(/case '/g) || []).length;
            return numUpper;
        };

        const pickRandom = arr => {
            return arr[Math.floor(Math.random() * arr.length)];
        };

        try {
            var ppuser = await leap.profilePictureUrl(m.sender, "image");
        } catch (err) {
            var ppuser =
                "https://nauval.mycdn.biz.id/download/1739708414792.jpeg";
        }

        let ppnyauser = await getBuffer(ppuser);
        leap.readMessages([m.key]);

        const reaction = async (jidss, emoji) => {
            leap.sendMessage(jidss, {
                react: {
                    text: emoji,
                    key: m.key
                }
            });
        };

        const kia = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat
                    ? {
                          remoteJid: "status@broadcast"
                      }
                    : {})
            },
            message: {
                extendedTextMessage: {
                    text: ucapanWaktu,
                    title: ``,
                    thumbnailUrl: ppnyauser
                }
            }
        };

        const reply = teks => {
            leap.sendMessage(
                from,
                {
                    text: teks,
                    contextInfo: {
                    forwardingScore: 99999,
                                isForwarded: true,
                                mentionedJid: [sender],
                                forwardedNewsletterMessageInfo: {
                                    newsletterName: `Hello ${pushname} - ${emojiwaktu}`,
                                    newsletterJid: global.idch
                                },
                        externalAdReply: {
                            title: `Halo ${pushname} - san`,
                            body: `Developed by leaf3u`,
                            previewType: "PHOTO",
                            thumbnailUrl: icon,
                            sourceUrl: `${global.Url}`
                        }
                    }
                },
                { quoted: kia }
            );
        };


let example = (teks) => {
return `*[ ! ] Cara penggunaan salah!*\n> How To : ${cmd} ${teks}`
}
        //================== [ CONSOL LOGG] ==================//
        if (m.message) {
            console.log(
                chalk.cyan(
                    `────────────『 ${chalk.redBright(
                        "ᴵᴺᶠᴼ ᴹᴱˢˢᴬᴳᴱ"
                    )} 』────────────`
                )
            );
            console.log(`   ${chalk.cyan("» Message Type")}: ${m.mtype}`);
            console.log(`   ${chalk.cyan("» Sent Time")}: ${time2}`);
            console.log(
                `   ${chalk.cyan("» Sender Name")}: ${pushname || "N/A"}`
            );
            console.log(
                `   ${chalk.cyan("» Chat ID")}: ${m.chat.split("@")[0]}`
            );
            console.log(`   ${chalk.cyan("» Chat Name")}: ${budy || "N/A"}`);
            console.log(chalk.cyan("───────────────────────────────────⳹\n"));
        }

        //-- STAFF SYSTEM
        let list_staff = [];
        let staff_domp = global.owner;
        for (let i of staff_domp) {
            let name_staff = await leap.getName(i + "@s.whatsapp.net");
            list_staff.push({
                displayName: await leap.getName(i + "@s.whatsapp.net"),
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${name_staff}\nFN:${name_staff}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Hubungi staff kami 💬\nitem2.EMAIL;type=INTERNET:tanakadomp@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://www.tanakadomp.biz.id\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
            });
        }

        switch (command) {
            case "menu":
            case "help":
                {
                    await reaction(m.chat, "💤");

                    let menyiw = `Helo *${pushname}* my name is *${botname}*, this is my Dashboard View

─ *Bot Info*
> *Uptime :* ${runtime(os.uptime())}
> *Runtime :* ${runtime(process.uptime())}
> *Status :* ${leap.public ? "Public" : "Self"}

─ *User Info*
> *Name :* ${pushname}
> *Number :* ${senderNumber}
> *Role :* ${isCreator ? "Owner" : "User"}

─ *Developed By : \`leaf3u\`* ${more}

┏┈─┄ *Owner Menu* ᯓ
│• self
│• public
│• upch
│• get
│• backup
│• setpp
┗┈─┄┈─┄─ᯓ

┏┈─┄ *Tools Menu* ᯓ
│• tourl
│• ping
│• sticker
│• brat
│• qc
│• bratvid
┗┈─┄┈─┄─ᯓ

┏┈─┄ *Group Menu* ᯓ
│• hidetag - [h, totag]
│• tagall - [everyone]
│• kick - [kik, dor, tendang]
│• promote
│• demote
┗┈─┄┈─┄─ᯓ

┏┈─┄ *Downloader Menu* ᯓ
│• tiktok
│• tikslide
│• instagram
┗┈─┄┈─┄─ᯓ
`;
                    leap.sendMessage(
                        m.chat, { image: { url: global.thumbnail },
                            caption: menyiw,
                            contextInfo: {
                                forwardingScore: 999,
                                isForwarded: true,
                                mentionedJid: [sender],
                                forwardedNewsletterMessageInfo: {
                                    newsletterName: global.titlech,
                                    newsletterJid: global.idch
                                },
                                externalAdReply: {
                                    title: global.botname,
                                    body: `${lilydate}`,
                                    thumbnail: ppnyauser,
                                    sourceUrl:
                                        "https://github.com/TanakaDomp/Lilychanj-Script",
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }
                            }
                        },
                        { quoted: kia }
                    );
                }
                break;

            //=================================================//

            case "public":
                {
                    await reaction(m.chat, "🤪");
                    leap.public = true;
                    await reply(
                        "*Sukses ubah mode Bot!*\n> Status Bot : `Public`"
                    );
                }
                break;

            case "self": {
                await reaction(m.chat, "🤪");
                leap.public = false;
                await reply("*Sukses ubah mode Bot!*\n> Status Bot : `Self`");
            }
            break
            
            case "listcase": {
            if(!isCreator) return reply(mess.owner)
let { listCase } = require('./App/scraper/listCase.js')
reply(listCase())
}
break

            
case "upch": {
    if (!isCreator) return reply(mess.owner)
    try {

        let fotoProfil = await getBuffer(ppnyauser)
        let pelers = `Message from ${pushname}`
        
        const media = mime ? await quoted.download() : null
        const textMessage = text ? text : "\`Pesan dikirim via Bot😆\`"

        if (/image/.test(mime)) {
            await leap.sendMessage(idch, {
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        title: pelers,
                        mediaType: 1,
                        previewType: 1,
                        body: 'Massage to channel',
                        thumbnail: fotoProfil,
                        renderLargerThumbnail: false,
                        mediaUrl: '',
                        sourceUrl: ''
                    }
                },
                image: media,
                caption: textMessage // Text sebagai caption
            })
            reply(`✅ Gambar + Text berhasil diupload!`)
        
        } else if (/video/.test(mime)) {
            await leap.sendMessage(idch, {
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        title: pelers,
                        mediaType: 1,
                        previewType: 1,
                        body: 'Massage to channel',
                        thumbnail: fotoProfil,
                        renderLargerThumbnail: false,
                        mediaUrl: '',
                        sourceUrl: ''
                    }
                },
                video: media,
                caption: textMessage // Text sebagai caption
            })
            reply(`✅ Video + Text berhasil diupload!`)
        
        } else if (/audio/.test(mime)) {
            await leap.sendMessage(idch, {
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        title: pelers,
                        mediaType: 1,
                        previewType: 1,
                        body: 'Massage to channel',
                        thumbnail: fotoProfil,
                        renderLargerThumbnail: false,
                        mediaUrl: '',
                        sourceUrl: ''
                    }
                },
                audio: media,
                mimetype: mime,
                ptt: true,
                caption: textMessage // Text sebagai caption untuk audio
            })
            reply(`✅ Audio + Text berhasil dikirim!`)
        
        } else if (text) { // [FIX] Handle text-only
            await leap.sendMessage(idch, {
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        title: pelers,
                        mediaType: 1,
                        previewType: 1,
                        body: 'Massage to channel',
                        thumbnail: fotoProfil,
                        renderLargerThumbnail: false,
                        mediaUrl: '',
                        sourceUrl: ''
                    }
                },
                text: textMessage // Text utama
            })
            reply(`✅ Text berhasil dikirim!\n✉️ Pesan: "${text}"`)
        
        } else {
            reply(example(`sertakan teks/media`))
        }

    } catch (error) {
        console.error('Upch Error:', error)
        reply(`🚨 Gagal mengirim! Error: ${error.message}`)
    }
  }
break

case "backup":
    {
        if (m.sender.split("@")[0] !== global.owner && m.sender !== botNumber) return reply(mess.owner)
        let dir = await fs.readdirSync("./tmp")
        if (dir.length >= 2) {
            let res = dir.filter(e => e !== "A")
            for (let i of res) {
                await fs.unlinkSync(`./tmp/${i}`)
            }
        }
        await reaction(m.chat, "😏")
        await reply("Tunggu sebentar...")
        var name = `Osaragi-Backup`
        const ls = (await execSync("ls"))
            .toString()
            .split("\n")
            .filter(
        (pe) => pe != "node_modules" && pe != "session" && pe != "package-lock.json" && pe != "yarn.lock" && pe != "")
        const anu = await execSync(`zip -r ${name}.zip ${ls.join(" ")}`)
        await leap.sendMessage(m.sender, {
            document: await fs.readFileSync(`./${name}.zip`),
            fileName: `${name}.zip`,
            mimetype: "application/zip"
        }, {
            quoted: m
        })
        await execSync(`rm -rf ${name}.zip`)
        if (m.chat !== m.sender) return m.reply("Script bot berhasil dikirim ke private chat")
    }
    break

case "setpp": {
    if (!isCreator) return reply(mess.owner)
        let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || ""

    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        let media = await q.download();
        let { img } = await pepe(media)
        await leap.updateProfilePicture(leap.decodeJid(leap.user.id), img);
        reply("*Sukses merubah Foto Profil Bot!*")
    } else {
        reply(example("reply/kirim gambarnya"))
    }
}
break

      case "get": {
if (!isCreator) return reply(mess.owner)
        if (!/^https?:\/\//.test(text)) return reply(example(`https://kyuurzy.site`));
        const ajg = await fetch(text);
          await reaction(m.chat, "🍁")
        if (ajg.headers.get("content-length") > 100 * 1024 * 1024) {
            throw `Content-Length: ${ajg.headers.get("content-length")}`;
        }

        const contentType = ajg.headers.get("content-type");
        if (contentType.startsWith("image/")) {
            return leap.sendMessage(
                m.chat,
                { image: { url: text } },
                { quoted: m }
            );
        }
        if (contentType.startsWith("video/")) {
            return leap.sendMessage(
                m.chat,
                { video: { url: text } },
                { quoted: m }
            );
        }
        if (contentType.startsWith("audio/")) {
            return leap.sendMessage(
                m.chat,
                { audio: { url: text },
                mimetype: 'audio/mpeg', 
                ptt: true
                },
                { quoted: m }
            );
        }
        
        let alak = await ajg.buffer();
        try {
            alak = util.format(JSON.parse(alak + ""));
        } catch (e) {
            alak = alak + "";
        } finally {
            return reply(alak.slice(0, 65536));
        }
      }
      break
      
//=================================================//

case "h": 
case "hidetag":
case "totag": {
    if (!m.isGroup) return reply(mess.group); 
    if (!isAdmins) return reply(mess.admin); 
    let users = participants.map(u => u.id).filter(v => v !== leap.user.jid)
    if (!m.quoted) return reply(example('reply pesan/image'));
    leap.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: users } )
}
break;

case "tagall": {
    if (!m.isGroup) return reply(mess.group)
        if (!isAdmins) return reply(mess.admin)
    let teks = `\n──.ᝣ *Tag All* ─.ᝣ
> *Pesan : ${text ? text : 'kosong'}*\n\n`
    for (let mem of participants) {
        teks += `◉ @${mem.id.split('@')[0]}\n`
    }
    leap.sendMessage(m.chat, {
        text: teks,
        mentions: participants.map(a => a.id)
    }, {
        quoted: m
    })
    }
 break

 case "kick": 
case "kik":
case "dor": {
    if (!m.isGroup) return reply(mess.group);
    if (!isAdmins) return reply(mess.admin);
    if (!m.mentionedJid.length && !m.quoted) {
        return reply(example(`tag/reply membernya`));
    }

    let dor = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    await leap.groupParticipantsUpdate(from, [dor], "remove");
    reply(`Berhasil mengeluarkan @${dor.split("@")[0]} dari grup`);
}
break;

case "promote": {
    if (!m.isGroup) return reply(mess.group);
    if (!isAdmins) return reply(mess.admin);
    if (!m.mentionedJid.length && !m.quoted) {
        return reply(example(`tag/reply membernya`));
    }

    let promoteMember = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    
    try {
        await leap.groupParticipantsUpdate(from, [promoteMember], "promote");
        reply(`Berhasil menjadikan @${promoteMember.split('@')[0]} menjadi admin grup.`);
    } catch (error) {
        console.error(error);
        reply("Gagal mempromosikan anggota. Silakan periksa apakah anggota tersebut sudah menjadi admin atau ada kesalahan lainnya.");
    }
}
break;

case "demote": {
    if (!m.isGroup) return reply(mess.group);
    if (!isAdmins) return reply(mess.admin);
    if (!m.mentionedJid.length && !m.quoted) {
        return reply(example(`tag/reply atminnya`));
    }

    let demoteMember = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    
    try {
        await leap.groupParticipantsUpdate(from, [demoteMember], "demote");
        reply(`Berhasil mendemote @${demoteMember.split('@')[0]} dari admin grup.`);
    } catch (error) {
        console.error(error);
        reply("Gagal mendemote anggota. Silakan periksa apakah anggota tersebut bukan admin atau ada kesalahan lainnya.");
    }
}
break;

//=================================================//

case "instagram":
case "ig":
case "igdl": {
if (!text) return reply(example(`url instagramnya`))
await reaction(m.chat, "😆")
await reply(mess.wait)
await fetch(`https://api.diioffc.web.id/api/download/instagram?url=${text}`).then(async (res) => {
const response = await res.json()
const url = response.result[0].url
if (url.includes('jpg')) {
if (m.isGroup) {
response.result.forEach(async (k) => {
await leap.sendMessage(m.sender, { image: { url: k.url }}, { quoted: m })
})
reply(`All photos have been sent to your private chat`)
} else {
response.result.forEach(async (k) => {
await leap.sendMessage(from, { image: { url: k.url }}, { quoted: m })
})
}
} else {
leap.sendMessage(m.chat, { video: { url: response.result[0].url }, caption: `${mess.done}` }, { quoted: m })
}
}).catch(err => reply('Error 🗿'))
}
break

case "tiktok": 
case "tt":
case "tiktokdl": {
    if (!text) return reply(example("https://vt.tiktok.com/ZSM68ybYG/"));

    if (!(text.includes('http://') || text.includes('https://'))) return reply(`URL tidak valid, silakan masukkan URL yang valid.`);
    if (!text.includes('tiktok.com')) return reply(`URL Tiktok tidak valid.`);

    try {
        await reaction(m.chat, "😆");
        await reply(mess.wait);
        
        const response = await fetch(`https://api.diioffc.web.id/api/download/tiktok?url=${encodeURIComponent(text)}`);
        const data = await response.json();

        if (!data.status) {
            return reply("Gagal mengambil data dari TikTok.");
        }

        const result = data.result;
        const videoUrl = result.play; 
        const audioUrl = result.music_info.play;
        const title = result.title; 
        const author = result.author.nickname; 

        // If video URL exists, send the video and audio
        if (videoUrl) {
            await leap.sendMessage(m.chat, {
                video: await fetchBuffer(videoUrl),
                caption: `> ${title}\n- *Author: ${author}*`
            }, {
                quoted: m
            });

            await leap.sendMessage(m.chat, {
                audio: await fetchBuffer(audioUrl),
                mimetype: 'audio/mpeg'
            }, {
                quoted: m
            });
        }

    } catch (e) {
        console.error(e);
        m.reply("Terjadi kesalahan saat mengambil video dari TikTok.");
    }
}
break;

case "tikjpg":
case "tikslide": {
    if (!text) return reply(example("https://vt.tiktok.com/ZSM68ybYG/"));

    if (!(text.includes('http://') || text.includes('https://'))) return reply(`URL tidak valid, silakan masukkan URL yang valid.`);
    if (!text.includes('tiktok.com')) return reply(`URL Tiktok tidak valid.`);

    try {
        await reaction(m.chat, "😆");
        await reply(mess.wait);
        
        const response = await fetch(`https://api.diioffc.web.id/api/download/tiktok?url=${encodeURIComponent(text)}`);
        const data = await response.json();

        if (!data.status) {
            return reply("Gagal mengambil data dari TikTok.");
        }

        const result = data.result;
        const audioUrl = result.music_info.play;
 
        // If video URL exists, send the video and audio
        if (result.images && result.images.length > 0) {
            await leap.sendMessage(m.chat, {
                audio: await fetchBuffer(audioUrl),
                mimetype: 'audio/mpeg'
            }, {
                quoted: m
            });

            for (let i = 0; i < result.images.length; i++) {
                const imageUrl = result.images[i];
                await leap.sendMessage(m.chat, {
                    image: await fetchBuffer(imageUrl),
                    caption: `Hasil Foto ke ${i + 1}` 
                }, {
                    quoted: m
                });
            }
        }

    } catch (e) {
        console.error(e);
        m.reply("Terjadi kesalahan saat mengambil video dari TikTok.");
    }
}
break;

//=================================================//

case "tourl": {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';

        // Memastikan MIME type valid untuk media
        if (mime && (mime.startsWith('image/') || mime.startsWith('video/') || mime.startsWith('audio/'))) {
            let media = await q.download();
            if (media.length > 100 * 1024 * 1024) return reply('File size terlalu besar (Max 100MB)');
           await reaction(m.chat, "🍁")
           
            let filename = `./tmp/${Date.now()}.${mime.split('/')[1]}`;
            fs.writeFileSync(filename, media);

            let formData = new FormData();
            formData.append('file', fs.createReadStream(filename));
            formData.append('expirationOption', 'permanent');

            let res = await fetch('https://Nauval.mycdn.biz.id/upload', {
                method: 'POST',
                body: formData
            });
            
            let json = await res.json();
            fs.unlinkSync(filename); // Hapus file setelah upload

            if (json.success) {
                await reply(`*File Upload to URL* 🗂️

* *Link :* ${json.fileUrl}
* *Expired :* Permanent`.trim(), m);
            } else {
                throw new Error('Upload gagal: ' + json.message);
            }

        } else {
            return reply('Hanya mendukung pengunggahan media (gambar, video, audio).');
        }

    } catch (e) {
        console.error(e);
        await reply(`*ERROR:* ${e.message}`);
    }
}
break;

case "ping": {
await reaction(m.chat, "💾")
	const used = process.memoryUsage()
                const cpus = os.cpus().map(cpu => {
                    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
			        return cpu
                })
                const cpu = cpus.reduce((last, cpu, _, { length }) => {
                    last.total += cpu.total
                    last.speed += cpu.speed / length
                    last.times.user += cpu.times.user
                    last.times.nice += cpu.times.nice
                    last.times.sys += cpu.times.sys
                    last.times.idle += cpu.times.idle
                    last.times.irq += cpu.times.irq
                    return last
                }, {
                    speed: 0,
                    total: 0,
                    times: {
			            user: 0,
			            nice: 0,
			            sys: 0,
			            idle: 0,
			            irq: 0
                }
                })
                let timestamp = speed()
                let latensi = speed() - timestamp
              let  neww = performance.now()
              let  oldd = performance.now()
              
               let respon = reply(`
Response Speed ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
                `.trim())
    }
	break
	
case 'sticker':
case 'stiker':
case 's': {
    if (!quoted) return reply(example("kirim gambar/video"));
await reaction(m.chat, "🎐")
    if (/image/.test(mime)) {
        let media = await quoted.download();
        let encmedia = await leap.sendImageAsSticker(m.chat, media, m, {
            packname: global.packname,
            author: global.author
        });
        await fs.unlinkSync(encmedia);
    } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 11) return reply('Maksimal 10 detik!');
        let media = await quoted.download();
        let encmedia = await leap.sendVideoAsSticker(m.chat, media, m, {
            packname: global.packname,
            author: global.author
        });
        await fs.unlinkSync(encmedia);
    } else {
        return reply(example("kirim gambar/video"));
    }
}
break 

case "qc": {
    const { quote } = require('./App/scraper/quote.js');
    let text;

    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else {
        return reply(example("nasukkan text"));
    }

    if (!text) return reply(example('masukan text'));
    if (text.length > 200) return reply("maksimal 200 teks!")

    let ppnyauser = await leap.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/nwvkbt.png');
    await reaction(m.chat, "🎐")
    const rest = await quote(text, pushname, ppnyauser);
    leap.sendImageAsSticker(m.chat, rest.result, m, {
        packname: `${global.packname}`,
        author: `${global.author}`
    });
}
break

case 'brat': {
    let text;

    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else {
        return reply(example("teksnya"));
    }

    if (!text) {
        return reply(example("berikan teksnya"))
    }
await reaction(m.chat, "🎐")
    let ngawiStik = await getBuffer(`https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(text)}`);
    await leap.sendImageAsSticker(m.chat, ngawiStik, m, {
        packname: global.packname,
        author: global.author
    });
}
break;

case 'bratvid':
case 'bratvidio':
case 'bratvideo': {
  if (!text) return reply(example("hai halo"))
  await reaction(m.chat, "🎐")
  if (text.length > 250) return reply(`Karakter terbatas, max 250!`)

  const words = text.split(" ")
  const tempDir = path.join(process.cwd(), 'lib')
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir)
  const framePaths = []

  try {
    for (let i = 0; i < words.length; i++) {
      const currentText = words.slice(0, i + 1).join(" ")

      const res = await axios.get(
        `https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(currentText)}`,
        { responseType: "arraybuffer" }
      ).catch((e) => e.response)

      const framePath = path.join(tempDir, `frame${i}.mp4`)
      fs.writeFileSync(framePath, res.data)
      framePaths.push(framePath)
    }

    const fileListPath = path.join(tempDir, "filelist.txt")
    let fileListContent = ""

    for (let i = 0; i < framePaths.length; i++) {
      fileListContent += `file '${framePaths[i]}'\n`
      fileListContent += `duration 0.7\n`
    }

    fileListContent += `file '${framePaths[framePaths.length - 1]}'\n`
    fileListContent += `duration 2\n`

    fs.writeFileSync(fileListPath, fileListContent)
    const outputVideoPath = path.join(tempDir, "output.mp4")
    execSync(
      `ffmpeg -y -f concat -safe 0 -i ${fileListPath} -vf "fps=30" -c:v libx264 -preset ultrafast -pix_fmt yuv420p ${outputVideoPath}`
    )

    await leap.sendImageAsSticker(m.chat, outputVideoPath, m, {
      packname: global.packname,
      author: global.author
    })

    framePaths.forEach((frame) => {
      if (fs.existsSync(frame)) fs.unlinkSync(frame)
    })
    if (fs.existsSync(fileListPath)) fs.unlinkSync(fileListPath)
    if (fs.existsSync(outputVideoPath)) fs.unlinkSync(outputVideoPath)
  } catch (err) {
    console.error(err)
    reply('Terjadi kesalahan')
  }
}
break

//=================================================//


            default:
                if (budy.startsWith("$")) {
                    if (!isCreator) return m.reply(mess.owner);
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return m.reply(err);
                        if (stdout) return m.reply(stdout);
                    });
                }

                if (budy.startsWith("<")) {
                    if (!isCreator) return m.reply(mess.owner);
                    try {
                        let evaled = await eval(budy.slice(2));
                        if (typeof evaled !== "string")
                            evaled = require("util").inspect(evaled);
                        await m.reply(evaled);
                    } catch (err) {
                        await m.reply(String(err));
                    }
                }

                if (budy.startsWith("~>")) {
                    if (!isCreator) return m.reply(mess.owner);

                    function Return(sul) {
                        let sat = JSON.stringify(sul, null, 2);
                        let bang = util.format(sat);
                        if (sat === undefined) {
                            bang = util.format(sul);
                        }
                        return m.reply(bang);
                    }

                    try {
                        m.reply(
                            util.format(
                                eval(
                                    `(async () => { return ${budy.slice(
                                        3
                                    )} })()`
                                )
                            )
                        );
                    } catch (e) {
                        m.reply(String(e));
                    }
                }
            //batas euy
        }
    } catch (err) {
        let formattedError = util.format(err);
        let errorMessage = String(formattedError);
        let stackTrace = err.stack ? err.stack : "Stack trace not available";
        if (typeof err === "string") {
            m.reply(`Terjadi error:\n\nKeterangan Error: ${errorMessage}`);
        } else {
            console.log(formattedError);
        }
    }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.green.bold(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
