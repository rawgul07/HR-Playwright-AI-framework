import type { Locator, Page } from '@playwright/test';

export type RegistrationSection =
  | 'Uncompleted Employee'
  | 'All Employee'
  | 'Assign Employee To IClock'
  | 'Guard Training'
  | 'Company Registration';

export class RegistrationPage {
  readonly heading: Locator;
  readonly addNewEmployeeLink: Locator;
  readonly employeeGrid: Locator;
  readonly sections: Record<RegistrationSection, Locator>;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Registration', exact: true });
    this.addNewEmployeeLink = page.getByRole('link', { name: 'Add New Employee', exact: true });
    this.employeeGrid = page.locator('#EmployeeGrid');
    this.sections = {
      'Uncompleted Employee': page.getByRole('link', { name: 'Uncompleted Employee', exact: true }),
      'All Employee': page.getByRole('link', { name: 'All Employee', exact: true }),
      'Assign Employee To IClock': page.getByRole('link', { name: 'Assign Employee To IClock', exact: true }),
      'Guard Training': page.getByRole('link', { name: 'Guard Training', exact: true }),
      'Company Registration': page.getByRole('link', { name: 'Company Registration', exact: true }),
    };
  }

  async openSection(section: RegistrationSection): Promise<void> {
    await this.sections[section].click();
  }

  async openAddNewEmployee(): Promise<void> {
    await this.addNewEmployeeLink.click();
  }

  employeeRow(employeeName: string): Locator {
    return this.employeeGrid.getByRole('row').filter({ hasText: employeeName });
  }
}