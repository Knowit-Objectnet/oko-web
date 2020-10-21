// Oslo's color scheme
export enum Colors {
    DarkBlue = '#2A2859',
    Blue = '#6FE9FF',
    LightBlue = '#B3F5FF',
    DarkGreen = '#034B45',
    Green = '#43F8B6',
    LightGreen = '#C7F6C9',
    Red = '#FF8274',
    Yellow = '#F9C66B',
    LightBeige = '#F8F0DD',
    DarkBegie = '#D0BFAE',
    Black = '#2C2C2C',
    White = '#FFFFFF',
    Disabled = '#AAAAAA',
}

const theme = {
    colors: {
        DarkBlue: Colors.DarkBlue,
        Blue: Colors.Blue,
        LightBlue: Colors.LightBlue,
        DarkGreen: Colors.DarkGreen,
        Green: Colors.Green,
        LightGreen: Colors.LightGreen,
        Red: Colors.Red,
        Yellow: Colors.Yellow,
        LightBeige: Colors.LightBeige,
        DarkBegie: Colors.DarkBegie,
        Black: Colors.Black,
        White: Colors.White,
        Disabled: Colors.Disabled,
    },
} as const;

export type ThemeType = typeof theme;

export default theme;
