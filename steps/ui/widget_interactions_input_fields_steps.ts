import { Given, Then, When } from '@cucumber/cucumber';
import { ICustomWorld } from '../../conf/support/custom-world';
import { autocompletePage } from '../../test_resources/page_objects/demo_QA/widgets_page/autocomplete_pageobject';
import { inputsPage } from '../../test_resources/page_objects/demo_QA/widgets_page/widjets_inputs_pageobject';

When('I type {string} in the field', async function (this: ICustomWorld, color: string) {
  const page = this.page!;
  const autocompleteFunc = new autocompletePage(page);
  await autocompleteFunc.type_in_autocomplete_field(color);
});

Then(
  'I see {string} and {string} in my suggestions',
  async function (this: ICustomWorld, color1: string, color2: string) {
    const page = this.page!;
    const autocompleteFunc = new autocompletePage(page);
    await autocompleteFunc.check_autocomplete_suggestions(color1, color2);
  },
);

Then('the selected suggestion is added to the field', async function (this: ICustomWorld) {
  const page = this.page!;
  const autocompleteFunc = new autocompletePage(page);
  await autocompleteFunc.add_autocomplete_suggestion_to_field('Black');
});

When('I click on the start button', async function (this: ICustomWorld) {
  const page = this.page!;
  const inputsFunc = new inputsPage(page);
  await inputsFunc.start_stop_progress_bar();
});

Then('I see the progress bar filling', async function (this: ICustomWorld) {
  const page = this.page!;
  const inputsFunc = new inputsPage(page);
  await inputsFunc.check_progress_bar_startup();
});

When(
  'I click on the stop button while the progress bar is filling',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const inputsFunc = new inputsPage(page);
    await inputsFunc.start_stop_progress_bar();
  },
);

Then('I see the progress bar has stopped', async function (this: ICustomWorld) {
  const page = this.page!;
  const inputsFunc = new inputsPage(page);
  await inputsFunc.check_progress_bar_is_stopped();
});

Then('at 100% the progress bar stops', async function (this: ICustomWorld) {
  const page = this.page!;
  const inputsFunc = new inputsPage(page);
  await inputsFunc.check_progress_bar_stops_at_max();
});

Then('the button "Reset" is visible', async function (this: ICustomWorld) {
  const page = this.page!;
  const inputsFunc = new inputsPage(page);
  await inputsFunc.check_reset_button_is_visible();
});
