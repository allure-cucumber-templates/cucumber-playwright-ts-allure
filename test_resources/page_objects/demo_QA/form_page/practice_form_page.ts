import { expect } from '@playwright/test';
import { LargeNumberLike } from 'crypto';
import { Page } from 'playwright';

type formFormat = {
  FirstName: string;
  LastName: string;
  Email: string;
  Gender: string;
  Mobile: string;
  DateOfBirth: string;
  Subjects: string;
  Hobbies: Array<string>;
  CurrentAddress: string;
};

export class formPage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly PRACTICE_FORM_FIRSTNAME = 'input#firstName';
  readonly PRACTICE_FORM_LASTNAME = 'input#lastName';
  readonly PRACTICE_FORM_EMAIL = 'input#userEmail';
  readonly PRACTICE_FORM_GENDER_RADIO_MULT = 'input#gender-radio-X';
  readonly PRACTICE_FORM_PHONE_NUMBER = 'input#userNumber';
  readonly PRACTICE_FORM_BIRTHDAY_CALENDAR = 'input#dateOfBirthInput';
  readonly PRACTICE_FORM_SUBJECTS = 'div#subjectsContainer';
  readonly PRACTICE_FORM_HOBBIES_CHECKBOX_MULT = 'input#hobbies-checkbox-X';
  readonly PRACTICE_FORM_PICTURE_UPLOAD_BUTTON = 'input#uploadPicture';
  readonly PRACTICE_FORM_CURRENT_ADRESS = 'textarea#currentAddress';
  readonly PRACTICE_FORM_STATE_SELECT = 'div#state';
  readonly PRACTICE_FORM_CITY_SELECT = 'div#city';
  readonly PRACTICE_FORM_SUBMIT_RESPONSE = 'button#submit';

  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fill_form_with_dataset(dataset: formFormat) {
    const page = this.page!;
    let selectGenderLocator = `//input[@value="${dataset.Gender}"]`;
    let addressSplit = dataset.CurrentAddress.split(', ');

    await page.fill(this.PRACTICE_FORM_FIRSTNAME, dataset.FirstName);
    await page.fill(this.PRACTICE_FORM_LASTNAME, dataset.LastName);
    await page.fill(this.PRACTICE_FORM_EMAIL, dataset.Email);
    await page.fill(this.PRACTICE_FORM_PHONE_NUMBER, dataset.Mobile);
    await page.fill(this.PRACTICE_FORM_BIRTHDAY_CALENDAR, dataset.DateOfBirth);
    await page.press(this.PRACTICE_FORM_BIRTHDAY_CALENDAR, 'Enter');
    await page.click(this.PRACTICE_FORM_SUBJECTS);
    await page.type(this.PRACTICE_FORM_SUBJECTS, dataset.Subjects);
    await page.press(this.PRACTICE_FORM_SUBJECTS, 'Enter');
    await page.click(selectGenderLocator, { force: true });

    for (var i = 0; i < dataset.Hobbies.length; i++) {
      if (dataset.Hobbies.at(i) !== 'undefined') {
        await page.click(`text=${dataset.Hobbies.at(i)!}`);
      }
    }

    await page.fill(this.PRACTICE_FORM_CURRENT_ADRESS, addressSplit[0]);
    await page.click(this.PRACTICE_FORM_STATE_SELECT);
    await page.type('text="Select State"', addressSplit[1]);
    await page.press(this.PRACTICE_FORM_STATE_SELECT, 'Enter');
    await page.click(this.PRACTICE_FORM_CITY_SELECT);
    await page.type('text="Select City"', addressSplit[2]);
    await page.press(this.PRACTICE_FORM_CITY_SELECT, 'Enter');
    await page.press(this.PRACTICE_FORM_SUBMIT_RESPONSE, 'Enter');
    await page.waitForTimeout(200);
  }

  async check_form_answers_with_dataset(dataset: formFormat) {
    console.log(dataset);
    const page = this.page!;
    let addressSplit = dataset.CurrentAddress.split(', ');
    var hobbyList: string = '';

    for (var i = 0; i < dataset.Hobbies.length; i++) {
      if (i !== 0) {
        hobbyList = hobbyList.concat(', ');
      }
      hobbyList = hobbyList.concat(dataset.Hobbies[i]);
    }

    addressSplit[1].concat(' ', addressSplit[2]);

    await expect(page.locator('//tbody/tr[1]/td[2]')).toHaveText(
      dataset.FirstName.concat(' ', dataset.LastName),
    );
    await expect(page.locator('//tbody/tr[2]/td[2]')).toHaveText(dataset.Email);
    await expect(page.locator('//tbody/tr[3]/td[2]')).toHaveText(dataset.Gender);
    await expect(page.locator('//tbody/tr[4]/td[2]')).toHaveText(dataset.Mobile);
    await expect(page.locator('//tbody/tr[5]/td[2]')).toHaveText(dataset.DateOfBirth);
    await expect(page.locator('//tbody/tr[6]/td[2]')).toHaveText(dataset.Subjects);
    await expect(page.locator('//tbody/tr[7]/td[2]')).toHaveText(hobbyList);
    await expect(page.locator('//tbody/tr[9]/td[2]')).toHaveText(addressSplit[0]);
    await expect(page.locator('//tbody/tr[10]/td[2]')).toHaveText(
      addressSplit[1].concat(' ', addressSplit[2]),
    );
  }
}
