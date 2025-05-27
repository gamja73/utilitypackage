import { Button } from '@/components/Button';
import { useState } from 'react';
import { Copy } from 'lucide-react';

const MulticastConverterPage = () => {
    const [input, setInput] = useState<string>("");
    const [resultList, setResultList] = useState<{ label: string; value: string }[]>([]);
    const [error, setError] = useState<string>("");

    const isValidMulticastIP = (ip: string): boolean => {
        const parts = ip.split('.').map(Number);
        return parts.length === 4 &&
            parts.every(p => p >= 0 && p <= 255) &&
            parts[0] >= 224 && parts[0] <= 239;
    };

    const isValidMulticastMAC = (mac: string): boolean => {
        const cleaned = mac.toLowerCase().replace(/-/g, ':');
        return /^01:00:5e:[0-7][0-9a-f]:[0-9a-f]{2}:[0-9a-f]{2}$/.test(cleaned);
    };

    const convert = (): void => {
        try {
            setError("");
            const cleanedInput = input.trim().toLowerCase().replace(/-/g, ':');

            if (isValidMulticastIP(cleanedInput)) {
                const [a, b, c, d] = cleanedInput.split('.').map(Number);
                const mac = `01:00:5e:${(b & 0x7f).toString(16).padStart(2, '0')}:${c.toString(16).padStart(2, '0')}:${d.toString(16).padStart(2, '0')}`;
                setResultList([{ label: 'Multicast MAC', value: mac }]);
            } else if (isValidMulticastMAC(cleanedInput)) {
                const parts = cleanedInput.split(':');
                const b = parseInt(parts[3], 16) | 0x80;
                const c = parseInt(parts[4], 16);
                const d = parseInt(parts[5], 16);
                const ip = `224.${b}.${c}.${d}`;
                setResultList([{ label: 'Multicast IP', value: ip }]);
            } else {
                setResultList([]);
                setError("유효한 Multicast IP 또는 MAC 주소를 입력해주세요.");
            }
        } catch (e) {
            console.error(e);
            setError("변환 중 오류가 발생했습니다.");
            setResultList([]);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).catch(err => console.error('복사 실패:', err));
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full px-4">
            <div className="flex items-center justify-center gap-4 w-full max-w-4xl">
                <div className="flex-grow">
                    <label htmlFor="input" className="sr-only">입력</label>
                    <input
                        id="input"
                        type="text"
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") convert()
                        }}
                        className="w-full px-4 py-2 border rounded-md text-base dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                        placeholder="Multicast IP 또는 MAC 주소 입력"
                    />
                </div>
                <Button onClick={convert}>변환</Button>
            </div>

            <div className="w-full max-w-2xl mt-6 flex flex-col gap-2">
                {error && <div className="text-red-500">{error}</div>}
                {resultList.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md">
                        <div className="font-mono text-sm">{item.label}: {item.value}</div>
                        <button
                            onClick={() => copyToClipboard(item.value)}
                            className="ml-4 p-1 text-sm text-gray-700 dark:text-white hover:text-blue-600"
                            aria-label="복사"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MulticastConverterPage;