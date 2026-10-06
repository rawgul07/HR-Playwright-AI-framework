import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly registrationLink: Locator;
  readonly holidaySetupLink: Locator;
  readonly payrollComponentsLink: Locator;
  readonly runPayrollLink: Locator;
  readonly reportLink: Locator;
  readonly logoutLink: Locator;
  readonly branchInput: Locator;

  constructor(private readonly page: Page) {
    this.registrationLink = page.getByRole('link', { name: 'Registration', exact: true });
    this.holidaySetupLink = page.getByRole('link', { name: 'Holiday Setup', exact: true });
    this.payrollComponentsLink = page.getByRole('link', {
      name: 'Payroll Components',
      exact: true,
    });
    this.runPayrollLink = page.getByRole('link', { name: 'Run Payroll', exact: true });
    this.reportLink = page.getByRole('link', { name: 'Report', exact: true });
    this.logoutLink = page.getByRole('link', { name: 'Log off', exact: true });
    this.branchInput = page.getByRole('textbox', { name: 'Select Branch ...', exact: true });
  }

  async selectBranch(branch: string): Promise<void> {
    await this.branchInput.locator('xpath=following-sibling::span').click();
    const popup = this.page.locator('.k-animation-container:visible').last();
    const option = popup.getByText(branch, { exact: true });
    await option.waitFor({ state: 'visible' });
    await option.click();
    await popup.waitFor({ state: 'hidden' });
    await expect(this.branchInput).toHaveValue(branch);
  }

  async openRegistration(): Promise<void> {
    await this.registrationLink.click();
  }

  async openHolidaySetup(): Promise<void> {
    await this.holidaySetupLink.click();
  }

  async openPayrollComponents(): Promise<void> {
    await this.payrollComponentsLink.click();
  }

  async openRunPayroll(): Promise<void> {
    await this.runPayrollLink.click();
  }

  async openReport(): Promise<void> {
    await this.reportLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}