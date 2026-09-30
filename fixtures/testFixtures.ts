import { expect, test as base } from '@playwright/test';
import { EmployeeInformationPage } from '../pages/EmployeeInformationPage';
import { EmployeeRegistrationDialog } from '../pages/EmployeeRegistrationDialog';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';

type RegistrationFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  registrationPage: RegistrationPage;
  employeeRegistrationDialog: EmployeeRegistrationDialog;
  employeeInformationPage: EmployeeInformationPage;
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
});

export { expect };