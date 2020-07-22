import OsloSansOffice_Regular from './assets/font/OsloSansOffice_Regular.ttf';
import OsloSansOffice_RegularItalic from './assets/font/OsloSansOffice_RegularItalic.ttf';
import OsloSansOffice_Bold from './assets/font/OsloSansOffice_Bold.ttf';
import OsloSansOffice_BoldItalic from './assets/font/OsloSansOffice_BoldItalic.ttf';

/*
 * Function to inject the custom Oslo font into the app.
 * The reason why this is needed is that importing the font through globalStyles in
 * styled-components doesnt work properly and creates flickers on re-renders as
 * styled-components reloads the font. The issues has lasted for years and can be found at
 * https://github.com/styled-components/styled-components/issues/1593
 */
export const injectFont: () => void = () => {
    const css = `
        @font-face {
            font-family: Oslo Sans Office;
            src: url(${OsloSansOffice_BoldItalic});
            font-weight: bold;
            font-style: italic;
        }
        
        @font-face {
            font-family: Oslo Sans Office;
            src: url(${OsloSansOffice_RegularItalic});
            font-weight: normal;
            font-style: italic;
        }
        
        @font-face {
            font-family: Oslo Sans Office;
            src: url(${OsloSansOffice_Bold});
            font-weight: bold;
            font-style: normal;
        }
        
        @font-face {
            font-family: Oslo Sans Office;
            src: url(${OsloSansOffice_Regular});
            font-weight: normal;
            font-style: normal;
        }
    `;

    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.innerHTML = css;
    head.appendChild(style);
};
