const path = require('path');

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
              ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
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
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'BizCharts',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
};

module.exports = [
  {
    ...baseConfig,
    mode: 'development',
    devtool: 'source-map',
    output: {
      ...baseConfig.output,
      filename: 'bizcharts.umd.js',
    },
  },
  {
    ...baseConfig,
    mode: 'production',
    output: {
      ...baseConfig.output,
      filename: 'bizcharts.umd.min.js',
    },
  },
];
