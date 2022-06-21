const lz = require('lzutf8');
const dns = require('dns');

module.exports.EncodeWebsiteData = (dataObj) => {
    return lz.encodeBase64(lz.compress(JSON.stringify(dataObj)));
}

module.exports.ParseWebsiteData = (data) => {
    return JSON.parse(lz.decompress(lz.decodeBase64(data)));
}

module.exports.VerifyDns = (domain) => {
    return new Promise((resolve) => {
        try {
            if (domain.indexOf('www.') == -1) {
                dns.resolve4(domain, async (err, ret) => {
                    console.log(ret)
                    if (err) resolve(false);
                    const isVerified = (ret[0] === '76.76.21.241' || ret[0] === '76.76.21.9');
                    resolve({
                        status: isVerified,
                        type: 'alias'
                    });
                });
            } else {
                dns.resolveCname(domain, async (err, ret) => {
                    console.log(ret)
                    if (err) resolve(false);
                    if (!ret) return false;
                    const isVerified = (ret[0].indexOf('nfthost.app') !== -1);
                    resolve({
                        status: isVerified,
                        type: 'cname'
                    });
                });
            }
        } catch (err) {
            resolve(false);
        }
    });
};