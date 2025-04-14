import { Buffer } from 'buffer';
import { Base64 } from 'js-base64';
import * as CryptoJS from 'crypto-js';
import iconv from 'iconv-lite';
import 'iconv-lite/encodings';
export const EncodingUtils = {
    toBinary: (str) => [...str].map((char) => char.charCodeAt(0).toString(2).padStart(8, "0")).join(" "),
    fromBinary: (binStr) => binStr.split(" ").map((bin) => String.fromCharCode(parseInt(bin, 2))).join(""),
    toHex: (str) => [...str].map((char) => char.charCodeAt(0).toString(16).padStart(2, "0")).join(""),
    fromHex: (hex) => {
        let result = "";
        for (let i = 0; i < hex.length; i += 2) {
            const byte = hex.slice(i, i + 2);
            result += String.fromCharCode(parseInt(byte, 16));
        }
        return result;
    },
    toBase64: (str) => Base64.encode(str),
    fromBase64: (b64) => Base64.decode(b64),
    toURL: (str) => encodeURIComponent(str),
    fromURL: (encoded) => decodeURIComponent(encoded),
    toUnicode: (str) => [...str].map((char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0").toUpperCase()}`).join(""),
    fromUnicode: (str) => str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))),
    toASCII: (str) => iconv.encode(str, 'ascii').toString('hex'),
    fromASCII: (hex) => iconv.decode(Buffer.from(hex, 'hex'), 'ascii'),
    toUTF8: (str) => Array.from(new TextEncoder().encode(str)).toString(),
    fromUTF8: (str) => new TextDecoder('utf-8').decode(Uint8Array.from(str.split(',').map(Number))),
    toUTF16LE: (str) => {
        const buf = new Uint8Array(str.length * 2);
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            buf[i * 2] = code & 0xff;
            buf[i * 2 + 1] = (code >> 8) & 0xff;
        }
        return Array.from(buf).toString();
    },
    fromUTF16LE: (str) => {
        const encoded = Uint8Array.from(str.split(',').map(Number));
        let result = '';
        for (let i = 0; i < encoded.length; i += 2) {
            const code = encoded[i] + (encoded[i + 1] << 8);
            result += String.fromCharCode(code);
        }
        return result;
    },
    toUTF16BE: (str) => {
        const buf = new Uint8Array(str.length * 2);
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            buf[i * 2] = code >> 8;
            buf[i * 2 + 1] = code & 0xff;
        }
        return Array.from(buf).toString();
    },
    fromUTF16BE: (str) => {
        const encoded = Uint8Array.from(str.split(',').map(Number));
        let result = "";
        for (let i = 0; i < encoded.length; i += 2) {
            const code = (encoded[i] << 8) + encoded[i + 1];
            result += String.fromCharCode(code);
        }
        return result;
    },
    toUTF32LE: (str) => {
        const codePoints = Array.from(str).map(c => c.codePointAt(0) || 0);
        const buf = new Uint8Array(codePoints.length * 4);
        codePoints.forEach((cp, i) => {
            buf[i * 4] = cp & 0xff;
            buf[i * 4 + 1] = (cp >> 8) & 0xff;
            buf[i * 4 + 2] = (cp >> 16) & 0xff;
            buf[i * 4 + 3] = (cp >> 24) & 0xff;
        });
        return Array.from(buf).toString();
    },
    fromUTF32LE: (str) => {
        const encoded = Uint8Array.from(str.split(',').map(Number));
        const codePoints = [];
        for (let i = 0; i < encoded.length; i += 4) {
            const cp = encoded[i] + (encoded[i + 1] << 8) + (encoded[i + 2] << 16) + (encoded[i + 3] << 24);
            codePoints.push(cp);
        }
        return String.fromCodePoint(...codePoints);
    },
    toUTF32BE: (str) => {
        const codePoints = Array.from(str).map(c => c.codePointAt(0) || 0);
        const buf = new Uint8Array(codePoints.length * 4);
        codePoints.forEach((cp, i) => {
            buf[i * 4] = (cp >> 24) & 0xff;
            buf[i * 4 + 1] = (cp >> 16) & 0xff;
            buf[i * 4 + 2] = (cp >> 8) & 0xff;
            buf[i * 4 + 3] = cp & 0xff;
        });
        return Array.from(buf).toString();
    },
    fromUTF32BE: (str) => {
        const encoded = Uint8Array.from(str.split(',').map(Number));
        const codePoints = [];
        for (let i = 0; i < encoded.length; i += 4) {
            const cp = (encoded[i] << 24) + (encoded[i + 1] << 16) + (encoded[i + 2] << 8) + encoded[i + 3];
            codePoints.push(cp);
        }
        return String.fromCodePoint(...codePoints);
    },
    toISO88591: (str) => Array.from(iconv.encode(str, 'latin1')).toString(),
    fromISO88591: (str) => iconv.decode(Buffer.from(str.split(',').map(Number)), 'latin1'),
    toEncoded: (str, encoding) => Array.from(iconv.encode(str, encoding)).toString(),
    fromEncoded: (str, encoding) => iconv.decode(Buffer.from(str.split(',').map(Number)), encoding),
    sha256: (str) => CryptoJS.SHA256(str).toString(),
    sha384: (str) => CryptoJS.SHA384(str).toString(),
    sha512: (str) => CryptoJS.SHA512(str).toString()
};
