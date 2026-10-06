import { expect, type Locator, type Page } from '@playwright/test';

const LEGACY_KENDO_TIMEOUT = 60_000;

export class RunPayrollPage {
  readonly heading: Locator;
  readonly payrollDayInput: Locator;
  readonly payrollMonthInput: Locator;
  readonly payrollYearInput: Locator;
  readonly viewEmployeesButton: Locator;
  readonly makePaymentButton: Locator;
  readonly payrollGrid: Locator;
  readonly loadingIndicator: Locator;
  readonly noItemsMessage: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Run Payroll', exact: true });
    this.payrollDayInput = page.locator('input[name="PayrollDay_input"]');
    this.payrollMonthInput = page.locator('input[name="PayrollMonth_input"]');
    this.payrollYearInput = page.locator('input[name="PayrollYear_input"]');
    this.viewEmployeesButton = page.getByRole('button', {
      name: 'View Employee',
      exact: true,
    });
    this.makePaymentButton = page.getByRole('button', { name: 'Make Payment', exact: true });
    this.payrollGrid = page.locator('#divNew .k-grid');
    this.loadingIndicator = page.getByText('Loading...', { exact: true });
    this.noItemsMessage = this.payrollGrid.getByText('No items to display', { exact: true });
  }

  async selectCurrentPeriod(day: string, month: string, year: string): Promise<void> {
    await this.payrollDayInput.fill(day);
    await this.payrollDayInput.press('Enter');
    await this.payrollMonthInput.fill(month);
    await this.payrollMonthInput.press('Enter');
    await this.payrollYearInput.fill(year);
    await this.payrollYearInput.press('Enter');
  }

  async loadEmployees(employeeName: string): Promise<void> {
    const employeeLoad = this.page.waitForResponse(
      (response) => response.url().includes('/PayRollTransaction/EmployeeNewdetails_Read'),
      { timeout: LEGACY_KENDO_TIMEOUT },
    );
    await this.viewEmployeesButton.click();
    const response = await employeeLoad;
    if (!response.ok()) {
      throw new Error(`Loading payroll employees failed with HTTP ${response.status()}.`);
    }
    await this.loadingIndicator.waitFor({
      state: 'hidden',
      timeout: LEGACY_KENDO_TIMEOUT,
    });
    await expect(this.employeeRow(employeeName)).toBeVisible({
      timeout: LEGACY_KENDO_TIMEOUT,
    });
  }

  employeeRow(employeeName: string): Locator {
    return this.payrollGrid.getByRole('row').filter({ hasText: employeeName });
  }

  async runPayroll(): Promise<void> {
    await this.makePaymentButton.click();
  }
}
