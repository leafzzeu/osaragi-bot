const fs = require('fs')
const chalk = require('chalk')

//====== [ SETTING PAIRING & TOKEN ] ========//
global.pairing = '6283125380395'
global.custpair = "OSARAGII"

//====== [ SETTING OWNER  ] ========//
global.owner = [ "6287858976852" ]
global.owner0 = '6287858976852@s.whatsapp.net'
global.ownernumber = '6287858976853'
global.ownername = "leaf3u"

//====== [ SETTING BOT ] ========//
global.botname = '─osaragi'
global.botnumber = ' 6283125380395'
global.version = '1.0.0'
global.prefa = ['/','!','.','#','&']

//====== [ SETTING PACKNAME ] ========//
global.packname = '─Osaragi Bot'
global.author = 'leaf3u'
global.themeemoji = '🍁'
global.wm = "osaragi - san"
global.idch = '120363323564603101@newsletter'
global.titlech = '[ # ] leaf3u\`s channel'

//====== [ THEME URL & URL ] ========//
global.thumbnail = 'https://nauval.mycdn.biz.id/download/1739708331695.jpeg'
global.icon = "https://nauval.mycdn.biz.id/download/1739715153039.jpeg"
global.Url = 'https://whatsapp.com/channel/0029ValiIsD3LdQdVh8v3J2Q'

//====== [ GLOBAL MESSAGES  ] ========//
global.mess = {
    done: '*( ✅ )* Success!!',
    prem: 'Sorry, this feature can only be used by premium users.\nIf you want to buy premium, type *.buyprem*',
    admin: '*( Error )* Fitur ini khusus untuk penjabat!!',
    botadmin: '*( Error )* Sepertinya lilychanj bukan admin!!',
    owner: '*( Error )* Kamu bukan ownerkuu!!',
    group: '*( Error )* Fitur ini khusus dalam group!!',
    private: '*( Error )* Fitur ini hanya untuk private chat!!',
    wait: '*( Loading )* Chotto matte...',
    error: 'Error!',
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(`Update'${__filename}'`)
    delete require.cache[file]
    require(file)
})