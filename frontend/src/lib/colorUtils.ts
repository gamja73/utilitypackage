export interface RGB {
    r: number;
    g: number;
    b: number;
    a?: number;
}

export interface HSL {
    h: number;
    s: number;
    l: number;
    a?: number;
}

export interface HSV {
    h: number;
    s: number;
    v: number;
    a?: number;
}

export interface CMYK {
    c: number;
    m: number;
    y: number;
    k: number;
}

export interface ColorFormats {
    hex: string;
    rgb: RGB;
    hsl: HSL;
    hsv: HSV;
    cmyk: CMYK;
}

// RGB to HEX
export const rgbToHex = ({ r, g, b }: RGB): string => {
    if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number") {
        throw new Error("rgbToHex: r, g, b must be numbers");
    }
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
};

// HEX to RGB
export const hexToRgb = (hex: string): RGB => {
    const cleanHex = hex.replace("#", "");
    const bigint = parseInt(cleanHex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
};

// RGB to HSL
export const rgbToHsl = ({ r, g, b, a }: RGB): HSL => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s: number, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
            case g: h = ((b - r) / d + 2); break;
            case b: h = ((r - g) / d + 4); break;
        }
        h *= 60;
    }

    return { h, s, l, a };
};

// HSL to RGB
export const hslToRgb = ({ h, s, l, a }: HSL): RGB => {
    let r: number, g: number, b: number;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number): number => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h / 360 + 1 / 3);
        g = hue2rgb(p, q, h / 360);
        b = hue2rgb(p, q, h / 360 - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
        a,
    };
};

// RGB to HSV
export const rgbToHsv = ({ r, g, b, a }: RGB): HSV => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const v = max;
    const d = max - min;
    const s = max === 0 ? 0 : d / max;

    let h = 0;
    if (max !== min) {
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
            case g: h = ((b - r) / d + 2); break;
            case b: h = ((r - g) / d + 4); break;
        }
        h *= 60;
    }

    return { h, s, v, a };
};

// HSV to RGB
export const hsvToRgb = ({ h, s, v, a }: HSV): RGB => {
    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;
    let r = 0, g = 0, b = 0;

    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
        a,
    };
};

// RGB to CMYK
export const rgbToCmyk = ({ r, g, b }: RGB): CMYK => {
    const r1 = r / 255;
    const g1 = g / 255;
    const b1 = b / 255;

    const k = 1 - Math.max(r1, g1, b1);
    const c = (1 - r1 - k) / (1 - k) || 0;
    const m = (1 - g1 - k) / (1 - k) || 0;
    const y = (1 - b1 - k) / (1 - k) || 0;

    return { c, m, y, k };
};

// get full color set from RGB
export const getColorData = (rgb: RGB): ColorFormats => {
    if (
        typeof rgb?.r !== "number" ||
        typeof rgb?.g !== "number" ||
        typeof rgb?.b !== "number"
    ) {
        throw new Error("getColorData: invalid RGB input");
    }

    return {
        rgb,
        hex: rgbToHex(rgb),
        hsl: rgbToHsl(rgb),
        hsv: rgbToHsv(rgb),
        cmyk: rgbToCmyk(rgb),
    };
};

// update from any type
export const updateColorFromType = (type: keyof ColorFormats, value: any): ColorFormats | null => {
    try {
        if (type === "rgb") return getColorData(value);
        if (type === "hex") return getColorData(hexToRgb(value));
        if (type === "hsl") return getColorData(hslToRgb(value));
        if (type === "hsv") return getColorData(hsvToRgb(value));
    } catch (e) {
        console.warn("색상 변환 실패:", e);
        return null;
    }
    return null;
};