# Testing Guidelines

## E2E Testing (Playwright)

- **Handling Asynchronicity**: When testing features that involve asynchronous operations (like navigation after a click, or waiting for an API response), always use `waitForURL`, `waitForSelector`, or similar `waitFor` functions instead of relying on fixed delays or immediate checks. This makes the tests more robust and less flaky.