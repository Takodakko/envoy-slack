const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
let secretKey = ''; 
crypto.scrypt(process.env.ENVOY_CLIENT_SECRET, 'Envoy', 32, (err, key) => {
    secretKey = key;
});

let encrypt = (token) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([iv, cipher.update(token), cipher.final()]);

    return  encrypted.toString('hex');
}

let decrypt = (token) => {
    let msg = Buffer.from(token, 'hex');
    let iv = Uint8Array.prototype.slice.call(msg, 0, 16); // Get IV from msg
    msg = Uint8Array.prototype.slice.call(msg, 16); // Remove IV from msg
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    const decrypyted = Buffer.concat([decipher.update(msg), decipher.final()]);

    return decrypyted.toString();
}

module.exports = {
    encrypt,
    decrypt
}