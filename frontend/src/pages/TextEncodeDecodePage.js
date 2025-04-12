import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import Select from "react-select";
const options = [
    { value: "bin", label: "Bin" },
    { value: "hex", label: "Hex" },
    { value: "url", label: "URL" },
    { value: "base32", label: "Base32" },
    { value: "base64", label: "Base64" },
    { value: "unicode", label: "Unicode" },
    { value: "sha256", label: "SHA-256" },
    { value: "sha384", label: "SHA-384" },
    { value: "sha512", label: "SHA-512" },
    { value: "utf8", label: "UTF-8" },
    { value: "utf16", label: "UTF-16" },
    { value: "utf16be", label: "UTF-16(BE)" },
    { value: "utf16le", label: "UTF-16(LE)" },
    { value: "utf32", label: "UTF-32" },
    { value: "utf32be", label: "UTF-32(BE)" },
    { value: "utf32le", label: "UTF-32(LE)" },
    { value: "ascii", label: "ASCII" },
    { value: "iso88591", label: "ISO-8859-1" },
    { value: "euckr", label: "EUC-KR" },
    { value: "euccn", label: "EUC-CN" },
    { value: "eucjp", label: "EUC-JP" },
    { value: "euctw", label: "EUC-TW" },
    { value: "koi8", label: "KOI8" },
    { value: "koi8r", label: "KOI8-R" },
    { value: "koi8u", label: "KOI8-U" },
];
const TextEncodeDecodePage = () => {
    const [inputText, setInputText] = React.useState("");
    const [outputText, setOutputText] = React.useState("");
    const [selectedOption, setSelectedOption] = React.useState(null);
    return (_jsx("div", { children: _jsxs("div", { className: "p-4", children: [_jsx("textarea", { id: "textInput", className: "w-full h-40 p-2 border rounded-md border-gray-300 bg-transparent outline-none text-zinc-800 dark:text-white text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-none", placeholder: "\uD14D\uC2A4\uD2B8\uB97C \uC785\uB825\uD558\uC138\uC694...", value: inputText, onChange: (e) => setInputText(e.target.value) }), _jsxs("div", { className: "flex flex-wrap gap-2 mt-4", children: [_jsx(Select, { id: "actionSelect", className: "w-full", options: options, placeholder: "\uC635\uC158\uC744 \uC120\uD0DD\uD558\uC138\uC694...", isSearchable: true, onChange: (option) => setSelectedOption(option) }), _jsx("button", { className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600", children: "\uC778\uCF54\uB529" }), _jsx("button", { className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600", children: "\uB514\uCF54\uB529" })] }), _jsx("div", { className: "mt-4", children: _jsx("textarea", { id: "textOutput", className: "w-full h-40 p-2 border rounded-md border-gray-300 bg-transparent outline-none text-zinc-800 dark:text-white text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-none", placeholder: "\uACB0\uACFC\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4...", value: outputText, readOnly: true }) })] }) }));
};
export default TextEncodeDecodePage;
