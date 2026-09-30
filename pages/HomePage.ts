import type { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly registrationLink: Locator;
  readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.registrationLink = page.getByRole('link', { name: 'Registration', exact: true });
    this.logoutLink = page.getByRole('link', { name: 'Log off', exact: true });
  }

  async openRegistration(): Promise<void> {
    await this.registrationLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}