import { expect, test as base } from '@playwright/test';
import { EmployeeInformationPage } from '../pages/EmployeeInformationPage';
import { EmployeeRegistrationDialog } from '../pages/EmployeeRegistrationDialog';
import { HolidaySetupPage } from '../pages/HolidaySetupPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { PayrollComponentsPage } from '../pages/PayrollComponentsPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { ReportPage } from '../pages/ReportPage';
import { RunPayrollPage } from '../pages/RunPayrollPage';

type RegistrationFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  registrationPage: RegistrationPage;
  employeeRegistrationDialog: EmployeeRegistrationDialog;
  employeeInformationPage: EmployeeInformationPage;
  holidaySetupPage: HolidaySetupPage;
  payrollComponentsPage: PayrollComponentsPage;
  runPayrollPage: RunPayrollPage;
  reportPage: ReportPage;
};

export const test = base.extend<RegistrationFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  employeeRegistrationDialog: async ({ page }, use) => {
    await use(new EmployeeRegistrationDialog(page));
  },
  employeeInformationPage: async ({ page }, use) => {
    await use(new EmployeeInformationPage(page));
  },
  holidaySetupPage: async ({ page }, use) => {
    await use(new HolidaySetupPage(page));
  },
  payrollComponentsPage: async ({ page }, use) => {
    await use(new PayrollComponentsPage(page));
  },
  runPayrollPage: async ({ page }, use) => {
    await use(new RunPayrollPage(page));
  },
  reportPage: async ({ page }, use) => {
    await use(new ReportPage(page));
  },
});

export { expect };