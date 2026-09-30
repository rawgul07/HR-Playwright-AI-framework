# Employee Registration Inspection

Inspection date: 2026-09-30

## Scope and status

The application configured by `.env` is `https://localhost:44300/Account/Login`, titled `Log in PRApplication`. The inspected system is branded HR SYSTEM / HRSystem. Login uses the visible `User name` and `Password` textboxes and `Log in` button. The local environment names are `BASE_URL`, `USERNAME`, and `PASSWORD`.

This was a read-only inspection. No employee form was saved, and no employee was edited or deleted during this inspection. A previous interaction in this conversation did save an arbitrary inspection employee (`CopilotTemp20260930 Inspection`, employee number `5200`). It was not found in the visible employee lists during this inspection, and it has not been deleted. Do not treat it as test data.

Statuses mean:

- `VERIFIED`: observed directly in the application.
- `BLOCKED`: the application requires an earlier save, which was not permitted for this inspection.
- `FAILED - APPLICATION ERROR`: the application returned an error on the initial attempt and on its single retry.
- `UNVERIFIED`: not safely observable in the current state.

## Workflow

1. `GET /Account/Login` displays heading `Log in.` and labeled `User name`, `Password`, and `Remember me?` controls, plus `Log in` and `Register` links.
2. Successful login opens `/` with a navigation link named `Registration` and a `Log off` link.
3. `Registration` opens `/Registration`, heading `Registration`.
4. The initial section is `Uncompleted Employee`. Its `Add New Employee` link opens a modal dialog named `Employee Details` without changing the URL.
5. The dialog opens on `Employee Information`. Clicking any of the other 11 tabs before saving shows `Please Register in "Employee Information" section before you continue...`. The form also displays `Please do not switch over another tab before press 'SAVE' button *`.
6. A Save control is present on Employee Information. Save was not activated in this read-only inspection. A success alert `Data Saved Successfully!!!` was observed during the earlier interaction noted above. Per-tab save behavior beyond the earlier-observed Payroll Information Save control is not verified here.
7. `Log off` returns to `/Account/Login`.

## Employee form tabs

Order and status:

| Order | Tab | Status | Observation |
| --- | --- | --- | --- |
| 1 | Employee Information | VERIFIED | Blank form and controls inspected. |
| 2 | Payroll Information | BLOCKED | Gated until Employee Information is saved. A prior interaction exposed this panel and its Save control; it was not saved in this inspection. |
| 3 | Official Information | BLOCKED | Gated by Employee Information prerequisite. |
| 4 | Passport Information | BLOCKED | Gated by Employee Information prerequisite. |
| 5 | Contact Information | BLOCKED | Gated by Employee Information prerequisite. |
| 6 | Family Information | BLOCKED | Gated by Employee Information prerequisite. |
| 7 | Qualification Information | BLOCKED | Gated by Employee Information prerequisite. |
| 8 | Reference Information | BLOCKED | Gated by Employee Information prerequisite. |
| 9 | Experience Information | BLOCKED | Gated by Employee Information prerequisite. |
| 10 | Relieve Information | BLOCKED | Gated by Employee Information prerequisite. |
| 11 | Employee Components | BLOCKED | Gated by Employee Information prerequisite. |
| 12 | Other Information | BLOCKED | Gated by Employee Information prerequisite. |

Each tab is a link with `href="#clienttabstrip-N"` for its observed order. The modal title is `Employee Details`; the tab link labels are usable role-based locators.

## Employee Information controls

All visible controls below were enabled and not read-only in the blank form. The DOM `required` property was false; required behavior is represented by MVC `data-val-required` metadata. Runtime validation was not triggered because submitting the form would create or modify business data.

| Visible label | Control and verified selector | Default / options | Required evidence |
| --- | --- | --- | --- |
| Title* | Kendo textbox `input[name="TitleId_input"]`; backing input `#TitleId` | Placeholder `-- Select --`; options `Miss`, `Mr`, `Mrs` | Backing input has `data-val-required="The Title* field is required."` |
| First Name* | Textbox `#FirstName` | Empty | `data-val-required="The First Name* field is required."` |
| Last Name* | Textbox `#LastName` | Empty | `data-val-required="The Last Name* field is required."` |
| Local Name | Textbox `#LocalName` | Empty | No required metadata observed |
| Gender* | Kendo textbox `input[name="Gender_input"]`; backing input `#drpdwnGender` | Placeholder `--Select--`; options `Male`, `Female` | Backing input has `data-val-required="The Gender* field is required."` |
| Alternate Emp Id | Textbox `#AlternateEmpId` | Empty | No required metadata observed |
| DOB* | Textbox/date picker `#hdndob`; calendar trigger `#hdndob + .k-select` | Default `09/30/2026`; format shown as `[MM/dd/yyyy]`; opens a Kendo calendar for September 2026 | `data-val-required="The DOB* field is required."`; `data-val-date="The field DOB* must be a date."` |
| Religion* | Kendo textbox `input[name="ReligionId_input"]`; backing input `#ReligionId` | Placeholder `--Select--`; options `Buddha`, `Christian`, `Hindu`, `Muslim`, `UnKnown` | Backing input has required metadata for Religion* |
| Nationality* | Kendo textbox `input[name="NationalityId_input"]`; backing input `#NationalityId` | Placeholder `--Select--`; long country list; `Malaysia` and `Malaysian` were observed | Backing input has required metadata for Nationality* |
| Race* | Kendo textbox `input[name="RaceId_input"]`; backing input `#RaceId` | Placeholder `--Select--`; options `CHINESE`, `INDIAN`, `MALAY`, `OTHER`, `UnKnown` | Backing input has required metadata for Race* |
| Language* | Checkboxes `input[name="chk_2"]`, `input[name="chk_1"]`, `input[name="chk_3"]` | `English` = `chk_2`/value `2`; `Khmer` = `chk_1`/value `1`; `Malay` = `chk_3`/value `3`; all unchecked | Asterisk is visible; no checkbox required metadata observed |
| Recruitment Type | Kendo textbox `input[name="RecruitmentTypeId_input"]`; backing input `#cmbrecruitmenttype` | Placeholder `--Select--`; only observed option `Radio` | No visible asterisk, but backing input has `data-val-required="The Recruitment Type field is required."` |

Kendo dropdowns use a sibling `.k-select` trigger and render options as list items. Hidden backing inputs have `display:none`; use the visible text inputs for selection. The three language inputs reuse the same ID `hidlanguagechk`, so selectors by that ID are ambiguous; use the verified `name` selectors instead.

Buttons and messages:

| Element | Verified selector / state | Purpose or result |
| --- | --- | --- |
| Save | `dialog.getByRole('button', { name: 'Save', exact: true })`; visible and enabled | Employee Information save action; not clicked in this inspection |
| Close | `dialog.getByRole('button', { name: 'close' })` | Closes the modal |
| Success alert | `getByText('Data Saved Successfully!!!')` | Observed after a prior save; not reproduced in this inspection |
| Prerequisite message | `getByText('Please Register in "Employee Information" section before you continue...')` | Displayed on gated tabs before the first section is saved |

The visible Save button is backed by `#btnAdd` (`input[type="button"]`, value `Save`); a hidden submit input `#btnSubmit` is also present. No file input or radio button was found in Employee Information. No duplicate warning or unique-field rule was safely verified.

## Registration lists and other sections

Top-level Registration links, in order: `Uncompleted Employee` (`#tabstrip-1`), `All Employee` (`#tabstrip-2`), `Assign Employee To IClock` (`#tabstrip-3`), `Guard Training` (`#tabstrip-4`), `Company Registration` (`#tabstrip-5`).

| View | Status | Verified controls and behavior |
| --- | --- | --- |
| Uncompleted Employee | VERIFIED | Grid `#EmployeeGrid`; columns Action, #, Employee No, Alternate Emp No, Employee Name, Gender, Date Of Join, Department, Position, Payrule, Identity Card Number, Shift, Branch, Employee Group. No grid search input observed. Items-per-page shows 2000; first/previous/next/last controls were disabled when the grid was empty; Refresh link present. |
| All Employee - Active Employee | VERIFIED | Same `#EmployeeGrid` columns; active employee rows loaded. Nested status tabs: Active Employee, Terminated Employee, Resigned Employee, Leave Without Notice. |
| All Employee - Terminated Employee | VERIFIED | Grid `#EmployeeTerminationGrid`; adds Date Of Birth and Terminated Date columns; 668 rows observed. |
| All Employee - Resigned Employee | VERIFIED | Grid `#EmployeeResignedGrid`; adds Date Of Birth and Resigned Date columns; 3069 rows observed. |
| All Employee - Leave Without Notice | VERIFIED | Grid `#EmployeeLeaveWithoutNoticeGrid`; includes Date, and two Action columns; row actions include View Details and Re-Join; 500 rows observed. |
| Assign Employee To IClock - IClock Not Register Employees | VERIFIED | Notice says only employees not transferred to IClock are shown. Select-all checkbox `#chk_all`, per-row checkboxes, and `#btntrnsfremployee` (`Transfer To IClock Application`) are present. No checkbox or transfer action was activated. |
| Assign Employee To IClock - IClock Login | VERIFIED | Only visible action `#btnAddBioInfo` with value `IClock Login`; no grid. Button was not activated; its effect is unverified. |
| Guard Training | FAILED - APPLICATION ERROR | Single Guard Training / Multiple Guard Training tabs, Add New, and `#GuardTrainingGrid` headers (#, Guard No, Guard Name, Training, Training From, Training To, Training Expiry, Action, Action) appeared. Grid showed no items; `/Registration/GuardTraining_Read` returned HTTP 500 on the initial attempt and its one retry. Add New was not activated. |
| Company Registration | FAILED - APPLICATION ERROR | Company Info, Add New Company, Export to Excel, and `#CompanyGrid` loaded with 2 rows. Columns: #, Company Name, Registration No, Company Address, Company Tax No, Employer Tax No, Company EPF No, Company SOCSO No, Organisation Con, Phn No, Action. Row actions include Edit, Add Bank Details, Add HR Details. A JavaScript `TypeError: Cannot read properties of undefined (reading 'dataSource')` at `LineItems_Databound` occurred on the initial attempt and again on the one retry; the grid still rendered. No action was activated. |

## Errors, validation, and blocked areas

- All Employee initially rendered `System.NullReferenceException` in `Views/Registration/AllEmployeeIndex.cshtml` at line 16 (`UserMenuList.ContainsKey("EMP")`). Its single retry loaded the Active Employee view successfully.
- Guard Training's `GuardTraining_Read` request returned HTTP 500 twice. Marked `FAILED - APPLICATION ERROR` after the required retry.
- Company Registration logged the `LineItems_Databound` TypeError twice. Its grid rendered, but the JavaScript error remains `FAILED - APPLICATION ERROR` after the required retry.
- Login and logout completed successfully. The browser displayed a Google Maps loading warning and an autocomplete advisory; neither blocked the workflow.
- Save-time mandatory validation, save persistence across all tabs, duplicate detection, the unique duplicate field, and the duplicate message are `BLOCKED` or `UNVERIFIED`. They require saving employee data, which this inspection was not authorized to do.
- The prior arbitrary employee `5200` was not found in the visible grids. No attempt was made to alter or delete it.

## Implementation boundary

The generated POM and runnable tests cover only the verified login, Registration navigation, Employee Details dialog, Employee Information controls, and the pre-save tab gate. Save-dependent tabs and duplicate rejection remain TODO; no fields or selectors are fabricated for them.