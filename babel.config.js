module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@controllers": "./src/controllers",
          "@models": "./src/models",
          "@repositories": "./src/repositories",
          "@utils": "./src/utils",
          "@routes": "./src/routes",
          "@middlewares": "./src/middlewares",
        },
      },
    ],
  ],
  ignore: ["**/__tests__/*"],
};
