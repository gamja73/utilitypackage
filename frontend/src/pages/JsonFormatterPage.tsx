import { useState, useEffect } from 'react';

const JsonFormatterPage = () => {
    const [input, setInput] = useState('');
    const [formatted, setFormatted] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        try {
            const parsed = JSON.parse(input);
            setFormatted(JSON.stringify(parsed, null, 2));
            setError('');
        } catch (err) {
            setFormatted('');
            setError('유효하지 않은 JSON입니다.');
        }
    }, [input]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-[calc(100vh-8rem)] max-w-screen-xl mx-auto items-center">
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">입력</span>
                </div>
                <textarea
                    value={input}
                    onInput={(e) => setInput((e.target as HTMLTextAreaElement).value)}
                    placeholder="여기에 JSON을 입력하세요..."
                    className="flex-1 w-full p-4 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm dark:text-white font-mono resize-none"
                ></textarea>
            </div>

            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">결과</span>
                </div>
                <textarea
                    readOnly
                    value={formatted}
                    placeholder="여기에 포맷된 JSON이 표시됩니다."
                    className="flex-1 w-full p-4 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm dark:text-white font-mono resize-none"
                ></textarea>
                {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
};

export default JsonFormatterPage;
