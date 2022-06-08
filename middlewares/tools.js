const lz = require('lzutf8');

module.exports.EncodeWebsiteData = (dataObj) => {
    return lz.encodeBase64(lz.compress(JSON.stringify(dataObj)));
}

module.exports.ParseWebsiteData = (data) => {
    return JSON.parse(lz.decompress(lz.decodeBase64(data)));
}