const path = require('path');
const webpack = require('webpack')

module.exports = {
    entry: './server/express.js',
    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /^pg-native$/,
            contextRegExp: /./,
          }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'motorwayapi.bundle.js'
    },
    target: 'node'
};