# 🧪 Playwright Automation Suite – SauceDemo
This project is an end-to-end automation suite built using **Playwright + TypeScript** for testing the SauceDemo application.
## 📌 Application Under Test
https://www.saucedemo.com/

---
## 🛠️ Tech Stack
- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)
- Data-driven testing (JSON test data)
---
## Project structure
```bash
## Project Structure

SauceDemo-Playwright-Automation/
├── pages
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   └── CheckoutPage.ts
│
├── tests
│   ├── happy-path.spec.ts
│   ├── product-details.spec.ts
│   └── sorting.spec.ts
│
├── test-data
│   └── users.json
│
├── playwright.config.ts
└── package.json
```
---
## 🚀 How to Run
### Install dependencies
```bash
npm install
```
Run all tests
```bash
npx playwright test
```
View HTML report
```bash
npx playwright show-report
```
⸻

🧪 Test Coverage

1. happy-path.spec.ts- End-to-End Purchase Flow (E2E)

* Login as standard user
* Add products to cart
* Complete checkout
* Validate order confirmation
* Logout

👉 This is the main business flow validation.

⸻

2. sorting-validation.spec.ts -Product Sorting Validation

* Verify product sorting (high-to-low)
* Validate UI ordering logic

⸻

3. product-details.spec.ts- Product Details Navigation

* Open product from inventory page
* Validate correct product detail page is displayed
* Ensure navigation consistency

⸻

👥 Test Data Strategy

This framework uses multiple user types:

* standard_user → Happy path flow
* problem_user → UI/functional inconsistencies
* performance_glitch_user → performance validation
* locked_out_user → login restriction validation
* error_user → checkout & cart edge cases

⸻

📊 Key Design Decisions

* Page Object Model used for maintainability
* Data-driven approach for user scenarios
* Assertions kept focused and stable
* E2E kept minimal to avoid brittleness
* Functional tests separated from full journey flow

👤 Author

Madhu Sahiti Yerrguntla -Automation QA Engineer 

