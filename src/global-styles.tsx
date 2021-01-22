import { createGlobalStyle } from 'styled-components';

// Importing the webfonts (webpack + css-loader + file-loader handles the bundling of the css and font files)
import './assets/font/fonts.css';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Oslo Sans Office', 'Roboto', sans-serif !important;
    }
    body, html {
        font-size: 16px;
        margin: 0;
        padding: 0;
    }

    body {
        min-height: 100vh;
        height: 100vh;
        display: flex;
        flex-direction: column;
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
