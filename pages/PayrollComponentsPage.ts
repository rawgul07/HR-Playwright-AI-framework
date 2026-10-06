import { expect, type Locator, type Page } from '@playwright/test';

const LEGACY_KENDO_TIMEOUT = 60_000;

export class PayrollComponentsPage {
  readonly heading: Locator;
  readonly componentTypeInput: Locator;
  readonly componentNameInput: Locator;
  readonly componentDateInput: Locator;
  readonly currencyInput: Locator;
  readonly amountInput: Locator;
  readonly descriptionInput: Locator;
  readonly viewEmployeesButton: Locator;
  readonly saveButton: Locator;
  readonly employeeGrid: Locator;
  readonly successMessage: Locator;
  readonly successAlertOkButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Payroll Components', exact: true });
    this.componentTypeInput = page.locator('input[name="PayrollComponentType_input"]');
    this.componentNameInput = page.locator('input[name="PayrollComponentId_input"]');
    this.componentDateInput = page.locator('#hdnADDate');
    this.currencyInput = page.locator('input[name="CurrencyTypeId_input"]');
    this.amountInput = page.locator('#Amount');
    this.descriptionInput = page.locator('#txtDpn');
    this.viewEmployeesButton = page.getByRole('button', {
      name: 'View Employees',
      exact: true,
    });
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    this.employeeGrid = page.locator('#EmployeeGrid');
    this.successMessage = page.getByRole('dialog', { name: 'Alert', exact: true })
      .getByText('Data Saved Successfully!!!', { exact: true });
    this.successAlertOkButton = page.getByRole('dialog', { name: 'Alert', exact: true })
      .getByRole('button', { name: 'OK', exact: true });
  }

  async addAllowanceForEmployee(
    employeeName: string,
    componentName: string,
    amount: string,
  ): Promise<void> {
    await this.selectCombo(this.componentTypeInput, 'Allowance');
    await this.componentNameInput.fill(componentName);
    await this.componentNameInput.press('Tab');
    await expect(this.componentNameInput).toHaveValue(componentName, {
      timeout: LEGACY_KENDO_TIMEOUT,
    });
    await this.amountInput.fill(amount);
    await this.descriptionInput.fill(componentName);
    await this.viewEmployeesButton.click();

    const employeeRow = this.employeeGrid.getByRole('row').filter({
      hasText: employeeName,
    });
    await employeeRow.waitFor({ state: 'visible', timeout: LEGACY_KENDO_TIMEOUT });
    const employeeCheckbox = employeeRow.getByRole('checkbox');
    if (!(await employeeCheckbox.isChecked())) {
      await employeeCheckbox.click();
      await expect(employeeCheckbox).toBeChecked({ timeout: LEGACY_KENDO_TIMEOUT });
    }
    await this.saveButton.click();
    await expect(this.successMessage).toBeVisible({ timeout: LEGACY_KENDO_TIMEOUT });
    await this.successAlertOkButton.click();
    await expect(this.successMessage).toBeHidden({ timeout: LEGACY_KENDO_TIMEOUT });
  }

  private async selectCombo(input: Locator, value: string): Promise<void> {
    await input.locator('xpath=..').locator('.k-select').click();
    await input.press('ArrowDown');
    const popup = this.page.locator('.k-animation-container:visible').last();
    const option = popup.getByText(value, { exact: true });
    try {
      await option.waitFor({ state: 'visible', timeout: LEGACY_KENDO_TIMEOUT });
      await option.click();
      await popup.waitFor({ state: 'hidden', timeout: LEGACY_KENDO_TIMEOUT });
    } catch (error) {
      if (!(error instanceof Error && error.name === 'TimeoutError')) {
        throw error;
      }

      await input.fill('');
      await input.pressSequentially(value);
      await input.press('Tab');
    }
    await expect.poll(async () => (await input.inputValue()).trim(), {
      timeout: LEGACY_KENDO_TIMEOUT,
    }).toBe(value.trim());
  }
}
