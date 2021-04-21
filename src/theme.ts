import { extendTheme } from '@chakra-ui/react';

// Oslo's color scheme
export enum Colors {
    DarkBlue = '#2A2859',
    Blue = '#6FE9FF',
    LightBlue = '#B3F5FF',
    LightBlue50 = '#D6FAFF',
    DarkGreen = '#034B45',
    Green = '#43F8B6',
    LightGreen = '#C7F6C9',
    Red = '#FF8274',
    Yellow = '#F9C66B',
    LightBeige = '#F8F0DD',
    DarkBegie = '#D0BFAE',
    Black = '#2C2C2C',
    White = '#FFFFFF',
}

const oldTheme = {
    colors: {
        DarkBlue: Colors.DarkBlue,
        Blue: Colors.Blue,
        LightBlue: Colors.LightBlue,
        LightBlue50: Colors.LightBlue50,
        DarkGreen: Colors.DarkGreen,
        Green: Colors.Green,
        LightGreen: Colors.LightGreen,
        Red: Colors.Red,
        Yellow: Colors.Yellow,
        LightBeige: Colors.LightBeige,
        DarkBegie: Colors.DarkBegie,
        Black: Colors.Black,
        White: Colors.White,
    },
} as const;

export type ThemeType = typeof oldTheme;

const theme = extendTheme({
    colors: {
        primary: {
            default: Colors.DarkBlue,
            dark: '#02002f',
            light: '#565086',
        },
        secondary: {
            default: Colors.Green,
            dark: '#00c486',
            light: '#84ffe8',
        },
        background: Colors.White,
        surface: Colors.White,
        error: Colors.Red,
        onPrimary: Colors.White,
        onSecondary: Colors.Black,
        onBackground: Colors.Black,
        onSurface: Colors.Black,
        onError: Colors.Black,

        ...oldTheme.colors,
    },
    space: {
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '4rem',
    },
});

export { oldTheme, theme };
