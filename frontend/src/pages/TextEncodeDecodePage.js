import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { EncodingUtils } from "@/static/ts/TextEncodeDecodeUtil";
import CustomSelect from "@/components/CustomSelect";
const options = [
    { value: "bin", label: "Bin" },
    { value: "hex", label: "Hex" },
    { value: "url", label: "URL" },
    { value: "base64", label: "Base64" },
    { value: "unicode", label: "Unicode" },
    { value: "sha256", label: "SHA-256" },
    { value: "sha384", label: "SHA-384" },
    { value: "sha512", label: "SHA-512" },
    { value: "utf8", label: "UTF-8" },
    { value: "utf16le", label: "UTF-16(LE)" },
    { value: "utf16be", label: "UTF-16(BE)" },
    { value: "utf32le", label: "UTF-32(LE)" },
    { value: "utf32be", label: "UTF-32(BE)" },
    { value: "ascii", label: "ASCII" }, // err
    { value: "iso88591", label: "ISO-8859-1" }, // err
    { value: "euc-kr", label: "EUC-KR" },
    { value: "euc-jp", label: "EUC-JP" },
    { value: "koi8-r", label: "KOI8-R" },
    { value: "koi8-u", label: "KOI8-U" },
    { value: "cp932", label: "cp932" },
    { value: "cp936", label: "cp936" },
    { value: "cp949", label: "cp949" },
    { value: "ms949", label: "ms949" },
    { value: "cp950", label: "cp950" },
    { value: "shift_jis", label: "shift_jis" },
    { value: "sjis", label: "sjis" },
    { value: "iso2022jp", label: "iso2022jp" },
    { value: "gbk", label: "gbk" },
    { value: "gb2312", label: "gb2312" },
    { value: "gb18030", label: "gb18030" },
    { value: "big5", label: "big5" },
    { value: "win1251", label: "win1251" },
    { value: "win1250", label: "win1250" },
    { value: "win1253", label: "win1253" },
    { value: "win1254", label: "win1254" },
    { value: "windows-1250", label: "windows-1250" },
    { value: "windows-1251", label: "windows-1251" },
    { value: "windows-1253", label: "windows-1253" },
    { value: "windows-1254", label: "windows-1254" },
    { value: "windows-1255", label: "windows-1255" },
    { value: "windows-1256", label: "windows-1256" },
    { value: "windows-1257", label: "windows-1257" },
    { value: "windows-1258", label: "windows-1258" },
    { value: "macroman", label: "macroman" },
];
const TextEncodeDecodePage = ({ isDarkMode }) => {
    const [inputText, setInputText] = React.useState("");
    const [outputText, setOutputText] = React.useState("");
    const [selectedOption, setSelectedOption] = React.useState(null);
    const handleEncode = () => {
        if (selectedOption) {
            switch (selectedOption.value) {
                case "bin":
                    setOutputText(EncodingUtils.toBinary(inputText));
                    break;
                case "hex":
                    setOutputText(EncodingUtils.toHex(inputText));
                    break;
                case "base64":
                    setOutputText(EncodingUtils.toBase64(inputText));
                    break;
                case "url":
                    setOutputText(EncodingUtils.toURL(inputText));
                    break;
                case "unicode":
                    setOutputText(EncodingUtils.toUnicode(inputText));
                    break;
                case "ascii":
                    setOutputText(EncodingUtils.toASCII(inputText));
                    break;
                case "utf8":
                    setOutputText(EncodingUtils.toUTF8(inputText));
                    break;
                case "utf16le":
                    setOutputText(EncodingUtils.toUTF16LE(inputText));
                    break;
                case "utf16be":
                    setOutputText(EncodingUtils.toUTF16BE(inputText));
                    break;
                case "utf32le":
                    setOutputText(EncodingUtils.toUTF32LE(inputText));
                    break;
                case "utf32be":
                    setOutputText(EncodingUtils.toUTF32BE(inputText));
                    break;
                case "iso88591":
                    setOutputText(EncodingUtils.toISO88591(inputText));
                    break;
                case "sha256":
                    setOutputText(EncodingUtils.sha256(inputText));
                    break;
                case "sha384":
                    setOutputText(EncodingUtils.sha384(inputText));
                    break;
                case "sha512":
                    setOutputText(EncodingUtils.sha512(inputText));
                    break;
                case "euc-kr":
                    setOutputText(EncodingUtils.toEncoded(inputText, "euc-kr"));
                    break;
                case "euc-jp":
                    setOutputText(EncodingUtils.toEncoded(inputText, "euc-jp"));
                    break;
                case "koi8-r":
                    setOutputText(EncodingUtils.toEncoded(inputText, "koi8-r"));
                    break;
                case "koi8-u":
                    setOutputText(EncodingUtils.toEncoded(inputText, "koi8-u"));
                    break;
                case "cp932":
                    setOutputText(EncodingUtils.toEncoded(inputText, "cp932"));
                    break;
                case "cp936":
                    setOutputText(EncodingUtils.toEncoded(inputText, "cp936"));
                    break;
                case "cp949":
                    setOutputText(EncodingUtils.toEncoded(inputText, "cp949"));
                    break;
                case "ms949":
                    setOutputText(EncodingUtils.toEncoded(inputText, "ms949"));
                    break;
                case "cp950":
                    setOutputText(EncodingUtils.toEncoded(inputText, "cp950"));
                    break;
                case "shift_jis":
                    setOutputText(EncodingUtils.toEncoded(inputText, "shift_jis"));
                    break;
                case "sjis":
                    setOutputText(EncodingUtils.toEncoded(inputText, "sjis"));
                    break;
                case "iso2022jp":
                    setOutputText(EncodingUtils.toEncoded(inputText, "iso2022jp"));
                    break;
                case "gbk":
                    setOutputText(EncodingUtils.toEncoded(inputText, "gbk"));
                    break;
                case "gb2312":
                    setOutputText(EncodingUtils.toEncoded(inputText, "gb2312"));
                    break;
                case "gb18030":
                    setOutputText(EncodingUtils.toEncoded(inputText, "gb18030"));
                    break;
                case "big5":
                    setOutputText(EncodingUtils.toEncoded(inputText, "big5"));
                    break;
                case "win1251":
                    setOutputText(EncodingUtils.toEncoded(inputText, "win1251"));
                    break;
                case "win1250":
                    setOutputText(EncodingUtils.toEncoded(inputText, "win1250"));
                    break;
                case "win1253":
                    setOutputText(EncodingUtils.toEncoded(inputText, "win1253"));
                    break;
                case "win1254":
                    setOutputText(EncodingUtils.toEncoded(inputText, "win1254"));
                    break;
                case "windows-1250":
                    setOutputText(EncodingUtils.toEncoded(inputText, "windows-1250"));
                    break;
                case "windows-1251":
                    setOutputText(EncodingUtils.toEncoded(inputText, "windows-1251"));
                    break;
                case "windows-1253":
                    setOutputText(EncodingUtils.toEncoded(inputText, "windows-1253"));
                    break;
                case "windows-1254":
                    setOutputText(EncodingUtils.toEncoded(inputText, "windows-1254"));
                    break;
                case "windows-1255":
                    setOutputText(EncodingUtils.toEncoded(inputText, "windows-1255"));
                    break;
                case "windows-1256":
                    setOutputText(EncodingUtils.toEncoded(inputText, "windows-1256"));
                    break;
                case "windows-1257":
                    setOutputText(EncodingUtils.toEncoded(inputText, "windows-1257"));
                    break;
                case "windows-1258":
                    setOutputText(EncodingUtils.toEncoded(inputText, "windows-1258"));
                    break;
                case "macroman":
                    setOutputText(EncodingUtils.toEncoded(inputText, "macroman"));
                    break;
                default:
                    alert("Invalid option selected.");
                    break;
            }
        }
    };
    const handleDecode = () => {
        if (selectedOption) {
            switch (selectedOption.value) {
                case "bin":
                    setOutputText(EncodingUtils.fromBinary(inputText));
                    break;
                case "hex":
                    setOutputText(EncodingUtils.fromHex(inputText));
                    break;
                case "base64":
                    setOutputText(EncodingUtils.fromBase64(inputText));
                    break;
                case "url":
                    setOutputText(EncodingUtils.fromURL(inputText));
                    break;
                case "unicode":
                    setOutputText(EncodingUtils.fromUnicode(inputText));
                    break;
                case "ascii":
                    setOutputText(EncodingUtils.fromASCII(inputText));
                    break;
                case "utf8":
                    setOutputText(EncodingUtils.fromUTF8(inputText));
                    break;
                case "utf16le":
                    setOutputText(EncodingUtils.fromUTF16LE(inputText));
                    break;
                case "utf16be":
                    setOutputText(EncodingUtils.fromUTF16BE(inputText));
                    break;
                case "utf32le":
                    setOutputText(EncodingUtils.fromUTF32LE(inputText));
                    break;
                case "utf32be":
                    setOutputText(EncodingUtils.fromUTF32BE(inputText));
                    break;
                case "iso88591":
                    setOutputText(EncodingUtils.fromISO88591(inputText));
                    break;
                case "sha256":
                    alert("디코딩 할 수 없습니다.");
                    break;
                case "sha384":
                    alert("디코딩 할 수 없습니다.");
                    break;
                case "sha512":
                    alert("디코딩 할 수 없습니다.");
                    break;
                case "euc-kr":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "euc-kr"));
                    break;
                case "euc-jp":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "euc-jp"));
                    break;
                case "koi8-r":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "koi8-r"));
                    break;
                case "koi8-u":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "koi8-u"));
                    break;
                case "cp932":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "cp932"));
                    break;
                case "cp936":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "cp936"));
                    break;
                case "cp949":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "cp949"));
                    break;
                case "ms949":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "ms949"));
                    break;
                case "cp950":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "cp950"));
                    break;
                case "shift_jis":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "shift_jis"));
                    break;
                case "sjis":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "sjis"));
                    break;
                case "iso2022jp":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "iso2022jp"));
                    break;
                case "gbk":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "gbk"));
                    break;
                case "gb2312":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "gb2312"));
                    break;
                case "gb18030":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "gb18030"));
                    break;
                case "big5":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "big5"));
                    break;
                case "win1251":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "win1251"));
                    break;
                case "win1250":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "win1250"));
                    break;
                case "win1253":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "win1253"));
                    break;
                case "win1254":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "win1254"));
                    break;
                case "windows-1250":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "windows-1250"));
                    break;
                case "windows-1251":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "windows-1251"));
                    break;
                case "windows-1253":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "windows-1253"));
                    break;
                case "windows-1254":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "windows-1254"));
                    break;
                case "windows-1255":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "windows-1255"));
                    break;
                case "windows-1256":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "windows-1256"));
                    break;
                case "windows-1257":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "windows-1257"));
                    break;
                case "windows-1258":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "windows-1258"));
                    break;
                case "macroman":
                    setOutputText(EncodingUtils.fromEncoded(inputText, "macroman"));
                    break;
                default:
                    alert("Invalid option selected.");
                    break;
            }
        }
    };
    // hello 🔥
    return (_jsx("div", { children: _jsxs("div", { className: "p-4", children: [_jsx("textarea", { id: "textInput", className: "w-full h-40 p-2 border rounded-md border-gray-300 bg-transparent outline-none text-zinc-800 dark:text-white text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-none", placeholder: "\uD14D\uC2A4\uD2B8\uB97C \uC785\uB825\uD558\uC138\uC694...", value: inputText, onChange: (e) => setInputText(e.target.value) }), _jsxs("div", { className: "flex flex-wrap gap-2 mt-4", children: [_jsx(CustomSelect, { options: options, isDarkMode: isDarkMode, onChange: (option) => {
                                option?.value ? setSelectedOption(option) : setSelectedOption(null);
                            } }), _jsx("button", { className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600", onClick: handleEncode, children: "\uC778\uCF54\uB529" }), _jsx("button", { className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600", onClick: handleDecode, children: "\uB514\uCF54\uB529" })] }), _jsx("div", { className: "mt-4", children: _jsx("textarea", { id: "textOutput", className: "w-full h-40 p-2 border rounded-md border-gray-300 bg-transparent outline-none text-zinc-800 dark:text-white text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-none", placeholder: "\uACB0\uACFC\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4...", value: outputText, readOnly: true }) })] }) }));
};
export default TextEncodeDecodePage;
