import { onCreateWebpackConfig as svgLoader } from 'gatsby-plugin-react-svg';
import { createPlugin } from 'docz-core';

/*
 * ⚠ Note: This is a temporary fix until docz has solved the import issue in a new version
 *      The issue can be found there https://github.com/doczjs/docz/issues/1474
 */
const importAndSvgFix = () =>
    createPlugin({
        onCreateWebpackConfig: (args) => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const path = require('path');
            args.actions.setWebpackConfig({
                resolve: {
                    // ⚠ Note the '..' in the path because the docz gatsby project lives in the `.docz` directory
                    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
                    alias: {
                        '@': path.resolve(__dirname, '../src'),
                    },
                },
            });
            // Function from 'gatsby-plugin-react-svg' to be able to load svg images as react components
            svgLoader(args, {});
        },
    });

export default {
    typescript: true,
    plugins: [importAndSvgFix()],
};
