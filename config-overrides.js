const { override,
    fixBabelImports,
    addWebpackAlias,
    adjustStyleLoaders,
    addWebpackPlugin,
    addLessLoader } = require('customize-cra');
const path = require('path');
const { name } = require('./package.json');
const paths = require('react-scripts/config/paths');
paths.appBuild = path.join(path.dirname(paths.appBuild), name); //@引入
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 打包进度
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css压缩
module.exports = override(
    // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,//自动打包相关的样式 默认为 style:'css'
    }),
    // 支持less
    addLessLoader({
        javascriptEnabled: true,
        lessOptions: {
            javascriptEnabled: true,
            localIdentName: '[local]--[hash:base64:5]',
        },
    }),
    adjustStyleLoaders(({ use: [, , postcss] }) => {
        const postcssOptions = postcss.options;
        postcss.options = { postcssOptions };
    }),
    addWebpackAlias({
        '@': path.resolve(__dirname, './src'),
        // '@': '/src'
    }),
    //css压缩
    addWebpackPlugin(new MiniCssExtractPlugin()),
    //打包进度
    addWebpackPlugin(new ProgressBarPlugin()),
);

