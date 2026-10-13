# Playwright + TypeScript Automation

This folder contains the TypeScript-based Playwright automation project for SauceDemo and related browser automation flows.

## Overview

This project uses:
- Playwright for browser automation
- TypeScript for page-object and helper code
- POM-based structure for reusable UI interactions
- shared config and core utilities for test behavior

## Project structure

```text
TypeScript/
├── src/
│   ├── config/
│   │   ├── config.ts
│   │   └── testdata.ts
│   ├── core/
│   │   ├── API.ts
│   │   ├── BasePage.ts
│   │   ├── DriverFactory.ts
│   │   └── BaseMobile.ts/
│   ├── pages/
│   │   ├── api/
│   │   ├── expandtesting/
│   │   └── saucedemo/
│   │       ├── CentralizeSD.ts
│   │       ├── CommonSD.ts
│   │       ├── cartPage.ts
│   │       ├── checkoutPage.ts
│   │       ├── loginPage.ts
│   │       └── productPage.ts
│   └── ...
├── tests/
│   ├── booker/
│   ├── expandtesting/
│   └── sauceDemo/
│       ├── cartModule.spec.ts
│       ├── checkoutPage.spec.ts
│       ├── dataDriven.spec.ts
│       ├── loginModule.spec.ts
│       └── productModule.spec.ts
├── utils/
│   ├── getCSVTestData.ts
│   └── getFilePath.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── playwright-report/
├── test-results/
└── readme.md
```

## Prerequisites

### Web / Playwright prerequisites

Make sure Node.js and npm are installed, then run:

```bash
cd SAUCEDEMO-Playwright/TypeScript
npm install
```

If you are setting up a fresh Playwright project and the project files are missing, initialize it with:

```bash
npm init playwright@latest
```

Before running the browser tests for the first time, install the Chromium browser binary required by Playwright:

```bash
npx playwright install chromium
```

> This step is usually required before the first local execution. Without it, browser tests will fail with a missing browser error.

### Mobile / WDIO prerequisites

For native mobile automation, install the required SDKs and tooling on the machine that will run the mobile tests:

- Java JDK
- Android SDK / Android Studio
- Android emulator or real device connected via USB
- Appium Server
- Node.js and npm
- mobile app under test installed on the emulator/device

Start Appium before running mobile tests:

```bash
appium
```

If you are using an Android emulator, make sure the emulator is already running and reachable:

```bash
adb devices
```

> The mobile flow is separate from the Playwright browser flow and should be run in its own environment or project setup when the mobile app is being tested.

## Run the test suite

### Run the web tests

Run all Playwright tests:

```bash
npx playwright test
```

Run a specific spec file:

```bash
npx playwright test tests/sauceDemo/loginModule.spec.ts
npx playwright test tests/sauceDemo/checkoutPage.spec.ts
```

Run a specific test by name:

```bash
npx playwright test -g "login"
npx playwright test -g "Checkout"
```

Run in headed mode:

```bash
npx playwright test --headed
```

Open the HTML report:

```bash
npx playwright show-report
```

### Run the mobile tests

If the mobile flow is set up in a separate WDIO/Appium project, run it from that project folder:

```bash
cd ../mobile-project
npx wdio run wdio.conf.ts
```

If the mobile project is in the same workspace, keep the mobile commands separate from the Playwright browser commands to avoid module conflicts between Playwright and WebdriverIO.

### Run the project with a TS test runner

For Node/TypeScript test execution that does not use Playwright directly:

```bash
npx tsx --test tests/**/*.test.ts
```

This is useful for lightweight TypeScript-based test runs, but the browser report and browser automation are still best handled by Playwright when the app is a web app.

## Configuration highlights

The Playwright setup is defined in `playwright.config.ts` and includes:
- test directory: `./tests`
- Chromium project configuration
- HTML + JUnit reporting under `playwright-report/`
- trace retention on failure
- delay and headless settings pulled from `src/config/config.ts`
- expectation timeout from the same config file

## Notes

This TypeScript project is organized to keep the test code readable and scalable:
- config values are centralized in `src/config/`
- page interactions are encapsulated in `src/pages/`
- test cases live under `tests/`
- reusable helpers live in `src/core/` and `utils/`

This structure is intended to support easier maintenance as the suite grows.