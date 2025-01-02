import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ReturnCopyWebpackPlugin from "./return-copy-webpack-plugin.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(__filename, "..");

export default {
    entry: ["./src/index.tsx"],
    mode: "production",
    devtool: "hidden-source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name]_[fullhash].js",
        publicPath: "/",
        clean: true,
    },

    optimization: {
        // minimize: true,
        // minimizer: [new BundleAnalyzerPlugin()],
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                        )[1];
                        // if (["style-loader", "css-loader"].indexOf(packageName) > -1)
                        //   return;
                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `${packageName.replace("@", "")}`;
                    },
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.scss$/,
                exclude: /node_module/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
        alias: {
            "@src": path.resolve(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@component": path.resolve(__dirname, "./src/component"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        ReturnCopyWebpackPlugin(["public/imgs", "public/fonts"]),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["dist", "build"],
            cleanStaleWebpackAssets: false,
            protectWebpackAssets: false,
        }),
    ],
};
