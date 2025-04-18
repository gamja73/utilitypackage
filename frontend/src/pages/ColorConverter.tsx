import React, { useState, useRef, useEffect } from "react";
import {
    getColorData,
    updateColorFromType,
    ColorFormats,
} from "@/lib/colorUtils";

const ColorConverter: React.FC = () => {
    const paletteRef = useRef<HTMLCanvasElement>(null);
    const hueTrackRef = useRef<HTMLDivElement>(null);
    const alphaTrackRef = useRef<HTMLDivElement>(null);

    const [color, setColor] = useState<ColorFormats>(() =>
        getColorData({ r: 255, g: 0, b: 0, a: 1 })
    );
    const [hue, setHue] = useState<number>(0);
    const [alpha, setAlpha] = useState<number>(1);
    const [palettePos, setPalettePos] = useState<{ x: number; y: number }>({ x: 200, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [activeSlider, setActiveSlider] = useState<"hue" | "alpha" | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [inputs, setInputs] = useState<{ [key: string]: string }>({});

    const drawPalette = () => {
        const ctx = paletteRef.current?.getContext("2d");
        if (!ctx) return;
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const base = `hsl(${hue}, 100%, 50%)`;

        ctx.fillStyle = base;
        ctx.fillRect(0, 0, width, height);

        const whiteGrad = ctx.createLinearGradient(0, 0, width, 0);
        whiteGrad.addColorStop(0, "white");
        whiteGrad.addColorStop(1, "transparent");
        ctx.fillStyle = whiteGrad;
        ctx.fillRect(0, 0, width, height);

        const blackGrad = ctx.createLinearGradient(0, 0, 0, height);
        blackGrad.addColorStop(0, "transparent");
        blackGrad.addColorStop(1, "black");
        ctx.fillStyle = blackGrad;
        ctx.fillRect(0, 0, width, height);

        const pixel = ctx.getImageData(palettePos.x, palettePos.y, 1, 1).data;
        const newColor = getColorData({ r: pixel[0], g: pixel[1], b: pixel[2], a: alpha });
        setColor(newColor);
    };

    useEffect(() => { drawPalette(); }, [hue]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (activeSlider) {
                const track = activeSlider === "hue" ? hueTrackRef.current : alphaTrackRef.current;
                if (!track) return;
                const rect = track.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = Math.max(0, Math.min(1, x / rect.width));
                if (activeSlider === "hue") setHue(Math.round(percent * 360));
                if (activeSlider === "alpha") {
                    const newAlpha = parseFloat(percent.toFixed(2));
                    setAlpha(newAlpha);
                    setColor(getColorData({ ...color.rgb, a: newAlpha }));
                }
            }
        };
        const handleMouseUp = () => setActiveSlider(null);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [activeSlider, color.rgb]);

    const updateColorFromPalette = (clientX: number, clientY: number) => {
        if (!paletteRef.current) return;
        const rect = paletteRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
        setPalettePos({ x, y });
        const ctx = paletteRef.current.getContext("2d");
        if (ctx) {
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const newColor = getColorData({ r: pixel[0], g: pixel[1], b: pixel[2], a: alpha });
            setColor(newColor);
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDragging(true);
        updateColorFromPalette(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDragging) updateColorFromPalette(e.clientX, e.clientY);
    };

    const handleMouseUp = () => setIsDragging(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied("복사되었습니다");
            setTimeout(() => setCopied(null), 1500);
        });
    };

    const withAlpha = (base: string, a: number) => {
        return a < 1 ? base.replace(/\)$/, `, ${a})`) : base;
    };

    const safePercent = (num?: number) => isFinite(num as number) ? Math.round((num as number) * 100) : 0;

    const format = {
        rgb: withAlpha(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`, alpha),
        hsl: withAlpha(`hsl(${Math.round(color.hsl.h)},${safePercent(color.hsl.s)}%,${safePercent(color.hsl.l)}%)`, alpha),
        hsb: withAlpha(`hsb(${Math.round(color.hsv.h)},${safePercent(color.hsv.s)}%,${safePercent(color.hsv.v)}%)`, alpha),
        hex: alpha < 1 ? `${color.hex}${Math.round(alpha * 255).toString(16).padStart(2, '0')}` : color.hex,
    };

    useEffect(() => {
        setInputs(format);
    }, [format.rgb, format.hsl, format.hsb, format.hex]);

    const handleFormatInputChange = (type: keyof typeof format, value: string) => {
        setInputs((prev) => ({ ...prev, [type]: value }));
        try {
            const updated = updateColorFromType(type === "hsb" ? "hsv" : type, value);
            if (updated && updated.rgb) setColor(updated);
        } catch (err) {
            console.warn("색상 업데이트 실패:", err);
        }
    };

    return (
        <div className="flex flex-col gap-6 items-center w-full px-4 select-none text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 transition-colors">
            {copied && <div className="fixed top-6 bg-black/80 text-white px-4 py-2 rounded shadow-lg z-50">{copied}</div>}

            <div className="relative">
                <canvas
                    ref={paletteRef}
                    width={250}
                    height={180}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="rounded-md cursor-crosshair border border-zinc-300 dark:border-zinc-700"
                />
                <div className="w-4 h-4 border-2 border-white rounded-full absolute pointer-events-none" style={{ left: palettePos.x - 8, top: palettePos.y - 8, boxShadow: "0 0 0 2px black" }} />
            </div>

            <div ref={hueTrackRef} className="w-[250px] h-5 rounded-full relative cursor-pointer border border-zinc-300 dark:border-zinc-700" style={{ background: "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)" }} onMouseDown={() => setActiveSlider("hue") }>
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-white rounded-full bg-transparent" style={{ left: `calc(${(hue / 360) * 100}% - 8px)` }} />
            </div>

            <div ref={alphaTrackRef} className="w-[250px] h-5 rounded-full relative cursor-pointer border border-zinc-300 dark:border-zinc-700" style={{ background: `linear-gradient(to right, rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},0), rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},1))` }} onMouseDown={() => setActiveSlider("alpha") }>
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-white rounded-full bg-transparent" style={{ left: `calc(${alpha * 100}% - 8px)` }} />
            </div>

            <div className="w-[150px] h-[50px] rounded shadow-inner border border-zinc-300 dark:border-zinc-700" style={{ backgroundColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${alpha})` }} />

            <div className="grid grid-cols-1 gap-4 w-full max-w-md mt-6">
                {Object.entries(inputs).map(([label, value]) => (
                    <div key={label}>
                        <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1 uppercase">{label}</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleFormatInputChange(label as keyof typeof format, e.target.value)}
                                className="w-full p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white"
                                readOnly={label === "hsb" || label === "hsl"}
                            />
                            <button
                                onClick={() => copyToClipboard(value)}
                                className="px-2 py-1 rounded text-sm bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
                            >📋</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorConverter;
