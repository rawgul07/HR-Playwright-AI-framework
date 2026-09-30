import { expect, type Locator, type Page } from '@playwright/test';

export type EmployeeTitle = 'Miss' | 'Mr' | 'Mrs';
export type EmployeeGender = 'Male' | 'Female';
export type EmployeeReligion = 'Buddha' | 'Christian' | 'Hindu' | 'Muslim' | 'UnKnown';
export type EmployeeRace = 'CHINESE' | 'INDIAN' | 'MALAY' | 'OTHER' | 'UnKnown';
export type EmployeeLanguage = 'English' | 'Khmer' | 'Malay';

export interface EmployeeInformationData {
  title: EmployeeTitle;
  firstName: string;
  lastName: string;
  localName?: string;
  gender: EmployeeGender;
  alternateEmployeeId?: string;
  dateOfBirth: string;
  religion: EmployeeReligion;
  nationality: string;
  race: EmployeeRace;
  languages: EmployeeLanguage[];
  recruitmentType: 'Radio';
}

export class EmployeeInformationPage {
  readonly titleInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly localNameInput: Locator;
  readonly genderInput: Locator;
  readonly alternateEmployeeIdInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly religionInput: Locator;
  readonly nationalityInput: Locator;
  readonly raceInput: Locator;
  readonly recruitmentTypeInput: Locator;
  readonly languageCheckboxes: Record<EmployeeLanguage, Locator>;

  constructor(private readonly page: Page) {
    this.titleInput = page.locator('input[name="TitleId_input"]');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.localNameInput = page.locator('#LocalName');
    this.genderInput = page.locator('input[name="Gender_input"]');
    this.alternateEmployeeIdInput = page.locator('#AlternateEmpId');
    this.dateOfBirthInput = page.locator('#hdndob');
    this.religionInput = page.locator('input[name="ReligionId_input"]');
    this.nationalityInput = page.locator('input[name="NationalityId_input"]');
    this.raceInput = page.locator('input[name="RaceId_input"]');
    this.recruitmentTypeInput = page.locator('input[name="RecruitmentTypeId_input"]');
    this.languageCheckboxes = {
      English: page.locator('input[name="chk_2"]'),
      Khmer: page.locator('input[name="chk_1"]'),
      Malay: page.locator('input[name="chk_3"]'),
    };
  }

  async fill(data: EmployeeInformationData): Promise<void> {
    await this.selectOption(this.titleInput, data.title);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);

    if (data.localName !== undefined) {
      await this.localNameInput.fill(data.localName);
    }

    await this.selectOption(this.genderInput, data.gender);

    if (data.alternateEmployeeId !== undefined) {
      await this.alternateEmployeeIdInput.fill(data.alternateEmployeeId);
    }

    await this.dateOfBirthInput.fill(data.dateOfBirth);
    await this.selectOption(this.religionInput, data.religion);
    await this.selectOption(this.nationalityInput, data.nationality);
    await this.selectOption(this.raceInput, data.race);
    await this.selectOption(this.recruitmentTypeInput, data.recruitmentType);

    const selectedLanguages = new Set(data.languages);
    for (const [language, checkbox] of Object.entries(this.languageCheckboxes) as [EmployeeLanguage, Locator][]) {
      if (selectedLanguages.has(language)) {
        await checkbox.check();
      } else {
        await checkbox.uncheck();
      }
    }
  }

  private async selectOption(input: Locator, value: string): Promise<void> {
    await input.locator('xpath=following-sibling::span[contains(@class, "k-select")]').click();
    const popup = this.page.locator('.k-animation-container:visible').last();
    const option = popup.getByText(value, { exact: true });
    await option.waitFor({ state: 'visible' });
    await option.scrollIntoViewIfNeeded();
    await option.click({ force: true });
    await popup.waitFor({ state: 'hidden', timeout: 10_000 });
    await expect(input).toHaveValue(value, { timeout: 10_000 });
  }
}