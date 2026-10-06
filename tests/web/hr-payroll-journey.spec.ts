import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { config } from 'dotenv';
import { expect, test } from '../../fixtures/testFixtures';
import type { EmployeeInformationData } from '../../pages/EmployeeInformationPage';
import type { PayrollInformationData } from '../../pages/EmployeeRegistrationDialog';

config({ override: true });

if (!process.env.PASSWORD) {
  const passwordEntry = readFileSync('.env', 'utf8')
    .split(/\r?\n/)
    .find((line) => line.startsWith('PASSWORD='));

  if (passwordEntry) {
    process.env.PASSWORD = passwordEntry.slice('PASSWORD='.length);
  }
}

function requiredEnvironmentValue(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

test('employee registration to payroll and reporting journey @master @regression @e2e @web', async ({
  page,
  loginPage,
  homePage,
  registrationPage,
  employeeRegistrationDialog: employeeDialog,
  employeeInformationPage,
  holidaySetupPage,
  payrollComponentsPage,
  runPayrollPage,
  reportPage,
}) => {
  test.setTimeout(600_000);

  const runId = randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase();
  const branch = 'Phnom Penh';
  const employee: EmployeeInformationData = {
    title: 'Mr',
    firstName: `E2E${runId}`,
    lastName: 'PayrollJourney',
    gender: 'Male',
    alternateEmployeeId: `AUTO${runId}`,
    dateOfBirth: '01/01/1990',
    religion: 'Buddhist',
    nationality: 'Cambodian',
    race: 'Khmer',
    languages: ['English'],
  };
  const payroll: PayrollInformationData = {
    experienceMonths: '0',
    payrule: 'Office Staff',
    basicSalary: '1800.00',
    salaryDay: 'End Of Month',
    componentGroup: 'None',
    payType: 'Cash',
    noBankAccount: true,
    providentFundNo: runId,
    probationMonths: '0',
  };
  const holidayDescription = `E2E Holiday ${runId}`;
  const componentName = 'Lost day';
  const holidayDate = new Date();
  const uniqueFutureDayOffset = Number.parseInt(runId.slice(-4), 16) % 365;
  holidayDate.setDate(holidayDate.getDate() + 365 + uniqueFutureDayOffset);
  const formattedHolidayDate = [
    String(holidayDate.getMonth() + 1).padStart(2, '0'),
    String(holidayDate.getDate()).padStart(2, '0'),
    holidayDate.getFullYear(),
  ].join('/');
  const today = new Date();
  const payrollMonth = today.toLocaleString('en-US', { month: 'long' });
  const payrollYear = String(today.getFullYear());

  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') {
      pageErrors.push(message.text());
    }
  });

  await test.step('1) Open the application and authenticate', async () => {
    await loginPage.navigate(requiredEnvironmentValue('BASE_URL'));
    await expect(loginPage.heading).toBeVisible();
    await loginPage.login(
      requiredEnvironmentValue('USERNAME'),
      requiredEnvironmentValue('PASSWORD'),
    );
    await expect(homePage.registrationLink).toBeVisible();
    await expect(homePage.branchInput).toBeVisible();
  });

  await test.step('2) Select an available branch for the employee', async () => {
    await homePage.selectBranch(branch);
    await expect(homePage.branchInput).toHaveValue(branch);
  });

  await test.step('3) Register and verify the unique employee', async () => {
    await homePage.openRegistration();
    await expect(registrationPage.heading).toBeVisible();
    await registrationPage.openAddNewEmployee();
    await expect(employeeDialog.dialog).toBeVisible();

    await employeeInformationPage.fill(employee);
    await employeeDialog.save();
    await expect(employeeDialog.successMessage).toBeVisible();
    await employeeDialog.dismissSuccessAlert();

    await employeeDialog.openTab('Payroll Information');
    await employeeDialog.fillPayrollInformation(payroll);
    await employeeDialog.save();
    await expect(employeeDialog.successMessage).toBeVisible();
    await employeeDialog.dismissSuccessAlert();

    await employeeDialog.openTab('Official Information');
    await employeeDialog.fillRequiredOfficialInformation(
      branch,
      `ID${runId}`,
      'Direct',
    );
    await employeeDialog.save();
    await expect(employeeDialog.successMessage).toBeVisible({ timeout: 60_000 });
    await employeeDialog.dismissSuccessAlert();
    await employeeDialog.close();

    await registrationPage.openSection('All Employee');
    await expect(registrationPage.employeeRow(employee.firstName)).toHaveCount(1, {
      timeout: 60_000,
    });
  });

  await test.step('4) Add and verify a uniquely named holiday', async () => {
    await homePage.openHolidaySetup();
    await expect(holidaySetupPage.heading).toBeVisible();
    await holidaySetupPage.openAdvanceHolidaySetup();
    await holidaySetupPage.addHoliday(holidayDescription, formattedHolidayDate);
  });

  await test.step('5) Add a unique Allowance component for the employee', async () => {
    await homePage.openPayrollComponents();
    await expect(payrollComponentsPage.heading).toBeVisible();
    await payrollComponentsPage.addAllowanceForEmployee(
      employee.firstName,
      componentName,
      '100.00',
    );
    await expect(payrollComponentsPage.employeeGrid.getByText(employee.firstName)).toBeVisible();
  });

  await test.step('6) Run current-period payroll and verify the employee result', async () => {
    await homePage.openRunPayroll();
    await expect(runPayrollPage.heading).toBeVisible();
    await runPayrollPage.selectCurrentPeriod(
      'End Of Month',
      payrollMonth,
      payrollYear,
    );
    await runPayrollPage.loadEmployees(employee.firstName);
    await runPayrollPage.runPayroll();
    await expect(runPayrollPage.employeeRow(employee.firstName)).toBeVisible();
  });

  await test.step('7) Select the employee branch on Report and verify the page', async () => {
    await homePage.openReport();
    await expect(page).toHaveURL(/\/Report$/);
    await expect(reportPage.heading).toBeVisible();
    await reportPage.selectBranch(branch);
    await expect(reportPage.branchInput).toHaveValue(branch);
    await expect(reportPage.errorMessages).toHaveCount(0);
  });

  await test.step('8) Log off and verify the journey completed without browser errors', async () => {
    await homePage.logout();
    await expect(loginPage.heading).toBeVisible();
    expect(pageErrors).toEqual([]);
  });

  console.log(`Completed the employee-to-payroll journey for ${employee.firstName}.`);
});
