import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

const LEGACY_KENDO_TIMEOUT = 30_000;

export class HolidaySetupPage {
  readonly heading: Locator;
  readonly advanceHolidayTab: Locator;
  readonly publicHolidayProfile: Locator;
  readonly holidayDateInput: Locator;
  readonly descriptionInput: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;
  readonly successAlertOkButton: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { name: 'Holiday Setup', exact: true });
    this.advanceHolidayTab = page.getByRole('link', {
      name: 'Advance Holiday Setup',
      exact: true,
    });
    this.publicHolidayProfile = page.locator('#divholidayinput input[name="chk_1018"]');
    this.holidayDateInput = page.locator('#hidholidaydate');
    this.descriptionInput = page.locator('#Description');
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    this.successMessage = page.getByRole('dialog', { name: 'Alert', exact: true })
      .getByText('Data Saved Successfully', { exact: true });
    this.successAlertOkButton = page.getByRole('dialog', { name: 'Alert', exact: true })
      .getByRole('button', { name: 'OK', exact: true });
  }

  async openAdvanceHolidaySetup(): Promise<void> {
    await this.advanceHolidayTab.click();
    await this.descriptionInput.waitFor({ state: 'visible', timeout: LEGACY_KENDO_TIMEOUT });
  }

  async addHoliday(description: string, date: string): Promise<void> {
    const futureDate = new Date(date);
    if (Number.isNaN(futureDate.getTime()) || futureDate.getTime() <= Date.now()) {
      throw new Error(`Holiday date must be a valid future date. Received: ${date}`);
    }

    await this.publicHolidayProfile.check();
    await this.holidayDateInput.fill(date);
    await this.descriptionInput.fill(description);
    await this.saveButton.click();
    await expect(this.successMessage).toBeVisible({ timeout: LEGACY_KENDO_TIMEOUT });
    await this.successAlertOkButton.click();
    await expect(this.successMessage).toBeHidden({ timeout: LEGACY_KENDO_TIMEOUT });
  }
}
