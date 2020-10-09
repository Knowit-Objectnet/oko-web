export const RGBAtoRGB = ({ r, g, b, a }: { r: number; g: number; b: number; a: number }) => {
    return {
        r: (1 - a) * 255 + a * r,
        g: (1 - a) * 255 + a * g,
        b: (1 - a) * 255 + a * b,
    };
};
