# TC_HR_REG_E2E_001 — Employee Registration End-to-End Flow

## Test Case Details

| Field            | Value                                                        |
| ---------------- | ------------------------------------------------------------ |
| Test Case ID     | TC_HR_REG_E2E_001                                            |
| Title            | Register a new employee across all tabs and verify duplicate registration is rejected |
| Module           | Employee Registration                                        |
| Type             | End-to-End, Web (UI)                                         |
| Priority         | High                                                         |
| Tags             | `@web` `@e2e` `@regression`                                  |
| Target folder    | `tests/web/`                                                 |

## Objective

Verify that a logged-in user can register a new employee by completing every tab of the registration form, and that the application prevents registering the same employee a second time.

## Preconditions

1. The HR application is up and reachable at `WEB_APP_URL` (from `.env`).
2. A valid user account exists, with credentials in `.env`, and that user has permission to register employees.
3. The employee being registered does not already exist (test data is generated fresh on every run).

## Test Data

| Data                  | Source                                                                 |
| --------------------- | ---------------------------------------------------------------------- |
| Application URL       | `WEB_APP_URL` in `.env`                                                |
| Login credentials     | `APP_EMAIL` and `APP_PASSWORD` in `.env` (or the variable names used for the HR app) |
| Employee details      | Generated at runtime using `utils/dataGenerator.ts` (faker). Unique on every run. |

The employee data used in Step 4 and Step 5 must be kept in one object during the test and reused in Step 6 for the duplicate check.

## Test Steps and Expected Results

| #   | Test Step                                                                                              | Expected Result                                                                                       |
| --- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| 1   | Open the application URL.                                                                              | Login page loads successfully.                                                                        |
| 2   | Log in using the credentials from the `.env` file.                                                     | Login succeeds and the home/dashboard page is displayed with the navigation bar.                      |
| 3   | Use the navigation bar menu to go to the Registration page.                                            | Registration page opens and the correct page heading/URL is shown.                                    |
| 4   | Click **Add New**, fill in the first (basic details) section of the new employee, and click **Save**. | Employee is saved and a success confirmation is displayed. No validation errors.                      |
| 5   | Open each remaining tab one by one, fill in all the information the tab asks for, and save.            | Every tab accepts the data and saves successfully, with a success confirmation per save action. Entered values remain visible after saving. |
| 6   | Try to register the same employee again, using the same details used in Steps 4 and 5.                 | The application rejects the duplicate and shows a duplicate/validation message. No second record is created. |
| 7   | Log out.                                                                                               | User is logged out and the login page is displayed.                                                   |

## Postconditions

- The employee registered in Step 4 exists exactly once in the application.
- The user session is closed.

## Automation Instructions for the Agent

Use the attached `playwright_mcp_context.md` and the Playwright MCP/CLI to inspect the application before writing any code.

1. **Discover the application first.** Use MCP/CLI to open the HR app and identify:
   - the navigation menu item that leads to the Registration page
   - the tabs on the registration form, and the fields on each tab (mark which are mandatory)
   - whether **Save** is done once or once per tab
   - which field(s) the application treats as unique for the duplicate check (for example employee ID, email, or phone number)
   - the exact success and duplicate messages shown
2. **Follow the framework structure.**
   - Page Object classes in `pages/` (Login, Home/Navigation, Registration, and one method group per tab)
   - Reusable login/logout setup in `fixtures/` if it fits the framework
   - Test file in `tests/web/`
3. **Test data.** Generate employee data with `utils/dataGenerator.ts`. Do not hard-code employee details, URLs, or credentials in the test. Read URL and credentials from `.env`.
4. **Locators.** Prefer `getByRole`, `getByLabel`, and `getByText`. Use CSS/XPath only when there is no better option.
5. **Assertions.** Add an assertion for every "Expected Result" in the table above. Use Playwright web-first assertions (`expect(locator)...`).
6. **Waiting.** Do not use `waitForTimeout` or fixed sleeps. Rely on Playwright auto-waiting and assertions.
7. **Structure.** Use `test.step()` for each of the 7 steps so the reports show the flow clearly. Add the tags `@web`, `@e2e`, `@regression`.
8. **Scope.** Do not modify unrelated files. Reuse existing utilities and fixtures instead of duplicating them.
9. **After implementation,** list the files created or updated, and list anything you could not confirm from the application.

## Open Points (to be confirmed from the application, not assumed)

- Which field(s) define a duplicate employee.
- The exact duplicate message text.
- Whether every tab has its own Save button or the whole form is saved once.
- Any tab that is conditional or read-only.

If any of these cannot be confirmed by inspecting the application, ask instead of guessing.
