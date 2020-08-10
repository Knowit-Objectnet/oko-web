// Oslo's color scheme
enum colorScheme {
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
}

const theme = {
    colors: {
        DarkBlue: colorScheme.DarkBlue,
        Blue: colorScheme.Blue,
        LightBlue: colorScheme.LightBlue,
        DarkGreen: colorScheme.DarkGreen,
        Green: colorScheme.Green,
        LightGreen: colorScheme.LightGreen,
        Red: colorScheme.Red,
        Yellow: colorScheme.Yellow,
        LightBeige: colorScheme.LightBeige,
        DarkBegie: colorScheme.DarkBegie,
        Black: colorScheme.Black,
        White: colorScheme.White,
    },
} as const;

export type ThemeType = typeof theme;

export default theme;
