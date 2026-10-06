# HR System (V2.1 – Safeguards Cambodia) – Web Test Scenarios

**Application URL:** `https://localhost:44300/`

**Note:** The application runs on HTTPS with a local certificate. Configure the browser context to ignore HTTPS errors.

**Main navigation (after login):**

| Menu | URL |
|---|---|
| Home | `/` |
| Registration | `/Registration` |
| Setup | `/SetUp` |
| Holiday Setup | `/LogSetup` |
| Payroll Components | `/PayRollValue` |
| Leave and Dayoff | `/Timesheet` |
| Run Payroll | `/PayRollTransaction` |
| Report | `/Report` |
| Attendance | `/Attendance` |

Implement these scenarios following the framework conventions defined in `playwright-mcp-context.md`.

For every field, button, or message not named in a scenario, verify the application's actual behavior. Do not invent field names, values, or messages.

---

# 1. Valid Login Flow

Validate successful user login.

1. Open the application.
2. Verify that the login page is displayed.
3. Enter valid credentials from the project's configured test data.
4. Submit the login form.
5. Verify successful authentication.
6. Verify that the home page is displayed.
7. Verify that the header shows the **HR SYSTEM** title and the greeting **Hello, <username>!**.
8. Verify that the main navigation links are visible.

## Expected Result

Valid credentials are accepted and the user reaches the authenticated home page.

---

# 2. Invalid Login Flow

Verify login failure with invalid credentials.

1. Open the application.
2. Enter an invalid username and/or password.
3. Submit the form.
4. Verify that authentication fails.
5. Verify the application's actual warning/error message.
6. Verify that the user is not authenticated and the main navigation is not available.

## Expected Result

The invalid login is rejected and the warning message is displayed.

---

# 3. Logout Flow

Validate user logout.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Verify that authentication succeeds.
4. Click **Log off** in the header.
5. Verify the expected redirect, such as the login page.
6. Verify that the greeting and the main navigation are no longer available.

## Expected Result

The user is logged out successfully and can no longer access authenticated pages.

---

# 4. Main Navigation Verification

Validate that every main menu opens its page.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Verify that these links are displayed: Home, Registration, Setup, Holiday Setup, Payroll Components, Leave and Dayoff, Run Payroll, Report, Attendance.
4. Click each link one by one.
5. After each click, verify that the browser URL matches the table above.
6. Verify that the page loads without an error message.

## Expected Result

Every menu opens the correct page without errors.

---

# 5. Unauthenticated Access Protection

Verify that application pages are protected.

1. Open a new browser session with no login.
2. Navigate directly to `/Registration`, `/PayRollTransaction`, and `/Report`.
3. Verify that the page content is not displayed.
4. Verify that the user is redirected to the login page, or that the application's actual access-denied behavior is shown.

## Expected Result

Pages cannot be accessed without authentication.

---

# 6. Employee Registration Flow

Validate registering a new employee.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Click **Registration** in the main navigation.
4. Verify that the Registration page is displayed.
5. Start adding a new employee.
6. Generate unique employee data (unique employee name, ID, and any other field that must be unique).
7. Fill all mandatory fields on the first tab with valid values.
8. Go through every remaining tab and fill the available fields with valid values.
9. Save the employee.
10. Verify that the save succeeds and the application's success message is displayed.
11. Search for the newly created employee.
12. Verify that the employee appears with the entered details.

## Expected Result

The new employee is saved successfully and can be found in the employee list.

---

# 7. Duplicate Employee Rejection

Verify that a duplicate employee cannot be registered.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Click **Registration**.
4. Start adding a new employee using the same unique identifier(s) as an existing employee (for example, the employee created in Scenario 6).
5. Fill the remaining mandatory fields with valid values.
6. Save the employee.
7. Verify that the save is rejected.
8. Verify the application's actual duplicate warning/error message.
9. Verify that no second record is created.

## Expected Result

The duplicate employee is rejected and the warning message is displayed.

---

# 8. Employee Mandatory Field Validation

Verify validation when mandatory fields are empty.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Click **Registration**.
4. Start adding a new employee.
5. Leave the mandatory fields empty.
6. Save the employee.
7. Verify that the save is rejected.
8. Verify the application's actual validation message for each empty mandatory field.

## Expected Result

The employee is not saved and the mandatory field validation messages are displayed.

---

# 9. Setup Flow

Validate the Setup page.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Click **Setup**.
4. Verify that the Setup page is displayed.
5. Verify the setup options available on the page.
6. Open one setup option.
7. Add a new record with unique generated data.
8. Save the record.
9. Verify the success message.
10. Verify that the new record appears in the list.

## Expected Result

A new setup record is saved successfully and displayed in the list.

---

# 10. Holiday Setup Flow

Validate adding a holiday.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Click **Holiday Setup**.
4. Verify that the Holiday Setup page is displayed.
5. Add a new holiday with a unique name and a valid date.
6. Save the holiday.
7. Verify the success message.
8. Verify that the new holiday appears in the holiday list with the correct name and date.

## Expected Result

The holiday is saved successfully and displayed in the holiday list.

---

# 11. Payroll Components Flow

Validate adding a payroll component.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Click **Payroll Components**.
4. Verify that the Payroll Components page is displayed.
5. Add a new payroll component with a unique name and a valid value.
6. Save the component.
7. Verify the success message.
8. Verify that the new component appears with the correct details.

## Expected Result

The payroll component is saved successfully and displayed in the list.

---

# 12. Leave and Dayoff Flow

Validate applying leave for an employee.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Click **Leave and Dayoff**.
4. Verify that the Leave and Dayoff page is displayed.
5. Select an existing employee (for example, the employee created in Scenario 6).
6. Enter a valid leave type and valid dates.
7. Submit the leave.
8. Verify the success message.
9. Verify that the leave record appears with the correct employee, type, and dates.

## Expected Result

The leave is recorded successfully for the selected employee.

---

# 13. Attendance Flow

Validate the Attendance page.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Click **Attendance**.
4. Verify that the Attendance page is displayed.
5. Select an existing employee and a valid period.
6. Load the attendance.
7. Verify that the attendance data for the selected employee and period is displayed.
8. Verify that no error message is displayed.

## Expected Result

Attendance for the selected employee and period is displayed correctly.

---

# 14. Run Payroll Flow

Validate running payroll.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Click **Run Payroll**.
4. Verify that the Run Payroll page is displayed.
5. Select a valid branch and payroll period.
6. Load the employees for payroll.
7. Verify that the expected employee (for example, the employee created in Scenario 6) is listed.
8. Run the payroll.
9. Verify the application's success/confirmation message.
10. Verify that the payroll result is displayed for the selected employee.
11. Verify that the payroll amounts are displayed without errors.

## Expected Result

Payroll runs successfully and the result is displayed for the selected employee.

---

# 15. Run Payroll Validation Without Required Selection

Verify payroll validation when required selections are missing.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Click **Run Payroll**.
4. Leave the required selections (branch/period) empty.
5. Try to run the payroll.
6. Verify that payroll does not run.
7. Verify the application's actual validation message.

## Expected Result

Payroll does not run and the validation message is displayed.

---

# 16. Report Page Flow

Validate the Report page.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Click **Report**.
4. Verify that the browser URL ends with `/Report`.
5. Verify that the **Welcome** header, the **Branch*** field, and the note **[NOTE : Please Choose 'Branch' ..!]** are displayed.
6. Verify that the default Branch value is **All**.
7. Verify that **Exceptional Dashboard** and **Training Dashboard** are displayed.
8. Click **select** next to the Branch field and choose a valid branch from the project's configured test data.
9. Verify that the Branch field shows the chosen branch.
10. Click **Exceptional Dashboard** and verify the actual behavior.
11. Click **Training Dashboard** and verify the actual behavior.
12. Verify that no error message is displayed.

## Expected Result

The Report page displays correctly, the branch can be selected, and both dashboards open without errors.

---

# 17. End-to-End HR Flow

Covers the complete journey from employee registration to payroll and reporting.

1. Open the application.
2. Log in using valid credentials from the project's configured test data.
3. Verify successful authentication.
4. Register a new employee using dynamically generated unique data (Scenario 6).
5. Verify the employee is saved.
6. Add a holiday with unique data (Scenario 10).
7. Add a payroll component with unique data (Scenario 11).
8. Apply leave for the newly created employee (Scenario 12).
9. Verify attendance for the newly created employee (Scenario 13).
10. Run payroll for the period that includes the newly created employee (Scenario 14).
11. Verify the payroll result for that employee.
12. Open the Report page and select the employee's branch (Scenario 16).
13. Verify that the report page displays without errors.
14. Log off.
15. Verify that the complete journey finishes without errors.

## Expected Result

Employee registration, setup, leave, attendance, payroll, and reporting all succeed in one continuous journey.

---

# 18. Login Flow (Data Driven using External File)

Validate login using test data loaded from an external file, with one independent test generated per data row.

## Test Data

Load rows from an external data file — one of:

- `testdata/hr_logindata.csv`
- `testdata/hr_logindata.xlsx`
- `testdata/hr_logindata.json`

Each row contains:

- `testName` or `TestName` — scenario name
- `username` — login username
- `password` — login password
- `expected` — `success` or `failure`

Do not hard-code test data in the spec.

## Test Flow

For each data row:

1. Open the login page: `https://localhost:44300/`.
2. Enter the username and password.
3. If a value is blank/whitespace, leave that field empty.
4. Submit the login form.
5. Validate the result based on `expected`.

## Validation

**For `expected: success`:**

- Verify login is successful.
- Verify the home page and greeting are displayed.

**For `expected: failure`:**

- Verify login is unsuccessful.
- Verify the application's actual warning/error message.

**For blank username/password:**

- Verify the application's actual validation/error behavior.
- Do not replace blank values with dummy data.

## Expected Result

Loading the external test data produces one independent test per row, and the actual login result matches each row's `expected` value.

---

# 19. Employee Registration (Data Driven using External File)

Validate employee registration using test data loaded from an external file, with one independent test generated per data row.

## Test Data

Load rows from an external data file — one of:

- `testdata/hr_employeedata.csv`
- `testdata/hr_employeedata.xlsx`
- `testdata/hr_employeedata.json`

Each row contains:

- `testName` or `TestName` — scenario name
- one column for each mandatory employee field on the Registration page
- `expected` — `success` or `failure`

Do not hard-code test data in the spec.

## Test Flow

For each data row:

1. Log in using valid credentials from the project's configured test data.
2. Click **Registration** and start adding a new employee.
3. Enter the row values in the matching fields.
4. If a value is blank/whitespace, leave that field empty.
5. Save the employee.
6. Validate the result based on `expected`.

## Validation

**For `expected: success`:**

- Verify the employee is saved and the success message is displayed.
- Verify the employee appears in the employee list.

**For `expected: failure`:**

- Verify the save is rejected.
- Verify the application's actual validation/error message.

**For blank values:**

- Verify the application's actual validation/error behavior.
- Do not replace blank values with dummy data.

## Expected Result

Loading the external test data produces one independent test per row, and the actual registration result matches each row's `expected` value.
