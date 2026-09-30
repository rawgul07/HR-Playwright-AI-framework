import { config } from 'dotenv';
import { readFileSync } from 'node:fs';
import { expect, test } from '../../fixtures/testFixtures';
import type { EmployeeInformationData } from '../../pages/EmployeeInformationPage';
import {
  employeeRegistrationTabs,
  type ContactInformationData,
  type ExperienceInformationData,
  type FamilyInformationData,
  type OfficialInformationData,
  type OtherInformationData,
  type PassportInformationData,
  type PayrollInformationData,
} from '../../pages/EmployeeRegistrationDialog';

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

test.describe('Employee Registration - verified safe flow', () => {
  test.beforeEach(async ({ loginPage, homePage }) => {
    await loginPage.navigate(requiredEnvironmentValue('BASE_URL'));
    await expect(loginPage.heading).toBeVisible();
    await loginPage.login(
      requiredEnvironmentValue('USERNAME'),
      requiredEnvironmentValue('PASSWORD'),
    );
    await expect(homePage.registrationLink).toBeVisible();
  });

  test('creates a synthetic employee through verified safe tabs @web @e2e @regression', async ({
    page,
    homePage,
    registrationPage,
    employeeRegistrationDialog: dialog,
    employeeInformationPage,
  }) => {
    test.setTimeout(90_000);
    const runId = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
    const employee: EmployeeInformationData = {
      title: 'Mr',
      firstName: `Automation${runId}`,
      lastName: 'RegistrationTest',
      gender: 'Male',
      dateOfBirth: '01/01/1990',
      religion: 'UnKnown',
      nationality: 'Malaysia',
      race: 'UnKnown',
      languages: ['English'],
      recruitmentType: 'Radio',
    };
    const payroll: PayrollInformationData = {
      experienceMonths: '0',
      payrule: 'OFFICE',
      basicSalary: '1000.00',
      salaryDay: 'End Of Month',
      componentGroup: 'None',
      payType: 'Cash',
      noBankAccount: true,
      providentFundNo: runId.slice(-12),
      probationMonths: '0',
    };
    const official: OfficialInformationData = {
      identityCardNumber: runId.slice(-12),
      branch: 'Petaling Jaya',
      staffCategory: 'Direct',
      department: 'Administration',
      position: 'Admin Executive',
      shift: 'Shift Office Staff',
      attendanceDeviceType: 'Log Tracker',
      leaveGroup: 'Office',
      iclockPrivilege: 'No',
      holidayProfile: 'Selangor',
      employeeGroup: '1',
      team: 'None',
      zone: 'None',
    };
    const passport: PassportInformationData = {
      passportNumber: `AUTO-${runId}`,
      expiryDate: '09/30/2031',
      approvedBy: 'superuser',
    };
    const contact: ContactInformationData = {
      contactNumber: `000${runId.slice(-7)}`,
      address: `Automation Test Address ${runId}`,
      country: 'Malaysia',
      region: 'Central Region',
      state: 'Selangor',
      city: 'Petaling Jaya',
      postalCode: '00000',
    };
    const family: FamilyInformationData = { maritalStatus: 'Single' };
    const experience: ExperienceInformationData = {
      company: `Automation QA ${runId}`,
      position: 'Admin Executive',
      salary: '1000',
      fromDate: '01/01/2020',
      toDate: '12/31/2024',
      resignedReason: 'End of synthetic test contract',
      effectiveFrom: '09/30/2026',
    };
    const other: OtherInformationData = { height: '170', weight: '70' };

    await test.step('Navigate to Registration', async () => {
      await homePage.openRegistration();
      await expect(registrationPage.heading).toBeVisible();
    });

    await test.step('Create the employee and verify first-tab save unlocks Payroll', async () => {
      await registrationPage.openAddNewEmployee();
      await expect(dialog.dialog).toBeVisible();
      await employeeInformationPage.fill(employee);
      await dialog.save();
      await expect(dialog.successMessage).toBeVisible({ timeout: 15_000 });
      await dialog.dismissSuccessAlert();
      await dialog.openTab('Payroll Information');
      await expect(dialog.payrollJoinedDateLabel).toBeVisible();
      await expect(dialog.blockedMessage).toBeHidden();
    });

    await test.step('Save Payroll Information', async () => {
      await dialog.fillPayrollInformation(payroll);
      await dialog.save();
      await expect(dialog.successMessage).toBeVisible({ timeout: 15_000 });
      await dialog.dismissSuccessAlert();
    });

    await test.step('Save Official Information', async () => {
      await dialog.openTab('Official Information');
      await dialog.fillOfficialInformation(official);
      await dialog.save();
      await expect(dialog.successMessage).toBeVisible({ timeout: 15_000 });
      await dialog.dismissSuccessAlert();
    });

    await test.step('Save Passport Information', async () => {
      await dialog.openTab('Passport Information');
      await dialog.fillPassportInformation(passport);
      await dialog.save();
      await expect(dialog.successMessage).toBeVisible({ timeout: 15_000 });
      await dialog.dismissSuccessAlert();
    });

    await test.step('Add verified Contact Information', async () => {
      await dialog.openTab('Contact Information');
      await dialog.addContact(contact);
      await expect(dialog.successMessage).toBeVisible({ timeout: 15_000 });
      await dialog.dismissSuccessAlert();
    });

    await test.step('Save Family Information', async () => {
      await dialog.openTab('Family Information');
      await dialog.fillFamilyInformation(family);
      await dialog.save();
      await expect(dialog.successMessage).toBeVisible();
      await dialog.dismissSuccessAlert();
    });

    await test.step('Add verified Experience Information', async () => {
      await dialog.openTab('Experience Information');
      await dialog.addExperience(experience);
      await expect(dialog.experienceGrid.getByText(experience.company, { exact: true }))
        .toBeVisible({ timeout: 15_000 });
    });

    await test.step('Save Other Information without fabricated uploads', async () => {
      await dialog.openTab('Other Information');
      await dialog.fillOtherInformation(other);
      await dialog.save();
      await expect(dialog.otherSuccessMessage).toBeVisible({ timeout: 15_000 });
      await dialog.dismissSuccessAlert();
    });

    await test.step('Verify the employee appears once in All Employee', async () => {
      await dialog.close();
      await registrationPage.openSection('All Employee');
      await expect(registrationPage.employeeRow(employee.firstName)).toHaveCount(1, { timeout: 15_000 });
    });
  });

  test('opens the employee details dialog and exposes verified Employee Information controls @web @e2e @regression', async ({
    page,
    homePage,
    registrationPage,
    employeeRegistrationDialog: dialog,
    employeeInformationPage,
  }) => {
    await test.step('Navigate to Registration', async () => {
      await homePage.openRegistration();
      await expect(registrationPage.heading).toBeVisible();
      await expect(page).toHaveURL(/\/Registration$/);
    });

    await test.step('Open Add New Employee without saving', async () => {
      await registrationPage.openAddNewEmployee();
      await expect(dialog.dialog).toBeVisible();
      await expect(dialog.tabs['Employee Information']).toBeVisible();
      await expect(dialog.saveButton).toBeEnabled();
    });

    await test.step('Verify visible controls and required metadata', async () => {
      await expect(employeeInformationPage.firstNameInput).toBeVisible();
      await expect(employeeInformationPage.firstNameInput).toHaveAttribute(
        'data-val-required',
        'The First Name* field is required.',
      );
      await expect(employeeInformationPage.lastNameInput).toBeVisible();
      await expect(employeeInformationPage.dateOfBirthInput).toHaveValue(/^\d{2}\/\d{2}\/\d{4}$/);
      await expect(employeeInformationPage.languageCheckboxes.English).not.toBeChecked();
      await expect(employeeInformationPage.languageCheckboxes.Khmer).not.toBeChecked();
      await expect(employeeInformationPage.languageCheckboxes.Malay).not.toBeChecked();

      for (const tab of employeeRegistrationTabs) {
        await expect(dialog.tabs[tab]).toBeVisible();
      }
    });

    await dialog.close();
  });

  test('shows the verified prerequisite when another form tab is opened before saving @web @e2e @regression', async ({
    homePage,
    registrationPage,
    employeeRegistrationDialog: dialog,
  }) => {
    await homePage.openRegistration();
    await registrationPage.openAddNewEmployee();
    await expect(dialog.dialog).toBeVisible();

    await dialog.openTab('Payroll Information');
    await expect(dialog.blockedMessage).toBeVisible();

    await dialog.close();
  });

  test('logs out and returns to the login page @web @regression', async ({ page, homePage, loginPage }) => {
    await homePage.logout();
    await expect(loginPage.heading).toBeVisible();
    await expect(page).toHaveURL(/\/Account\/Login$/);
  });

  test.fixme('TODO: complete save-dependent tabs after resolving Qualification University, EmployeeEmail, Reference validation, Relieve status, and compensation-component safety blockers @web @e2e @regression', async () => {});
  test.fixme('TODO: verify duplicate rejection after the application’s actual unique employee field and message are confirmed @web @e2e @regression', async () => {});
  test.fixme('TODO: verify runtime mandatory-field and date validation without creating a business record @web @regression', async () => {});
});