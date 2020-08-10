// import original module declarations
import 'styled-components';
// import your custom theme
import { ThemeType } from './theme';

declare module 'styled-components' {
    // eslint-disable-next-line
    export interface DefaultTheme extends ThemeType {}
}
