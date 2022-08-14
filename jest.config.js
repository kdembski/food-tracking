// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  collectCoverageFrom: [
    "src/**/*.{js,ts,vue}",
    "!src/**/*.stories.js",
    "!src/main.ts",
    "!src/App.vue",
  ],
  moduleFileExtensions: ["js", "json", "vue", "ts"],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  preset: "ts-jest",
  setupFiles: ["<rootDir>/jest/setup-jest"],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  transform: {
    ".*\\.(vue)$": "@vue/vue3-jest",
    ".*\\.(ts)$": "ts-jest",
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
    'jest-transform-stub'
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
