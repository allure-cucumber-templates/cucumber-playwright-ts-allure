import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../../conf/support/custom-world';

import { alertPopupPage } from '../../test_resources/page_objects/demo_QA/alert_frame_windows_page/alerts_popups_pageobjects';
import { modalPopupPage } from '../../test_resources/page_objects/demo_QA/alert_frame_windows_page/modal_popups_pageobjects';

When('I select the alert {string}', async function (this: ICustomWorld, AlertType: string) {
  const page = this.page!;
  const alertFunc = new alertPopupPage(page);
  await alertFunc.click_Alert_Button(AlertType);
});
Then('I see the alert {string}', async function (this: ICustomWorld, AlertType: string) {
  const page = this.page!;
  const alertFunc = new alertPopupPage(page);
  await alertFunc.check_Alert_Button(AlertType);
});

Then(
  'I can close the alert popins {string}',
  async function (this: ICustomWorld, AlertType: string) {
    const page = this.page!;
    const alertFunc = new alertPopupPage(page);
    await alertFunc.close_Alert_Button(AlertType);
  },
);

When('I select the modal {string}', async function (this: ICustomWorld, modalElem: string) {
  const page = this.page!;
  const modalFunc = new modalPopupPage(page);
  await modalFunc.click_on_modal_button(modalElem);
});

Then('I see the modal popin {string}', async function (this: ICustomWorld, modalElem: string) {
  const page = this.page!;
  const modalFunc = new modalPopupPage(page);
  await modalFunc.check_on_modal_button(modalElem);
});
