import CryptoJS from 'crypto-js'
import lz from 'lzutf8'

export const parseJwt = (token) => {
    try {
        if (!token) return;
        if (!token.length) return;

        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
    catch (err) {
        console.error(err);
    }
};

export const encrypt = (str) => {
    try {
        const salt = CryptoJS.lib.WordArray.random(128/8);
        const iv = CryptoJS.lib.WordArray.random(128/8);

        const key = CryptoJS.PBKDF2(process.env.ENCRYPT_KEY, salt, {
            keySize: 256 / 32,
            iterations: 100
        });

        const encrypted = CryptoJS.AES.encrypt(str, key, { 
            iv: iv, 
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC 
        });

        const ret = salt.toString() + iv.toString() + encrypted.toString();

        return ret;
    }
    catch (err) {
        console.error(err);
    }
}

export const decrypt = (encryptedStr) => {
    try {
        const salt = CryptoJS.enc.Hex.parse(encryptedStr.substr(0, 32));
        const iv = CryptoJS.enc.Hex.parse(encryptedStr.substr(32, 32));
        const encrypted = encryptedStr.substring(64);

        const key = CryptoJS.PBKDF2(process.env.ENCRYPT_KEY, salt, {
            keySize: 256 / 32,
            iterations: 100
        })
      
        const decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
            iv: iv, 
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        })

        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    catch (err) {
        console.error(err);
    }
}

export const decryptToken = (encryptedToken, tokenOnly = false) => {
    try {
        const token = JSON.parse(decrypt(encryptedToken));

        if (tokenOnly) return token;

        const data = parseJwt(token.accessToken);
        
        return data;
    }
    catch (err) {
        console.error(err);
    }
}

export const getCurrencyFromWallet = (wallet) => {
    let currency = 'eth'
    switch (wallet) {
        case 'metamask':
        case 'coinbase':
        case 'walletconnect':
            currency = 'eth'
            break;
        case 'phantom':
            currency = 'sol'
    }
    return currency;
}

// https://crypto.com/price/<currency>
export const getPriceFromService = (service, currency = 'usd') => {
    const price = {
        generator: { usd: 25, eth: 0.02165, sol: 0.6942 },
        website: { usd: 15, eth: 0.01299, sol: 0.4165 },
        utils: { usd: 5, eth: 0.004558, sol: 0.1528 },
    }[service][currency];

    return price || 25;
}

export const formatRobot = (robot) => {
    let ret = 'index, follow'
    switch (robot) {
        case 'if':
            ret = 'index, follow'
            break;
        case 'nf':
            ret = 'noindex, follow'
            break;
        case 'in':
            ret = 'index, nofollow'
            break;
        case 'nn':
            ret = 'noindex, nofollow'
    }
    return ret;
}

export const EncodeWebsiteData = (dataObj) => {
    return lz.encodeBase64(lz.compress(JSON.stringify(dataObj)));
}

export const ParseWebsiteData = (data) => {
    try {
        return JSON.parse(lz.decompress(lz.decodeBase64(data)));
    }
    catch (err) {
        return null;
    }
}

export const convertDateToLocal = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, -1);
}

export const convertLocalToDate = (local) => {
    return new Date(local);
}

export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = (Math.random() * currentIndex) | 0;
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export const getAccessToken = () => {
    const encryptedToken = localStorage.getItem('nfthost-user');
    if (!encryptedToken) throw new Error('Cannot get access token');
    return decryptToken(encryptedToken, true).accessToken;
}