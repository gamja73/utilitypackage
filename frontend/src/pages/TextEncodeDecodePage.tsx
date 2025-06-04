import React from "react";
import apiRequest from '@/lib/ApiRequest';
import CustomSelect from "@/components/CustomSelect";

const options = [
    {label: "BIN", value: "BIN"},
    {label: "HEX", value: "HEX"},
    {label: "UNICODE", value: "UNICODE"},
    {label: "URL", value: "URL"},
    {label: "UTF-8", value: "UTF-8"},
    {label: "UTF-16", value: "UTF-16"},
    {label: "UTF-16BE", value: "UTF-16BE"},
    {label: "UTF-16LE", value: "UTF-16LE"},
    {label: "UTF-32", value: "UTF-32"},
    {label: "UTF-32BE", value: "UTF-32BE"},
    {label: "UTF-32LE", value: "UTF-32LE"},
    {label: "US-ASCII", value: "US-ASCII"},
    {label: "ISO-8859-1", value: "ISO-8859-1"},
    {label: "ISO-8859-2", value: "ISO-8859-2"},
    {label: "ISO-8859-5", value: "ISO-8859-5"},
    {label: "ISO-8859-6", value: "ISO-8859-6"},
    {label: "ISO-8859-7", value: "ISO-8859-7"},
    {label: "ISO-8859-8", value: "ISO-8859-8"},
    {label: "ISO-8859-9", value: "ISO-8859-9"},
    {label: "WINDOWS-1251", value: "WINDOWS-1251"},
    {label: "WINDOWS-1252", value: "WINDOWS-1252"},
    {label: "WINDOWS-1256", value: "WINDOWS-1256"},
    {label: "KOI8-R", value: "KOI8-R"},
    {label: "KOI8-U", value: "KOI8-U"},
    {label: "EUC-KR", value: "EUC-KR"},
    {label: "EUC-JP", value: "EUC-JP"},
    {label: "EUC-CN", value: "EUC-CN"},
    {label: "GB2312", value: "GB2312"},
    {label: "GBK", value: "GBK"},
    {label: "BIG5", value: "BIG5"},
    {label: "SHIFT_JIS", value: "SHIFT_JIS"},
    {label: "X-MACROMAN", value: "X-MACROMAN"},
    {label: "X-MACCYRILLIC", value: "X-MACCYRILLIC"},
    {label: "TIS-620", value: "TIS-620"},
    {label: "IBM866", value: "IBM866"},
    {label: "BASE64", value: "BASE64"},
    {label: "BASE32", value: "BASE32"},
    {label: "MD2", value: "MD2"},
    {label: "MD5", value: "MD5"},
    {label: "SHA-1", value: "SHA-1"},
    {label: "SHA-256", value: "SHA-256"},
    {label: "SHA-384", value: "SHA-384"},
    {label: "SHA-512", value: "SHA-512"},
    {label: "SHA3-224", value: "SHA3-224"},
    {label: "SHA3-256", value: "SHA3-256"},
    {label: "SHA3-384", value: "SHA3-384"},
    {label: "SHA3-512", value: "SHA3-512"},
];

const TextEncodeDecodePage = () => {
    const [inputText, setInputText] = React.useState("");
    const [outputText, setOutputText] = React.useState("");
    const [selectedOption, setSelectedOption] = React.useState<{ value: string; label: string } | null>(null);

    const handleEncode = async () => {
        if (selectedOption) {
            await apiRequest<string>({
                method: 'POST',
                url: '/api/v1/string/encode',
                params: {
                    input: inputText,
                    type: selectedOption?.value,
                },
                onSuccess: (response) => {
                    setOutputText(response);
                },
                onError: (error) => {
                    console.error("Encoding error:", error);
                },
            });
        }
        else
        {
            setOutputText("인코딩 옵션을 선택하세요.");
        }
    }

    const handleDecode = async () => {
        if (selectedOption) {
            await apiRequest<string>({
                method: 'POST',
                url: '/api/v1/string/decode',
                params: {
                    input: inputText,
                    type: selectedOption?.value,
                },
                onSuccess: (response) => {
                    setOutputText(response);
                },
                onError: (error) => {
                    console.error("Decoding error:", error);
                },
            });
        }
        else
        {
            setOutputText("디코딩 옵션을 선택하세요.");
        }
    }

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
                    <CustomSelect options={options} onChange={(option) => {
                        option?.value ? setSelectedOption(option) : setSelectedOption(null);
                    }}/>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            onClick={handleEncode}>인코딩
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            onClick={handleDecode}>디코딩
                    </button>
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
