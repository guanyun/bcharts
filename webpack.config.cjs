const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const packageJSON = require('./package.json');

const isAnalyzer = process.env.MODE === 'ANALYZER';

const umdExternals = {
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
    umd: 'react',
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom',
    umd: 'react-dom',
  },
  'react-dom/client': {
    root: 'ReactDOM',
    commonjs2: 'react-dom/client',
    commonjs: 'react-dom/client',
    amd: 'react-dom/client',
    umd: 'react-dom/client',
  },
};

const esmExternals = {
  react: 'react',
  'react-dom': 'react-dom',
  'react-dom/client': 'react-dom/client',
};

const baseConfig = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: '> 0.25%, not dead', modules: false }],
              ['@babel/preset-react', { runtime: 'classic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      utils: path.resolve(__dirname, './src/utils'),
      '@antv/g2': path.resolve(__dirname, './node_modules/@antv/g2'),
    },
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/@antv\/g2\/(.*)/, (resource) => {
      resource.request = resource.request
        .replace(/@antv\/component\/esm/, '@antv/component/lib')
        .replace(/@antv\/g2\/esm/, '@antv/g2/lib');
    }),
    ...(isAnalyzer ? [new BundleAnalyzerPlugin({ analyzerMode: 'static' })] : []),
  ],
};

module.exports = [
  {
    ...baseConfig,
    mode: 'development',
    devtool: 'source-map',
    externals: umdExternals,
    output: {
      path: path.resolve(__dirname, 'dist'),
      library: 'BizCharts',
      libraryTarget: 'umd',
      globalObject: 'this',
      filename: 'bizcharts.umd.js',
    },
    plugins: [
      ...baseConfig.plugins,
      new webpack.DefinePlugin({
        __DEV__: true,
        __VERSION__: JSON.stringify(packageJSON.version),
      }),
    ],
  },
  {
    ...baseConfig,
    mode: 'production',
    externals: umdExternals,
    output: {
      path: path.resolve(__dirname, 'dist'),
      library: 'BizCharts',
      libraryTarget: 'umd',
      globalObject: 'this',
      filename: 'bizcharts.umd.min.js',
    },
    plugins: [
      ...baseConfig.plugins,
      new webpack.DefinePlugin({
        __DEV__: false,
        __VERSION__: JSON.stringify(packageJSON.version),
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
  },
  {
    ...baseConfig,
    mode: 'production',
    experiments: {
      outputModule: true,
    },
    externalsType: 'module',
    externals: esmExternals,
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'index.js',
      module: true,
      library: {
        type: 'module',
      },
    },
    plugins: [
      ...baseConfig.plugins,
      new webpack.DefinePlugin({
        __DEV__: false,
        __VERSION__: JSON.stringify(packageJSON.version),
      }),
    ],
    optimization: {
      minimize: false,
    },
  },
];
