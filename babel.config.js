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
          "@database": "./src/database",
          "@modelTypes": "./src/types",
          "@repositories": "./src/repositories",
          "@utils": "./src/utils",
          "@routes": "./src/routes",
          "@middlewares": "./src/middlewares",
          "@providers": "./src/providers",
          "@config": "./src/config",
        },
      },
    ],
  ],
  ignore: ["**/__tests__/*"],
};
