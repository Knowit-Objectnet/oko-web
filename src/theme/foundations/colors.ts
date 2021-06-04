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
    Red40 = '#ffb4ac',
    Yellow = '#F9C66B',
    LightBeige = '#F8F0DD',
    DarkBeige = '#D0BFAE',
    Black = '#2C2C2C',
    White = '#FFFFFF',
    Disabled = '#7B7B7B',
}

// Default values: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/foundations/colors.ts
export const colors = {
    primary: Colors.DarkBlue,
    onPrimary: Colors.White,
    primaryHover: '#1F42AA',
    secondary: Colors.Blue,
    onSecondary: Colors.Black,
    background: Colors.White,
    onBackground: Colors.Black,
    surface: Colors.LightBeige,
    onSurface: Colors.Black,
    error: Colors.Red, // NB! Not sufficient contrast to be used as text color (a11y)
    errorBackground: Colors.Red40,
    onError: Colors.Black,
    disabled: Colors.Disabled,
    warning: Colors.Red,
    onWarning: Colors.Black,

    ...Colors, // TODO: we might want to name these colors differently
};
