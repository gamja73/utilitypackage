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
    { value: "utf32", label: "UTF-32" },
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
    const [selectedOption, setSelectedOption] = React.useState<{ value: string; label: string } | null>(null);

    return (
        <div>
            <div className="p-4">
                <textarea
                    id="textInput"
                    className="w-full h-40 p-2 border rounded-md border-gray-300 bg-transparent outline-none text-zinc-800 dark:text-white text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-none"
                    placeholder="텍스트를 입력하세요..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                ></textarea>
                <div className="flex flex-wrap gap-2 mt-4">
                    <Select
                        id="actionSelect"
                        className="w-full"
                        options={options}
                        placeholder="옵션을 선택하세요..."
                        isSearchable
                        onChange={(option) => setSelectedOption(option as { value: string; label: string } | null)}
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">인코딩</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">디코딩</button>
                </div>
                <div className="mt-4">
                    <textarea
                        id="textOutput"
                        className="w-full h-40 p-2 border rounded-md border-gray-300 bg-transparent outline-none text-zinc-800 dark:text-white text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-none"
                        placeholder="결과가 여기에 표시됩니다..."
                        value={outputText}
                        readOnly
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default TextEncodeDecodePage;
