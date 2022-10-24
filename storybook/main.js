const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src/"),
    };

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        { loader: "vue-style-loader" },
        { loader: "css-loader", options: { sourceMap: true } },
        { loader: "sass-loader", options: { sourceMap: true } },
        {
          loader: "sass-resources-loader",
          options: {
            sourceMap: true,
            resources: [
              path.resolve("src/styles/_variables.scss"),
              path.resolve("src/styles/_fonts.scss"),
              path.resolve("src/styles/_themes.scss"),
              path.resolve("src/styles/_mixins.scss"),
            ],
          },
        },
      ],
    });

    return config;
  },
};
