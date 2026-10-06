import type { Locator, Page } from '@playwright/test';

export class ReportPage {
  readonly heading: Locator;
  readonly branchInput: Locator;
  readonly errorMessages: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Report', exact: true });
    this.branchInput = page.locator('input[name="Branch_input"]');
    this.errorMessages = page.locator(
      '[role="alert"]:visible, .alert:visible, .validation-summary-errors:visible',
    );
  }

  async selectBranch(branch: string): Promise<void> {
    await this.branchInput.fill(branch);
    await this.branchInput.press('ArrowDown');
    await this.branchInput.press('Enter');
  }
}
