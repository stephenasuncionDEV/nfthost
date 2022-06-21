const lz = require('lzutf8');
const dns = require('dns');

module.exports.EncodeWebsiteData = (dataObj) => {
    return lz.encodeBase64(lz.compress(JSON.stringify(dataObj)));
}

module.exports.ParseWebsiteData = (data) => {
    return JSON.parse(lz.decompress(lz.decodeBase64(data)));
}

module.exports.VerifyDns = async (domain) => {
    return new Promise((resolve) => {
        try {
            dns.resolveAny(domain, (err, records) => {
                if (err) resolve({ type: 'failed', status: false });

                console.log(records)

                const types = records.map((record) => record.type);
                const aliasIdx = types.indexOf('A');
                const cnameIdx = types.indexOf('CNAME');

                let verified = false;

                if (aliasIdx !== -1) {
                    verified = (records[aliasIdx].address === '76.76.21.241' || records[aliasIdx].address === '76.76.21.9');
                    if (verified) resolve({
                        type: 'alias',
                        status: true
                    })
                }

                if (cnameIdx !== -1) {
                    verified = (records[cnameIdx].address.indexOf('nfthost.app') !== -1);
                    if (verified) resolve({
                        type: 'cname',
                        status: true
                    })
                }

                if (aliasIdx === -1 && cnameIdx === -1) resolve({ type: 'failed', status: false });
            })
        } catch (err) {
            resolve({ type: 'failed', status: false });
        }
    });
};