// const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  filenameHashing: false,
  publicPath: "/",
  configureWebpack: {
    // plugins: [
    //   new Visualizer({ filename: './statistics.html' }),
    // ],
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\/]node_modules[\\/](leaflet)[\\/]/,
    //         name: 'leaflet-chunk',
    //         chunks: 'all',
    //       },
    //       new: {
    //         test: /[\\/]node_modules[\\/](esri-leaflet)[\\/]/,
    //         name: 'esri-leaflet-chunk',
    //         chunks: 'all',
    //       },
    //     },
    //   },
    // },
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(false);
  },
  // lintOnSave: true,

  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "~@phila/phila-ui/src/assets/styles/scss/functions.scss";
          @import "~@phila/phila-ui/src/assets/styles/scss/colors.scss";
          @import "~@phila/phila-ui/src/assets/styles/scss/variables.scss";
        `,
        sourceMap: true,
      },
    },
  },

  // pluginOptions: {
  // //   'style-resources-loader': {
  // //     preProcessor: 'scss',
  // //     patterns: [
  // //       path.resolve(__dirname, '@/styles/global.scss'),
  // //     ],
  // //   },
  // // },
  // },
  assetsDir: 'static',
  transpileDependencies: [
    // can be string or regex
    '@phila/phila-ui',
    // '@phila/pinboard',
    // '@phila/vue-mapping',
    // '@phila/vue-datafetch',
    // /other-dep/
  ],

};
