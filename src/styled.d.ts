// import original module declarations
import 'styled-components';
// import your custom theme
import theme from './theme';

// extend the module declarations using custom theme type

type Theme = typeof theme;

declare module 'styled-components' {
    // eslint-disable-next-line
    export interface DefaultTheme extends Theme {}
}
