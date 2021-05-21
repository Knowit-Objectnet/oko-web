import { Colors } from './foundations/colors';

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
        DarkBeige: Colors.DarkBeige,
        Black: Colors.Black,
        White: Colors.White,
    },
} as const;

export type ThemeType = typeof oldTheme;

export { oldTheme };
