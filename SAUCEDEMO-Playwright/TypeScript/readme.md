# Playwright TypeScript - SauceDemo Tests

This folder contains Playwright tests using **TypeScript**, targeting the [SauceDemo](https://www.saucedemo.com/) web app.

## Project Structure

- **src/common/**: Common utilities and helper functions
- **src/pages/**: Page objects for Saucedemo
- **tests/**: Test scripts

## Getting Started

1. Install dependencies:
make sure you're in TypeScript project root, not outside.

run this inside the folder that contains package.json
```bash
npm install
```

2. Run Playwright tests:

```bash
npx playwright test
```

3. Run single test file:
```bash
npx playwright test sauceDemo/specific_file.spec.ts
```

## Features

Page Object Model (POM) implemented

CommonKeywords for reusable actions (fillText, clickElement, verifyValue, etc.)

CommonSauceDemo for centralize control for all page in sauce demo site

Handles multiple pages/contexts

Logs verification results to console