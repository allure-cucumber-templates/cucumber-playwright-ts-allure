import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class webtablePage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly ADD_NEW_ENTRY_BUTTON = '#addNewRecordButton';
  readonly EDIT_FIRST_ENTRY_BUTTON = '#edit-record-1';
  readonly DELETE_THIRD_ENTRY_BUTTON = '#delete-record-3';
  readonly SEARCH_BAR_FIELD = '#searchBox';
  readonly SEARCH_BAR_BUTTON = '#basic-addon2';

  readonly FORM_INPUT_FIRSTNAME = '#firstName';
  readonly FORM_INPUT_LASTNAME = '#lastName';
  readonly FORM_INPUT_EMAIL = '#userEmail';
  readonly FORM_INPUT_AGE = '#age';
  readonly FORM_INPUT_SALARY = '#salary';
  readonly FORM_INPUT_DEPT = '#department';
  readonly FORM_SUBMIT_BUTTON = '#submit';
  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async add_new_entry_to_webtable(
    firstName: string,
    lastName: string,
    email: string,
    age: string,
    salary: string,
    department: string,
  ) {
    const page = this.page!;
    await page.locator(this.ADD_NEW_ENTRY_BUTTON).click();
    await page.locator(this.FORM_INPUT_FIRSTNAME).fill(firstName);
    await page.locator(this.FORM_INPUT_LASTNAME).fill(lastName);
    await page.locator(this.FORM_INPUT_EMAIL).fill(email);
    await page.locator(this.FORM_INPUT_AGE).fill(age);
    await page.locator(this.FORM_INPUT_SALARY).fill(salary);
    await page.locator(this.FORM_INPUT_DEPT).fill(department);
    await page.locator(this.FORM_SUBMIT_BUTTON).click();
    console.log('new table entry created');
  }

  async edit_first_entry_in_webtable(
    firstName: string,
    lastName: string,
    email: string,
    age: string,
    salary: string,
    department: string,
  ) {
    const page = this.page!;
    await page.locator(this.EDIT_FIRST_ENTRY_BUTTON).click();
    await page.locator(this.FORM_INPUT_FIRSTNAME).fill(firstName);
    await page.locator(this.FORM_INPUT_LASTNAME).fill(lastName);
    await page.locator(this.FORM_INPUT_EMAIL).fill(email);
    await page.locator(this.FORM_INPUT_AGE).fill(age);
    await page.locator(this.FORM_INPUT_SALARY).fill(salary);
    await page.locator(this.FORM_INPUT_DEPT).fill(department);
    await page.locator(this.FORM_SUBMIT_BUTTON).click();
    console.log('table entry edited');
  }
  async delete_third_entry_in_webtable() {
    const page = this.page!;
    await page.locator(this.DELETE_THIRD_ENTRY_BUTTON).click();
    console.log('table entry deletion');
  }

  async search_entry_in_webtable(searchEntry: string) {
    const page = this.page!;
    await page.locator(this.SEARCH_BAR_FIELD).fill(searchEntry);
    await page.locator(this.SEARCH_BAR_BUTTON).click();
    console.log('searching table entry');
  }

  async check_new_entry_added_to_webtable() {
    const page = this.page!;
    await expect(page.locator('.rt-tr-group:text("ZIED")')).toBeTruthy();
    await expect(page.locator('.rt-tr-group:text("RAISSI")')).toBeTruthy();
    await expect(page.locator('.rt-tr-group:text("test@gmail.com")')).toBeTruthy();
    console.log('new entry is visible in table');
  }

  async check_first_entry_is_edited() {
    const page = this.page!;
    await expect(page.locator('.rt-tr-group:text("ZIED")')).toBeTruthy();
    await expect(page.locator('.rt-tr-group:text("RAISSI")')).toBeTruthy();
    await expect(page.locator('.rt-tr-group:text("test@gmail.com")')).toBeTruthy();
    await expect(page.locator('.rt-tr-group:text("Cierra")')).toHaveCount(0);
    await expect(page.locator('.rt-tr-group:text("Vega")')).toHaveCount(0);
    await expect(page.locator('.rt-tr-group:text("cierra@example.com")')).toHaveCount(0);
    console.log('table entry edit applied');
  }

  async check_third_entry_deletion() {
    const page = this.page!;
    await expect(page.locator('.rt-tr-group:text("Kierra")')).toHaveCount(0);
    await expect(page.locator('.rt-tr-group:text("Gentry")')).toHaveCount(0);
    await expect(page.locator('.rt-tr-group:text("kierra@example.com")')).toHaveCount(0);
    console.log('table entry deleted');
  }

  async check_entry_search_results() {
    const page = this.page!;
    await expect(page.locator('.rt-tr-group:text("Kierra")')).toBeTruthy();
    await expect(page.locator('.rt-tr-group:text("Alden")')).toHaveCount(0);
    await expect(page.locator('.rt-tr-group:text("Cierra")')).toHaveCount(0);
    console.log('searched table entry is visible');
  }
}
