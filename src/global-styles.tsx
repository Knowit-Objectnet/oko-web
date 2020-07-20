import { createGlobalStyle } from 'styled-components';

import OsloSansOffice_Regular from './assets/font/OsloSansOffice_Regular.ttf';
import OsloSansOffice_RegularItalic from './assets/font/OsloSansOffice_RegularItalic.ttf';
import OsloSansOffice_Bold from './assets/font/OsloSansOffice_Bold.ttf';
import OsloSansOffice_BoldItalic from './assets/font/OsloSansOffice_BoldItalic.ttf';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: Oslo Sans Office Regular;
        font-style: normal;
        font-weight: normal;
        src: url(${OsloSansOffice_Regular});
    }
    
    @font-face {
        font-family: Oslo Sans Office Regular Italic;
        font-style: italic;
        font-weight: normal;
        src: url(${OsloSansOffice_RegularItalic});
    }
    
    @font-face {
        font-family: Oslo Sans Office Bold;
        font-style: normal;
        font-weight: bold;
        src: url(${OsloSansOffice_Bold});
    }
    
    @font-face {
        font-family: Oslo Sans Office Bold Italic;
        font-style: italic;
        font-weight: bold;
        src: url(${OsloSansOffice_BoldItalic});
    }
  
    body {
        min-height: 100vh;
        height: 100vh;
        margin: 0;
        display: flex;
        flex-direction: column;
        font-family: 'Oslo Sans Office Regular', 'Roboto', sans-serif;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    p {
        margin: 0.3em 0;
    }
    
    #root {
        height: inherit;
        min-height: inherit;
        overflow: hidden;
    }
`;

export { GlobalStyle };
