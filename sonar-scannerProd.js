const scanner = require("sonarqube-scanner");

scanner.scan(
  {
    serverUrl: "https://sonar.wiztap.in/",
    options: {
      "sonar.login": "admin",
      "sonar.password": "Badboy@123",
      "sonar.projectKey": "MyData-Prod",
      "sonar.projectName": "MyData-Prod-Backend",
      "sonar.projectVersion": "1.0",
      "sonar.projectDescription": "MyData",
      "sonar.sourceEncoding": "UTF-8",
      "sonar.sources": "./src",
      "sonar.test.inclusions": "**/*.test.js,**/*.test.js",
      "sonar.exclusions": "**/*.test.js,**/node_modules/**/*.js",
      "sonar.tests": "./src",
      "sonar.testExecutionReportPaths": "test-report.xml",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.cpd.cross_project":"false",
    },
  },
  () => process.exit()
);
