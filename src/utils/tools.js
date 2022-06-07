import CryptoJS from 'crypto-js'

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

export const getPriceFromService = (service, inETH = false) => {
    const price = {
        generator: inETH ? 0.014 : 25,
        website: inETH ? 0.0085 : 15
    }[service];

    return price;
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