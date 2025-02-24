const axios = require('axios')
const chalk = require('chalk')
const cheerio = require("cheerio")
const FormData = require('form-data')
const fs = require('fs')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')

async function CatBox(path) {
  const data = new FormData()
  data.append('reqtype', 'fileupload')
  data.append('userhash', '')
  data.append('fileToUpload', fs.createReadStream(path))
  const config = {
    method: 'POST',
    url: 'https://catbox.moe/user/api.php',
    headers: {
      ...data.getHeaders(),
      'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
    },
    data: data
  }
  const api = await axios.request(config)
  return api.data
}

async function terabox(url) {
  try {
    const dmResponse = await axios.get(`https://ins.neastooid.xyz/api/Tools/getins?url=https://www.terabox.app/wap/share/filelist?surl=${encodeURIComponent(url)}`)
    const {
      jsToken,
      bdstoken
    } = dmResponse.data
    const rsdResponse = await axios.get(`https://ins.neastooid.xyz/api/downloader/Metaterdltes?url=${encodeURIComponent(url)}`)
    const {
      shareId,
      userKey,
      sign,
      timestamp,
      files
    } = rsdResponse.data.metadata
    const downloadResponse = await axios.post('https://ins.neastooid.xyz/api/downloader/terade', {
      shareId,
      userKey,
      sign,
      timestamp,
      jsToken,
      bdstoken,
      files
    })
    return downloadResponse.data
  } catch (err) {
    throw new Error('Terjadi kesalahan: ' + err)
  }
}


module.exports = {
   CatBox
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)})