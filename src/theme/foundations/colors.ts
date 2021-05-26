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
    DarkBeige = '#D0BFAE',
    Black = '#2C2C2C',
    White = '#FFFFFF',
}

// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/foundations/colors.ts
export const colors = {
    primary: Colors.DarkBlue,
    secondary: Colors.Blue,
    background: Colors.White,
    surface: Colors.LightBeige,
    error: Colors.Red,
    onPrimary: Colors.White,
    onSecondary: Colors.Black,
    onBackground: Colors.Black,
    onSurface: Colors.Black,
    onError: Colors.Black,

    ...Colors, // TODO: we might want to name these colors differently
};
