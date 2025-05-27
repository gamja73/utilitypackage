import { Button } from '@/components/Button';
import { useState } from 'react';
import { Copy } from 'lucide-react';

const Ipv4ToIpv6Page = () => {
    const [input, setInput] = useState<string>("");
    const [resultList, setResultList] = useState<{ label: string; value: string }[]>([]);
    const [error, setError] = useState<string>("");

    const isValidIPv4 = (ip: string): boolean => {
        const parts = ip.split('.');
        return parts.length === 4 && parts.every(part => /^[0-9]+$/.test(part) && +part >= 0 && +part <= 255);
    };

    const isValidIPv6Mapped = (ip: string): boolean => {
        return ip.includes('::ffff:') || /^0:0:0:0:0:ffff:.+:.+/.test(ip) || /^0000:0000:0000:0000:0000:ffff:.+:.+/.test(ip);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).catch(err => console.error('복사 실패:', err));
    };

    const convert = (): void => {
        try {
            setError("");

            if (isValidIPv4(input)) {
                const octets: number[] = input.split('.').map(Number);
                const hex1: string = ((octets[0] << 8) | octets[1]).toString(16).padStart(4, '0');
                const hex2: string = ((octets[2] << 8) | octets[3]).toString(16).padStart(4, '0');

                const full: string = `0000:0000:0000:0000:0000:ffff:${hex1}:${hex2}`;
                const semiCompressed: string = `0:0:0:0:0:ffff:${hex1}:${hex2}`;
                const compressed: string = `::ffff:${hex1.replace(/^0+/, '')}:${hex2.replace(/^0+/, '')}`;

                setResultList([
                    { label: '선행 제로 IPv6 생략', value: compressed },
                    { label: '연속적인 제로 IPv6 생략', value: semiCompressed },
                    { label: 'IPv6', value: full }
                ]);

            } else if (isValidIPv6Mapped(input)) {
                const clean: string = input.replace(/^.*ffff:/, '');
                const parts: string[] = clean.split(':');
                if (parts.length !== 2) throw new Error("Invalid IPv6-mapped format");

                const part1: number = parseInt(parts[0], 16);
                const part2: number = parseInt(parts[1], 16);
                const ipv4: string = `${(part1 >> 8) & 0xff}.${part1 & 0xff}.${(part2 >> 8) & 0xff}.${part2 & 0xff}`;

                setResultList([{ label: 'IPv4', value: ipv4 }]);
            } else {
                setResultList([]);
                setError("유효한 IPv4 또는 IPv6-mapped 주소를 입력해주세요.");
            }
        } catch (error) {
            console.error(error);
            setError("변환 중 오류가 발생했습니다.");
            setResultList([]);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full px-4">
            <div className="flex items-center justify-center gap-4 w-full max-w-4xl">
                <div className="flex-grow">
                    <label htmlFor="address" className="sr-only">IPv4 또는 IPv6 주소 입력</label>
                    <input
                        id="address"
                        type="text"
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") convert()
                        }}
                        className="w-full px-4 py-2 border rounded-md text-base dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                        placeholder="IPv4 또는 IPv6 주소 입력"
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

export default Ipv4ToIpv6Page;
