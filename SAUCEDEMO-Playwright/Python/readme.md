# Playwright Python - SauceDemo Tests

This folder contains Playwright test automation using Python and Pytest, targeting the [SauceDemo](https://www.saucedemo.com/) web application.

## Project Structure

- **config/**: Browser and application configuration files
- **resources/**: Shared utilities and page object modules
- **resources/PageObjects/SAUCEDEMO/**: Page objects for SauceDemo flows
- **test/**: Pytest test files
- **utils/**: Driver setup, session management, and config loading helpers
- **pytest.ini**: Pytest configuration and custom markers

## Getting Started

1. Open the Python project folder.

2. Create and activate a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

3. Install dependencies:

```bash
pip install pytest playwright
python -m playwright install
```

4. Run the test suite:

```bash
pytest --alluredir=allure-results
```

5. Run a single test file:

```bash
pytest --alluredir=allure-results test/login_test.py
```

6. Run a specific test:

```bash
pytest --alluredir=allure-results test/login_test.py -k login3 
```

7. Check report
```bash
allure serve allure-results
```

## Useful Pytest Commands

- Run with verbose output:

```bash
pytest -v
```

- Run tests matching a marker:

```bash
pytest -m std_usr
```

- Generate test report output:

```bash
pytest --html=report.html
```

## Features

- Page Object Model (POM) implemented for SauceDemo pages
- Reusable browser/session management
- Centralized configuration using YAML files
- Multiple page handling for SauceDemo, YouTube, and Google flows
- Flexible test setup and teardown with Pytest

## Notes

This project uses Playwright with Python's sync API and follows a modular structure to keep test logic clean and reusable across multiple pages and scenarios.
