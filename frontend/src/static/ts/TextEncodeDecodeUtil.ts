import { Buffer } from 'buffer';
import { Base64 } from 'js-base64';
// import base32 from 'base32.js';
import * as CryptoJS from 'crypto-js';
import iconv from 'iconv-lite';
import 'iconv-lite/encodings';

const TextEncoding = globalThis.TextDecoder ? globalThis : require('text-encoding');

export const EncodingUtils = {
    /** ---------- Binary / Hex / Base64 / Base32 ---------- */
    toBinary: (str: string): string => Buffer.from(str, 'utf8').toString('binary'),
    fromBinary: (bin: string): string => Buffer.from(bin, 'binary').toString('utf8'),

    toHex: (str: string): string => Buffer.from(str, 'utf8').toString('hex'),
    fromHex: (hex: string): string => Buffer.from(hex, 'hex').toString('utf8'),

    toBase64: (str: string): string => Base64.encode(str),
    fromBase64: (b64: string): string => Base64.decode(b64),

    // toBase32: (str: string): string => {
    //     const encoder = new base32.Encoder();
    //     return encoder.write(Buffer.from(str, 'utf8')).finalize();
    // },
    // fromBase32: (b32: string): string => {
    //     const decoder = new base32.Decoder();
    //     const bytes = decoder.write(b32).finalize();
    //     return Buffer.from(bytes).toString('utf8');
    // },

    /** ---------------- URL ---------------- */
    toURL: (str: string): string => encodeURIComponent(str),
    fromURL: (encoded: string): string => decodeURIComponent(encoded),

    /** ---------------- ASCII / Unicode ---------------- */
    toASCII: (str: string): string => Buffer.from(str, 'ascii').toString('hex'),
    fromASCII: (hex: string): string => Buffer.from(hex, 'hex').toString('ascii'),

    /** ---------------- UTF encodings ---------------- */
    toUTF8: (str: string): Uint8Array => Buffer.from(str, 'utf8'),
    fromUTF8: (bytes: Uint8Array): string => Buffer.from(bytes).toString('utf8'),

    toUTF16LE: (str: string): Buffer => Buffer.from(str, 'utf16le'),
    fromUTF16LE: (buf: Buffer): string => buf.toString('utf16le'),

    toUTF16BE: (str: string): Uint8Array => {
        const encoder = new TextEncoding.TextEncoder('utf-16be');
        return encoder.encode(str);
    },
    fromUTF16BE: (buf: Uint8Array): string => {
        const decoder = new TextEncoding.TextDecoder('utf-16be');
        return decoder.decode(buf);
    },

    // UTF-32 (LE)
    toUTF32LE: (str: string): Buffer => {
        const codePoints = Array.from(str).map(c => c.codePointAt(0) || 0);
        const buf = Buffer.alloc(codePoints.length * 4);
        codePoints.forEach((cp, i) => buf.writeUInt32LE(cp, i * 4));
        return buf;
    },
    fromUTF32LE: (buf: Buffer): string => {
        const codePoints = [];
        for (let i = 0; i < buf.length; i += 4) {
            codePoints.push(buf.readUInt32LE(i));
        }
        return String.fromCodePoint(...codePoints);
    },

    // UTF-32 (BE)
    toUTF32BE: (str: string): Buffer => {
        const codePoints = Array.from(str).map(c => c.codePointAt(0) || 0);
        const buf = Buffer.alloc(codePoints.length * 4);
        codePoints.forEach((cp, i) => buf.writeUInt32BE(cp, i * 4));
        return buf;
    },
    fromUTF32BE: (buf: Buffer): string => {
        const codePoints = [];
        for (let i = 0; i < buf.length; i += 4) {
            codePoints.push(buf.readUInt32BE(i));
        }
        return String.fromCodePoint(...codePoints);
    },

    /** ---------------- ISO-8859-1 ---------------- */
    toLatin1: (str: string): Uint8Array => {
        const encoder = new TextEncoding.TextEncoder('iso-8859-1');
        return encoder.encode(str);
    },
    fromLatin1: (buf: Uint8Array): string => {
        const decoder = new TextEncoding.TextDecoder('iso-8859-1');
        return decoder.decode(buf);
    },

    /** ---------------- EUC, KOI8 encodings via iconv-lite ---------------- */
    toEncoded: (str: string, encoding: string): Buffer => iconv.encode(str, encoding),
    fromEncoded: (buf: Buffer, encoding: string): string => iconv.decode(buf, encoding),

    /** ---------------- Hashing ---------------- */
    sha256: (str: string): string => CryptoJS.SHA256(str).toString(),
    sha384: (str: string): string => CryptoJS.SHA384(str).toString(),
    sha512: (str: string): string => CryptoJS.SHA512(str).toString()
};
