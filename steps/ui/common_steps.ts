import { Given, Then, When } from '@cucumber/cucumber';
import { ICustomWorld } from '../../conf/support/custom-world';
import { commonFunctions } from '../../test_resources/page_objects/demo_QA/demoqa_common_methods';

Given('I navigate to Demoqa Home page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_home_page();
});

When('I navigate to the Browser Windows page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Alerts, Frame & Windows', 'Browser Windows');
});

When('I navigate to the Links page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Elements', 'Links');
});

Given('I navigate to the Broken Links page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Elements', 'Broken Links - Images');
});

When('I navigate to the Radio Button page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Elements', 'Radio Button');
});

When('I navigate to the Checkbox page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Elements', 'Check Box');
});

When('I navigate to the Buttons page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Elements', 'Buttons');
});

When('I navigate to the dynamic elements page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Elements', 'Dynamic Properties');
});

When('I navigate to the Web Table page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Elements', 'Web Tables');
});

When('I navigate to the Droppable page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Interactions', 'Droppable');
});

When('I navigate to the Auto Complete page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Widgets', 'Auto Complete');
});

When('I navigate to the Progress Bar page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Widgets', 'Progress Bar');
});

Given('I navigate to the Practice Form page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Forms', 'Practice Form');
});

Given('I navigate to the Menu page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Widgets', 'Menu');
});

Given('I navigate to the Tooltips page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Widgets', 'Tool Tips');
});

Given('I navigate to the Select Menu page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Widgets', 'Select Menu');
});

Given('I navigate to the Alerts page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Alerts, Frame & Windows', 'Alerts');
});

Given('I navigate to the Upload and Download page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Elements', 'Upload and Download');
});

Given('I navigate to the Modal Dialogs page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonFunc = new commonFunctions(page);
  await commonFunc.go_to_selected_page('Alerts, Frame & Windows', 'Modal Dialogs');
});
