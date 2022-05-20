const CracoLessPlugin = require("craco-less");

const antOverrideVariables = {
  "@primary-color": "#2a8ba8",
  "@layout-header-background": "#44403C",
  "layout-body-background" : '#fff9f5'
};

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: antOverrideVariables,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
