import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Webpack Plugins
// import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
// import webpack from 'webpack';
import NodeExternals from 'webpack-node-externals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default{
    mode: 'production',
    entry: './src/app.js',
    output: {
        filename: 'main.cjs',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
    externals: [NodeExternals()],
    module: {
        rules: [
            // {
            //     test: /\.css$/i,
            //     use: ['style-loader', 'css-loader'],
            // },
            // {
            //     test: /\.hbs$/,
            //     use: 'handlebars-loader',
            // },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
        ],
    },
    resolve: {
        fallback: {
            "aws-sdk": false,
            "mock-aws-s3": false,
            "npm": false,
            "nock": false,
            "node-gyp": false,
        },
    },
    plugins: [
        // new NodePolyfillPlugin(),
        // new webpack.ProvidePlugin({
        //     'process.hrtime': 'browser-process-hrtime'
        // }),
    ],
    stats: {
        warningsFilter: [
            /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
            /require\.extensions is not supported by webpack. Use a loader instead./,
            /Critical dependency: the request of a dependency is an expression/
        ],
    },
};
