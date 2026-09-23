# Playwright + TypeScript - SauceDemo Automation

This project uses a modern TypeScript-based Playwright setup for automating the [SauceDemo](https://www.saucedemo.com/) application.

## Overview

This workspace combines:
- Playwright for browser automation
- TypeScript for type-safe page objects and helpers
- Page Object Model (POM) for cleaner test organization
- shared core utilities for config, page creation, and file-based test data

## Project Structure

- `src/core/` - shared page and browser base logic
- `src/config/` - runtime configuration values and app settings
- `src/pages/` - page objects for each application module
- `src/pages/saucedemo/` - SauceDemo page objects
- `tests/` - Playwright test specs
- `utils/` - helper utilities such as CSV and file-path utilities
- `playwright.config.ts` - Playwright runner configuration

## Prerequisites

Make sure you are inside the TypeScript project folder before running any commands.

```bash
cd SAUCEDEMO-Playwright/TypeScript
npm install
```

## Run tests

Run all tests:

```bash
npx playwright test
```

Run a single file:

```bash
npx playwright test tests/sauceDemo/loginModule.spec.ts
```

Run a single test by name:

```bash
npx playwright test -g "login"
```

Run in headed mode:

```bash
npx playwright test --headed
```

## Modern TypeScript setup highlights

- TypeScript config is used for compile-time safety
- Node typings are included for `path`, `fs`, and other runtime utilities
- page objects use reusable base helpers from `BasePage`
- helper methods keep common logic centralized for uploads, clicks, navigation, and validations


## Notes

This project follows a modern Playwright + TypeScript structure aimed at maintainability, readability, and easier scaling as the test suite grows.