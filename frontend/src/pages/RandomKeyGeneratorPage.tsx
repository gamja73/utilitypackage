import { useState } from 'react';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';

const generateRandomKey = (length: number, useUpper: boolean, useLower: boolean, useNumbers: boolean, useSymbols: boolean): string => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{};:,.<>?';

    let chars = '';
    if (useUpper) chars += upper;
    if (useLower) chars += lower;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;

    if (!chars) return '';

    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

const RandomKeyGeneratorPage = () => {
    const [useUpper, setUseUpper] = useState(true);
    const [useLower, setUseLower] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(false);
    const [count, setCount] = useState(5);
    const [length, setLength] = useState(16);
    const [keys, setKeys] = useState<string[]>([]);

    const handleGenerate = () => {
        if (!useUpper && !useLower && !useNumbers && !useSymbols) {
            alert('최소 하나의 옵션을 선택해야 합니다.');
            return;
        }
        if (length < 1 || length > 256) {
            alert('글자 수는 1에서 256 사이여야 합니다.');
            return;
        }
        if (count < 1 || count > 50) {
            alert('생성 갯수는 1에서 50 사이여야 합니다.');
            return;
        }

        const results = Array.from({ length: count }, () =>
            generateRandomKey(length, useUpper, useLower, useNumbers, useSymbols)
        );
        setKeys(results);
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4">
                <label className="flex items-center gap-2">
                    <Checkbox checked={useUpper} onCheckedChange={() => setUseUpper(!useUpper)}/> 대문자
                </label>
                <label className="flex items-center gap-2">
                    <Checkbox checked={useLower} onCheckedChange={() => setUseLower(!useLower)}/> 소문자
                </label>
                <label className="flex items-center gap-2">
                    <Checkbox checked={useNumbers} onCheckedChange={() => setUseNumbers(!useNumbers)}/> 숫자
                </label>
                <label className="flex items-center gap-2">
                    <Checkbox checked={useSymbols} onCheckedChange={() => setUseSymbols(!useSymbols)}/> 특수문자
                </label>

                <div className="flex flex-col items-start">
                    <label htmlFor="count" className="text-sm mb-1">생성 갯수</label>
                    <input
                        id="count"
                        type="number"
                        min={1}
                        max={50}
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-24 px-2 py-1 border rounded-md dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                        placeholder="갯수"
                    />
                </div>

                <div className="flex flex-col items-start">
                    <label htmlFor="length" className="text-sm mb-1">글자 수</label>
                    <input
                        id="length"
                        type="number"
                        min={1}
                        max={256}
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="w-24 px-2 py-1 border rounded-md dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                        placeholder="글자 수"
                    />
                </div>

                <div className="mt-6 sm:mt-0">
                    <Button onClick={handleGenerate}>생성</Button>
                </div>
            </div>

            <div className="w-full max-w-2xl mt-6 flex flex-col gap-2">
                {keys.map((key, i) => (
                    <div
                        key={i}
                        style={ {overflowWrap: 'anywhere'} }
                        className="px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-600 font-mono text-sm"
                    >
                        {key}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RandomKeyGeneratorPage;
