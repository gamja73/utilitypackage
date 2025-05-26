import { useState, useRef } from "react";
import { JsonTree } from '@/lib/JsonTree';

const JsonFormatterPage = () => {
    const [input, setInput] = useState("");
    const [json, setJson] = useState<any>(() => {{}});
    const [error, setError] = useState("");
    const prevValidJson = useRef<any>(json);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setInput(val);
        try {
            const parsed = JSON.parse(val);
            setJson(parsed);
            setError("");
            prevValidJson.current = parsed;
        } catch {
            setError("유효하지 않은 JSON입니다.");
        }
    };

    const handleTreeChange = (v: any) => {
        setJson(v);
        setInput(JSON.stringify(v, null, 2));
        setError("");
        prevValidJson.current = v;
    };

    const handleCopyLeft = () => navigator.clipboard.writeText(input);
    const handleCopyRight = () => navigator.clipboard.writeText(JSON.stringify(error ? prevValidJson.current : json, null, 2));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full max-w-screen-xl mx-auto items-center">
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">입력</span>
                    <button
                        onClick={handleCopyLeft}
                        className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                    >
                        복사
                    </button>
                </div>
                <textarea
                    value={input}
                    onChange={handleInput}
                    placeholder="여기에 JSON을 입력하세요..."
                    className="flex-1 w-full p-4 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm dark:text-white font-mono resize-none"
                />
                {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            </div>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">결과</span>
                    <button
                        onClick={handleCopyRight}
                        className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                    >
                        복사
                    </button>
                </div>
                <div className="flex-1 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 min-h-[200px] max-h-full overflow-auto p-4">
                    <JsonTree
                        value={error ? prevValidJson.current : json}
                        onChange={handleTreeChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default JsonFormatterPage;
