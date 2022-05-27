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
    const data = CryptoJS.AES.encrypt(str, CryptoJS.enc.Utf8.parse(process.env.ENCRYPT_KEY));
    return data.toString();
}

export const decrypt = (str) => {
    const data = CryptoJS.AES.decrypt(str, CryptoJS.enc.Utf8.parse(process.env.ENCRYPT_KEY));
    return data.toString(CryptoJS.enc.Utf8);
}