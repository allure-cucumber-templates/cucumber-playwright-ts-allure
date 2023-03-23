import { Given, Then, When } from '@cucumber/cucumber';
import { ICustomWorld } from '../../conf/support/custom-world';
import { radioPage } from '../../test_resources/page_objects/demo_QA/elements_page/radio_button_pageobject';
import { dynamicPage } from '../../test_resources/page_objects/demo_QA/elements_page/dynamic_pageobjects';
import { buttonPage } from '../../test_resources/page_objects/demo_QA/elements_page/button_management_pageobject';
import { checkboxPage } from '../../test_resources/page_objects/demo_QA/elements_page/checkbox_pageobject';

When(
  'I select the radio button {string}',
  async function (this: ICustomWorld, radioSelect: string) {
    const page = this.page!;
    const radioFunc = new radioPage(page);
    await radioFunc.click_on_selected_radio_button(radioSelect);
  },
);

Then(
  'I see the text change depending on {string} {string}',
  async function (this: ICustomWorld, radioSelect: string, radioStatus: string) {
    const page = this.page!;
    const radioFunc = new radioPage(page);
    await radioFunc.check_result_message_after__radio_button_selection(radioSelect, radioStatus);
  },
);

When('I click on all buttons', async function (this: ICustomWorld) {
  const page = this.page!;
  const buttonFunc = new buttonPage(page);
  await buttonFunc.click_on_all_buttons();
});

Then('I see the buttons have been clicked on', async function (this: ICustomWorld) {
  const page = this.page!;
  const buttonFunc = new buttonPage(page);
  await buttonFunc.check_buttons__have_been_clicked_on();
});

When('I click on the checkboxes', async function (this: ICustomWorld) {
  const page = this.page!;
  const checkboxFunc = new checkboxPage(page);
  await checkboxFunc.async_clicking_on_checkbox_combination();
});

Then('I see my toggles in the list', async function (this: ICustomWorld) {
  const page = this.page!;
  const checkboxFunc = new checkboxPage(page);
  await checkboxFunc.check_checkbox_list_toggles();
});

Then(
  'after "{int}" seconds, dynamic elements have changed',
  async function (this: ICustomWorld, waitTime: number) {
    const page = this.page!;
    const dynamicFunc = new dynamicPage(page);
    await dynamicFunc.check_dynamic_elements_changing_after_delay(waitTime);
  },
);
