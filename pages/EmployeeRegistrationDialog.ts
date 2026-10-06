import { expect, type Locator, type Page } from '@playwright/test';

const UI_TRANSITION_TIMEOUT = 10_000;
const DROPDOWN_OPTION_TIMEOUT = 15_000;

export const employeeRegistrationTabs = [
  'Employee Information',
  'Payroll Information',
  'Official Information',
  'Passport Information',
  'Contact Information',
  'Family Information',
  'Qualification Information',
  'Reference Information',
  'Experience Information',
  'Relieve Information',
  'Employee Components',
  'Other Information',
] as const;

export type EmployeeRegistrationTab = (typeof employeeRegistrationTabs)[number];

export interface PayrollInformationData {
  experienceMonths: string;
  payrule: string;
  basicSalary: string;
  salaryDay: string;
  componentGroup: string;
  payType: string;
  noBankAccount: boolean;
  providentFundNo: string;
  probationMonths: string;
}

export interface OfficialInformationData {
  identityCardNumber: string;
  branch: string;
  staffCategory?: string;
  department: string;
  position: string;
  shift: string;
  attendanceDeviceType: string;
  leaveGroup: string;
  iclockPrivilege: string;
  holidayProfile: string;
  employeeGroup: string;
  team: string;
  zone: string;
}

export interface PassportInformationData {
  passportNumber: string;
  expiryDate: string;
  approvedBy: string;
}

export interface ContactInformationData {
  contactNumber: string;
  address: string;
  country: string;
  region: string;
  state: string;
  city: string;
  postalCode: string;
}

export interface FamilyInformationData {
  maritalStatus: 'Single' | 'Married';
}

export interface ExperienceInformationData {
  company: string;
  position: string;
  salary: string;
  fromDate: string;
  toDate: string;
  resignedReason: string;
  effectiveFrom: string;
}

export interface OtherInformationData {
  height: string;
  weight: string;
}

export class EmployeeRegistrationDialog {
  readonly dialog: Locator;
  readonly closeButton: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;
  readonly successAlertOkButton: Locator;
  readonly blockedMessage: Locator;
  readonly payrollJoinedDateLabel: Locator;
  readonly tabs: Record<EmployeeRegistrationTab, Locator>;
  readonly payrollFields: Record<string, Locator>;
  readonly officialFields: Record<string, Locator>;
  readonly passportFields: Record<string, Locator>;
  readonly contactAddNewLink: Locator;
  readonly experienceGrid: Locator;
  readonly otherFields: Record<string, Locator>;
  readonly otherSuccessMessage: Locator;

  constructor(private readonly page: Page) {
    this.dialog = page.getByRole('dialog', { name: 'Employee Details', exact: true });
    this.closeButton = this.dialog.getByRole('button', { name: 'close', exact: true });
    this.saveButton = this.dialog.getByRole('button', { name: 'Save', exact: true });
    this.successMessage = page.getByRole('dialog', { name: 'Alert', exact: true })
      .getByText('Data Saved Successfully!!!', { exact: true });
    this.successAlertOkButton = page.getByRole('dialog', { name: 'Alert', exact: true })
      .getByRole('button', { name: 'OK', exact: true });
    this.blockedMessage = page.getByText(
      'Please Register in "Employee Information" section before you continue...',
      { exact: false },
    );
    this.payrollJoinedDateLabel = page.getByText('Joined Date*', { exact: true });
    this.payrollFields = {
      experienceMonths: page.locator('#Experience'),
      payrule: page.locator('input[name="PayRuleId_input"]'),
      basicSalary: page.locator('#BasicSalary'),
      salaryDay: page.locator('#SalaryDay'),
      componentGroup: page.locator('input[name="EmployeeAllowanceGroup_input"]'),
      payType: page.locator('input[name="PayTypeId_input"]'),
      noBankAccount: page.locator('#IsNoBankAccount'),
      providentFundNo: page.locator('#ProvidentFundNo'),
      probationMonths: page.locator('#IsPassedProbation'),
    };
    this.officialFields = {
      identityCardNumber: page.locator('#IdentityCardNumber'),
      branch: page.locator('input[name="BranchId_input"]'),
      staffCategory: page.locator('input[name="StaffCategoryId_input"]'),
      department: page.locator('input[name="DepartmentId_input"]'),
      position: page.locator('input[name="PositionId_input"]'),
      shift: page.locator('input[name="ShiftId_input"]'),
      attendanceDeviceType: page.locator('input[name="AttendanceDeviceTypeId_input"]'),
      leaveGroup: page.locator('input[name="LeaveGroupId_input"]'),
      iclockPrivilege: page.locator('input[name="BioPrivilageId_input"]'),
      holidayProfile: page.locator('input[name="HolidayProfileId_input"]'),
      employeeGroup: page.locator('input[name="GroupId_input"]'),
      team: page.locator('input[name="TeamId_input"]'),
      zone: page.locator('input[name="ZoneId_input"]'),
    };
    this.passportFields = {
      number: page.locator('#PassportNo'),
      expiryDate: page.locator('#hdnpassExpiry'),
      approvedBy: page.locator('#ApprovedById'),
    };
    this.contactAddNewLink = page.getByRole('link', { name: 'Add New Contact', exact: true });
    this.experienceGrid = page.locator('#ExperienceInfoGrid');
    this.otherFields = {
      height: page.locator('#Height'),
      weight: page.locator('#Weight'),
    };
    this.otherSuccessMessage = page.getByRole('dialog', { name: 'Alert', exact: true })
      .getByText('Data Saved Sucessfully', { exact: true });
    this.tabs = {
      'Employee Information': this.dialog.getByRole('link', { name: 'Employee Information', exact: true }),
      'Payroll Information': this.dialog.getByRole('link', { name: 'Payroll Information', exact: true }),
      'Official Information': this.dialog.getByRole('link', { name: 'Official Information', exact: true }),
      'Passport Information': this.dialog.getByRole('link', { name: 'Passport Information', exact: true }),
      'Contact Information': this.dialog.getByRole('link', { name: 'Contact Information', exact: true }),
      'Family Information': this.dialog.getByRole('link', { name: 'Family Information', exact: true }),
      'Qualification Information': this.dialog.getByRole('link', { name: 'Qualification Information', exact: true }),
      'Reference Information': this.dialog.getByRole('link', { name: 'Reference Information', exact: true }),
      'Experience Information': this.dialog.getByRole('link', { name: 'Experience Information', exact: true }),
      'Relieve Information': this.dialog.getByRole('link', { name: 'Relieve Information', exact: true }),
      'Employee Components': this.dialog.getByRole('link', { name: 'Employee Components', exact: true }),
      'Other Information': this.dialog.getByRole('link', { name: 'Other Information', exact: true }),
    };
  }

  async openTab(tab: EmployeeRegistrationTab): Promise<void> {
    await this.tabs[tab].click({ timeout: UI_TRANSITION_TIMEOUT });
    const tabIndex = employeeRegistrationTabs.indexOf(tab) + 1;
    await Promise.any([
      this.page.locator(`#clienttabstrip-${tabIndex}`).waitFor({
        state: 'visible',
        timeout: UI_TRANSITION_TIMEOUT,
      }),
      this.blockedMessage.waitFor({ state: 'visible', timeout: UI_TRANSITION_TIMEOUT }),
    ]);
  }

  async save(): Promise<void> {
    await this.saveButton.click({ timeout: UI_TRANSITION_TIMEOUT });
  }

  async fillPayrollInformation(data: PayrollInformationData): Promise<void> {
    await this.payrollFields.experienceMonths.fill(data.experienceMonths);
    await this.payrollFields.basicSalary.fill(data.basicSalary);
    await this.selectCombo(this.payrollFields.payrule, data.payrule);
    await this.selectDropdown(this.payrollFields.salaryDay, data.salaryDay);
    await this.selectCombo(this.payrollFields.componentGroup, data.componentGroup);
    await this.selectCombo(this.payrollFields.payType, data.payType);
    if (await this.payrollFields.noBankAccount.isVisible()) {
      if (data.noBankAccount) {
        await this.payrollFields.noBankAccount.check();
      } else {
        await this.payrollFields.noBankAccount.uncheck();
      }
    }
    await this.payrollFields.providentFundNo.fill(data.providentFundNo);
    await this.selectDropdown(this.payrollFields.probationMonths, data.probationMonths);
  }

  async fillOfficialInformation(data: OfficialInformationData): Promise<void> {
    await this.officialFields.identityCardNumber.fill(data.identityCardNumber);
    await this.selectCombo(this.officialFields.branch, data.branch);
    if (data.staffCategory) {
      await this.selectCombo(this.officialFields.staffCategory, data.staffCategory);
    }
    await this.selectCombo(this.officialFields.department, data.department);
    await this.selectCombo(this.officialFields.position, data.position);
    await this.selectCombo(this.officialFields.shift, data.shift);
    await this.selectCombo(this.officialFields.attendanceDeviceType, data.attendanceDeviceType);
    await this.selectCombo(this.officialFields.leaveGroup, data.leaveGroup);
    await this.selectCombo(this.officialFields.iclockPrivilege, data.iclockPrivilege);
    await this.selectCombo(this.officialFields.holidayProfile, data.holidayProfile);
    await this.selectCombo(this.officialFields.employeeGroup, data.employeeGroup);
    await this.selectCombo(this.officialFields.team, data.team);
    await this.selectCombo(this.officialFields.zone, data.zone);
  }

  async fillRequiredOfficialInformation(
    branch: string,
    identityCardNumber: string,
    staffCategory: string,
  ): Promise<void> {
    await this.officialFields.identityCardNumber.fill(identityCardNumber);
    await this.selectCombo(this.officialFields.branch, branch);
    await this.selectCombo(this.officialFields.staffCategory, staffCategory);
    await this.officialFields.department.fill('');
    await this.officialFields.department.pressSequentially('Indirect-PP');
    await this.officialFields.department.press('Tab');
    await expect.poll(async () => (await this.officialFields.department.inputValue()).trim(), {
      timeout: DROPDOWN_OPTION_TIMEOUT,
    }).toBe('Indirect-PP');

    const observedValues: Array<[string, Locator, string]> = [
      ['Position', this.officialFields.position],
      ['Shift', this.officialFields.shift],
      ['Attendance Device Type', this.officialFields.attendanceDeviceType],
      ['Leave Group', this.officialFields.leaveGroup],
      ['Transfer To IClock App [Bio Metric]', this.officialFields.iclockPrivilege],
      ['Holiday Profile', this.officialFields.holidayProfile],
      ['Employee Group', this.officialFields.employeeGroup],
      ['Team', this.officialFields.team],
      ['Zone', this.officialFields.zone],
    ];

    for (const [fieldName, input] of observedValues) {
      await this.selectFirstComboOption(input, fieldName);
    }
  }

  async fillPassportInformation(data: PassportInformationData): Promise<void> {
    await this.passportFields.number.fill(data.passportNumber);
    await this.passportFields.expiryDate.fill(data.expiryDate);
    await this.selectDropdown(this.passportFields.approvedBy, data.approvedBy);
  }

  async addContact(data: ContactInformationData): Promise<void> {
    await this.contactAddNewLink.click({ timeout: UI_TRANSITION_TIMEOUT });
    const contactDialog = this.page.getByRole('dialog', { name: 'Employee Contact Details', exact: true });
    await contactDialog.waitFor({ state: 'visible', timeout: UI_TRANSITION_TIMEOUT });
    await contactDialog.locator('#ContactNo').fill(data.contactNumber);
    await contactDialog.locator('#Address').fill(data.address);
    await contactDialog.locator('#PostalCode').fill(data.postalCode);
    await this.selectCombo(contactDialog.locator('input[name="CountryId_input"]'), data.country);
    await this.selectCombo(contactDialog.locator('input[name="RegionId_input"]'), data.region);
    await this.selectCombo(contactDialog.locator('input[name="StateId_input"]'), data.state);
    await this.selectCombo(contactDialog.locator('input[name="CityId_input"]'), data.city);
    await contactDialog.getByRole('button', { name: 'Save', exact: true }).click();
  }

  async fillFamilyInformation(data: FamilyInformationData): Promise<void> {
    await this.selectCombo(this.page.locator('input[name="MaritalStatus_input"]'), data.maritalStatus);
  }

  async addExperience(data: ExperienceInformationData): Promise<void> {
    await this.experienceGrid.getByRole('link', { name: 'Add new item', exact: true })
      .click({ timeout: UI_TRANSITION_TIMEOUT });
    await this.page.locator('#CompanyName').waitFor({ state: 'visible', timeout: UI_TRANSITION_TIMEOUT });
    await this.selectDropdown(this.page.locator('#PositionId'), data.position);
    await this.page.locator('#CompanyName').fill(data.company);
    await this.page.locator('#Salary').fill(data.salary);
    await this.page.locator('#FromDate').fill(data.fromDate);
    await this.page.locator('#ToDate').fill(data.toDate);
    await this.page.locator('#ResignedReason').fill(data.resignedReason);
    await this.page.locator('#EffectiveFrom').fill(data.effectiveFrom);
    await this.experienceGrid.getByRole('link', { name: 'Update', exact: true }).click();
  }

  async fillOtherInformation(data: OtherInformationData): Promise<void> {
    await this.otherFields.height.fill(data.height);
    await this.otherFields.weight.fill(data.weight);
  }

  async dismissSuccessAlert(): Promise<void> {
    await this.successAlertOkButton.click({ timeout: UI_TRANSITION_TIMEOUT });
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  private async selectCombo(input: Locator, value: string, fieldName = 'Dropdown'): Promise<void> {
    await expect(input).toBeEnabled({ timeout: DROPDOWN_OPTION_TIMEOUT });
    await input.locator('xpath=..').locator('.k-select').click();
    await input.press('ArrowDown');
    const popup = this.page.locator('.k-animation-container:visible').last();
    const option = popup.getByText(value, { exact: true });
    try {
      await option.waitFor({ state: 'visible', timeout: DROPDOWN_OPTION_TIMEOUT });
      await option.scrollIntoViewIfNeeded({ timeout: DROPDOWN_OPTION_TIMEOUT });
      await option.click({ force: true, timeout: DROPDOWN_OPTION_TIMEOUT });
      await popup.waitFor({ state: 'hidden', timeout: DROPDOWN_OPTION_TIMEOUT });
    } catch (error) {
      if (!(error instanceof Error && error.name === 'TimeoutError')) {
        throw error;
      }

      await input.fill('');
      await input.pressSequentially(value);
      await input.press('ArrowDown');
      await input.press('Enter');
    }
    try {
      await expect.poll(async () => (await input.inputValue()).trim(), {
        timeout: DROPDOWN_OPTION_TIMEOUT,
      }).toBe(value.trim());
    } catch (error) {
      if (error instanceof Error && error.name === 'TimeoutError') {
        throw new Error(`${fieldName} did not retain the requested value "${value}".`, {
          cause: error,
        });
      }
      throw error;
    }
  }

  private async selectDropdown(input: Locator, value: string): Promise<void> {
    await input.locator('xpath=..').locator('.k-select').click();
    await this.selectVisibleOption(value);
    await expect(input.locator('xpath=..').locator('.k-input'))
      .toHaveText(value, { timeout: UI_TRANSITION_TIMEOUT });
  }

  private async selectVisibleOption(value: string): Promise<void> {
    const popup = this.page.locator('.k-animation-container:visible').last();
    await expect(popup).toBeVisible({ timeout: DROPDOWN_OPTION_TIMEOUT });
    await expect.poll(async () => (await popup.locator('.k-item').allInnerTexts())
      .map((text) => text.trim()), {
      timeout: DROPDOWN_OPTION_TIMEOUT,
    }).toContain(value.trim());
    const availableOptions = (await popup.locator('.k-item').allInnerTexts())
      .map((text) => text.trim());
    const matchingOption = availableOptions.find(
      (text) => text.localeCompare(value.trim(), undefined, { sensitivity: 'accent' }) === 0,
    );
    if (!matchingOption) {
      throw new Error(`The open dropdown did not expose the requested option "${value}".`);
    }

    const liveOption = popup.getByText(matchingOption, { exact: true });
    await liveOption.waitFor({ state: 'visible', timeout: UI_TRANSITION_TIMEOUT });
    await liveOption.scrollIntoViewIfNeeded({ timeout: UI_TRANSITION_TIMEOUT });
    await liveOption.click({ force: true, timeout: UI_TRANSITION_TIMEOUT });
    await popup.waitFor({ state: 'hidden', timeout: DROPDOWN_OPTION_TIMEOUT });
  }

  private async selectFirstComboOption(input: Locator, fieldName: string): Promise<void> {
    await input.locator('xpath=..').locator('.k-select').click();
    await input.press('ArrowDown');
    const popup = this.page.locator('.k-animation-container:visible').last();
    await expect(popup).toBeVisible({ timeout: DROPDOWN_OPTION_TIMEOUT });
    await expect.poll(() => popup.locator('.k-item').count(), {
      timeout: DROPDOWN_OPTION_TIMEOUT,
    }).toBeGreaterThan(0);
    const options = (await popup.locator('.k-item').allInnerTexts())
      .map((value) => value.trim())
      .filter((value) => value && !/^--?\s*select/i.test(value));
    const optionValue = options[0];
    if (!optionValue) {
      throw new Error(`No selectable options are available for ${fieldName}.`);
    }

    const option = popup.getByText(optionValue, { exact: true }).first();
    await option.waitFor({ state: 'visible', timeout: DROPDOWN_OPTION_TIMEOUT });
    await option.scrollIntoViewIfNeeded({ timeout: DROPDOWN_OPTION_TIMEOUT });
    await option.click({ force: true, timeout: DROPDOWN_OPTION_TIMEOUT });
    await popup.waitFor({ state: 'hidden', timeout: DROPDOWN_OPTION_TIMEOUT });
    await expect.poll(async () => (await input.inputValue()).trim(), {
      timeout: DROPDOWN_OPTION_TIMEOUT,
    }).toBe(optionValue);
  }

}