import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  moduleDirectories: [
    "node_modules",
    "source"
  ],
  rootDir: "./",
  modulePaths: [
    "<rootDir>"
  ],
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: [
    "./source/**/*.(t|j)s",
    "!./source/**/*.d.ts"
  ],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
};
export default config;
