import {useState, useRef, useEffect} from 'react';

const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
};

const rgbToHex = ({r, g, b}: { r: number; g: number; b: number }) => {
    return (
        '#' +
        [r, g, b]
            .map((val) => val.toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase()
    );
};

const rgbToCmyk = ({r, g, b}: { r: number; g: number; b: number }) => {
    const rf = r / 255;
    const gf = g / 255;
    const bf = b / 255;

    const k = 1 - Math.max(rf, gf, bf);
    const c = k === 1 ? 0 : (1 - rf - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - gf - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - bf - k) / (1 - k);

    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100),
    };
};

const cmykToRgb = ({c, m, y, k}: { c: number; m: number; y: number; k: number }) => {
    const rf = 255 * (1 - c / 100) * (1 - k / 100);
    const gf = 255 * (1 - m / 100) * (1 - k / 100);
    const bf = 255 * (1 - y / 100) * (1 - k / 100);
    return {r: Math.round(rf), g: Math.round(gf), b: Math.round(bf)};
};

const hsbToRgb = ({h, s, b}: { h: number; s: number; b: number }) => {
    s /= 100;
    b /= 100;
    const k = (n: number) => (n + h / 60) % 6;
    const f = (n: number) => b - b * s * Math.max(0, Math.min(k(n), 4 - k(n), 1));
    return {
        r: Math.round(f(5) * 255),
        g: Math.round(f(3) * 255),
        b: Math.round(f(1) * 255),
    };
};

const rgbToHsb = ({r, g, b}: { r: number; g: number; b: number }) => {
    const rf = r / 255,
        gf = g / 255,
        bf = b / 255;
    const max = Math.max(rf, gf, bf),
        min = Math.min(rf, gf, bf);
    let h = 0,
        s = 0,
        v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case rf:
                h = (gf - bf) / d + (gf < bf ? 6 : 0);
                break;
            case gf:
                h = (bf - rf) / d + 2;
                break;
            case bf:
                h = (rf - gf) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        b: Math.round(v * 100),
    };
};

const ColorConverterPage = () => {
    const [hex, setHex] = useState('#0099ff');
    const [rgb, setRgb] = useState({r: 0, g: 153, b: 255});
    const [cmyk, setCmyk] = useState(rgbToCmyk(rgb));
    const [hsb, setHsb] = useState(rgbToHsb(rgb));
    const [alpha, setAlpha] = useState(1);
    const hueRef = useRef<HTMLInputElement>(null);

    const updateAllFromRGB = (updatedRgb: typeof rgb) => {
        setRgb(updatedRgb);
        setHex(rgbToHex(updatedRgb));
        setCmyk(rgbToCmyk(updatedRgb));
        setHsb(rgbToHsb(updatedRgb));
    };

    const handleHexChange = (value: string) => {
        setHex(value);
        const rgbParsed = hexToRgb(value);
        if (rgbParsed) updateAllFromRGB(rgbParsed);
    };

    const handleRgbChange = (key: keyof typeof rgb, value: string) => {
        const num = Math.min(255, Math.max(0, Number(value)));
        const updated = {...rgb, [key]: num};
        updateAllFromRGB(updated);
    };

    const handleCmykChange = (key: keyof typeof cmyk, value: string) => {
        const num = Math.min(100, Math.max(0, Number(value)));
        const updated = {...cmyk, [key]: num};
        setCmyk(updated);
        const converted = cmykToRgb(updated);
        updateAllFromRGB(converted);
    };

    const handleHsbChange = (key: keyof typeof hsb, value: string) => {
        let limit = key === 'h' ? 360 : 100;
        const num = Math.min(limit, Math.max(0, Number(value)));
        const updated = {...hsb, [key]: num};
        setHsb(updated);
        const converted = hsbToRgb(updated);
        updateAllFromRGB(converted);
    };

    const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const h = Math.min(359, Math.max(0, Number(e.target.value)));
        const updated = {h, s: hsb.s, b: hsb.b};
        setHsb(updated);
        const converted = hsbToRgb(updated);
        updateAllFromRGB(converted);
    };

    const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const a = Math.min(1, Math.max(0, Number(e.target.value)));
        setAlpha(a);
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-xl">
                <div
                    className="h-48 rounded-md cursor-crosshair border border-zinc-300 dark:border-zinc-600"
                    style={{background: `linear-gradient(to right, white, hsl(${hsb.h}, 100%, 50%))`}}
                    onClick={(e) => {
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const s = Math.round((x / rect.width) * 100);
                        const updated = {h: hsb.h, s, b: hsb.b};
                        setHsb(updated);
                        const converted = hsbToRgb(updated);
                        updateAllFromRGB(converted);
                    }}
                ></div>

                <div className="w-full mt-6">
                    <input
                        ref={hueRef}
                        type="range"
                        min={0}
                        max={359}
                        value={hsb.h}
                        onChange={handleHueChange}
                        className="w-full appearance-none h-4 rounded-full cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)`,
                            WebkitAppearance: 'none'
                        }}
                    />
                </div>
            </div>

            <div className="w-full max-w-xl">
                <label className="block text-sm mb-1">Alpha</label>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={alpha}
                    onChange={handleAlphaChange}
                    className="w-full h-2 appearance-none rounded-lg bg-gradient-to-r from-transparent to-black"
                />
            </div>

            <div
                className="w-full max-w-xl h-6 rounded-md"
                style={{backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`}}
            ></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
                <div className="flex flex-col">
                    <label className="mb-1 text-sm">HEX</label>
                    <input
                        type="text"
                        value={alpha < 1 ? `${hex}${Math.round(alpha * 255).toString(16).padStart(2, '0')}` : hex}
                        onChange={(e) => handleHexChange(e.target.value.slice(0, 7))}
                        className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                        placeholder="#RRGGBB"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-sm">RGB + A</label>
                    <input
                        type="text"
                        value={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha < 1 ? alpha.toFixed(2) : 1})`}
                        readOnly
                        className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-sm">CMYK</label>
                    <div className="flex gap-2">
                        {(['c', 'm', 'y', 'k'] as const).map((key) => (
                            <input
                                key={key}
                                type="number"
                                value={cmyk[key]}
                                onChange={(e) => handleCmykChange(key, e.target.value)}
                                className="w-full px-2 py-2 rounded-md border dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 dark:text-white"
                                placeholder={key.toUpperCase()}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-sm">HSB</label>
                    <div className="flex gap-2">
                        {(['h', 's', 'b'] as const).map((key) => (
                            <input
                                key={key}
                                type="number"
                                value={hsb[key]}
                                onChange={(e) => handleHsbChange(key, e.target.value)}
                                className="w-full px-2 py-2 rounded-md border dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 dark:text-white"
                                placeholder={key.toUpperCase()}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorConverterPage;