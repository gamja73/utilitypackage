import {Buffer} from "buffer";
import {Base64} from "js-base64";
import * as CryptoJS from "crypto-js";
import iconv from "iconv-lite";
import "iconv-lite/encodings";

export const EncodingUtils = {
    toBinary: (str: string): string => Array.from(new TextEncoder().encode(str)).map(b => b.toString(2).padStart(8, "0")).join(" "),
    fromBinary: (binStr: string): string => new TextDecoder().decode(Uint8Array.from(binStr.split(" ").map(bin => parseInt(bin, 2)))),

    toHex: (str: string): string => Buffer.from(str, "utf-8").toString("hex"),
    fromHex: (hex: string): string => Buffer.from(hex, "hex").toString("utf-8"),

    toUTF8: (str: string): string => Array.from(new TextEncoder().encode(str)).map(b => `\\x${b.toString(16).padStart(2, "0")}`).join(""),
    fromUTF8: (utf8Str: string): string => {
        const matches = utf8Str.match(/\\x([0-9a-fA-F]{2})/g);
        if (!matches) return "";
        const bytes = matches.map(h => parseInt(h.slice(2), 16));
        return new TextDecoder().decode(new Uint8Array(bytes));
    },

    toUnicode: (str: string): string => [...str].map(c => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0").toUpperCase()}`).join(""),
    fromUnicode: (str: string): string => str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))),

    toURL: (str: string): string => encodeURIComponent(str),
    fromURL: (str: string): string => decodeURIComponent(str),

    toBase64: (str: string): string => Base64.encode(str),
    fromBase64: (b64: string): string => Base64.decode(b64),

    toASCII: (str: string): string => iconv.encode(str, "ascii").toString("hex"),
    fromASCII: (hex: string): string => iconv.decode(Buffer.from(hex, "hex"), "ascii"),

    toUTF16LE: (str: string): string => {
        const buf = iconv.encode(str, "utf16-le");
        return Array.from(buf).map(b => b.toString()).join(",");
    },
    fromUTF16LE: (str: string): string => iconv.decode(Buffer.from(str.split(",").map(Number)), "utf16-le"),

    toUTF16BE: (str: string): string => {
        const buf = iconv.encode(str, "utf16-be");
        return Array.from(buf).map(b => b.toString()).join(",");
    },
    fromUTF16BE: (str: string): string => iconv.decode(Buffer.from(str.split(",").map(Number)), "utf16-be"),

    toUTF32LE: (str: string): string => {
        const codePoints = Array.from(str).map(c => c.codePointAt(0)!);
        const buf = new Uint8Array(codePoints.length * 4);
        codePoints.forEach((cp, i) => {
            buf[i * 4] = cp & 0xff;
            buf[i * 4 + 1] = (cp >> 8) & 0xff;
            buf[i * 4 + 2] = (cp >> 16) & 0xff;
            buf[i * 4 + 3] = (cp >> 24) & 0xff;
        });
        return Array.from(buf).join(",");
    },
    fromUTF32LE: (str: string): string => {
        const bytes = Uint8Array.from(str.split(",").map(Number));
        const codePoints = [];
        for (let i = 0; i < bytes.length; i += 4) {
            const cp = bytes[i] + (bytes[i + 1] << 8) + (bytes[i + 2] << 16) + (bytes[i + 3] << 24);
            codePoints.push(cp);
        }
        return String.fromCodePoint(...codePoints);
    },

    toUTF32BE: (str: string): string => {
        const codePoints = Array.from(str).map(c => c.codePointAt(0)!);
        const buf = new Uint8Array(codePoints.length * 4);
        codePoints.forEach((cp, i) => {
            buf[i * 4] = (cp >> 24) & 0xff;
            buf[i * 4 + 1] = (cp >> 16) & 0xff;
            buf[i * 4 + 2] = (cp >> 8) & 0xff;
            buf[i * 4 + 3] = cp & 0xff;
        });
        return Array.from(buf).join(",");
    },
    fromUTF32BE: (str: string): string => {
        const bytes = Uint8Array.from(str.split(",").map(Number));
        const codePoints = [];
        for (let i = 0; i < bytes.length; i += 4) {
            const cp = (bytes[i] << 24) + (bytes[i + 1] << 16) + (bytes[i + 2] << 8) + bytes[i + 3];
            codePoints.push(cp);
        }
        return String.fromCodePoint(...codePoints);
    },

    toISO88591: (str: string): string => Array.from(iconv.encode(str, "latin1")).map(b => b.toString()).join(","),
    fromISO88591: (str: string): string => iconv.decode(Buffer.from(str.split(",").map(Number)), "latin1"),

    toEncoded: (str: string, encoding: string): string => Array.from(iconv.encode(str, encoding)).map(b => b.toString()).join(","),
    fromEncoded: (str: string, encoding: string): string => iconv.decode(Buffer.from(str.split(",").map(Number)), encoding),

    sha256: (str: string): string => CryptoJS.SHA256(str).toString(),
    sha384: (str: string): string => CryptoJS.SHA384(str).toString(),
    sha512: (str: string): string => CryptoJS.SHA512(str).toString()
};
