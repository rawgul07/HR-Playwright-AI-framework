# Prompt — Create Page Object Classes (HR Application)

Copy/paste the text below to your AI coding agent. Attach `playwright_mcp_context.md` and the test case file `TC_HR_REG_E2E_001_Employee_Registration.md`, and state whether the agent should use **Playwright MCP** or **Playwright CLI**.

```text
Use the supplied Playwright MCP/CLI setup and the attached `playwright_mcp_context.md` as the implementation context.

Read the test case `TC_HR_REG_E2E_001_Employee_Registration.md`. Create the Page Object classes inside the `pages/` folder that are needed to automate that test case for the HR application.

Do not write the test file yet. Only create the page objects.

Step 1 - Inspect the application first
- Open the HR application (URL and credentials are in `.env`) using MCP/CLI.
- Walk through the flow in the test case: login, navigation bar, Registration page, Add New, every tab of the employee form, save, duplicate attempt, logout.
- Note the pages, the tabs, and the fields on each tab. Base everything on what you actually see in the application. Do not guess field names or labels.

Step 2 - Create these page objects (one class per file)
- LoginPage: login form, submit action, login error/validation message.
- HomePage (or NavigationPage): navigation bar menu items, opening the Registration page, and logout.
- RegistrationPage: the Registration list/landing page, the Add New button, the save action, and the success and duplicate/validation messages.
- One page object per tab of the employee registration form, named after the tab shown in the application (for example, if a tab is called "Personal Details", create `PersonalDetailsPage`). Each one holds the fields of that tab and the methods to fill and save it.

If the application shows that a different split is cleaner (for example, tabs that share the same page and only differ by section), tell me what you changed and why.

Step 3 - Coding rules
- Language: TypeScript. Follow the existing file naming, import style, and aliases in the project.
- Each class takes Playwright's `Page` in the constructor.
- Define locators as `readonly` properties in the constructor.
- Prefer `getByRole`, `getByLabel`, `getByText`, and `getByPlaceholder`. Use CSS or XPath only when there is no better option.
- Write action methods (for example `login(email, password)`, `openRegistration()`, `fillTab(data)`, `save()`, `logout()`).
- Fill methods take a typed data object as a parameter. Do not hard-code employee data, URLs, or credentials inside page objects.
- Keep test assertions out of page objects. Where the test needs to check something, expose a locator or a getter method (for example `successMessage`, `getDuplicateMessage()`) and let the test assert.
- No `waitForTimeout` or fixed sleeps. Rely on Playwright auto-waiting.
- Keep the code minimal and clean. No unused methods, no speculative helpers.
- Reuse existing utilities and fixtures. Do not duplicate them. Do not modify unrelated files.

Step 4 - Report back
- List the page object files created, with a one-line purpose for each.
- List the typed data interface(s) you defined or expect for the employee data, per tab.
- List anything you could not confirm from the application (unclear tab behaviour, unlabeled fields, conditional fields), and ask me instead of guessing.
```
