module.exports = {
    testMatch: ["<rootDir>/tests/Feature/*.test.js", "<rootDir>/tests/Unit/*.test.js"],
    coveragePathIgnorePatterns: ["/node_modules/"],
    verbose: true,
    forceExit: true, //   clearMocks:true
};
