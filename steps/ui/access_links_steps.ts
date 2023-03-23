import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../../conf/support/custom-world';
import { linkPage } from '../../test_resources/page_objects/demo_QA/elements_page/links_pageobjects';

When('I check the broken link', async function (this: ICustomWorld) {
  const page = this.page!;
  const linkFunc = new linkPage(page);
  await linkFunc.click_on_broken_link();
});

Then('my link returns an error', async function (this: ICustomWorld) {
  const page = this.page!;
  const linkFunc = new linkPage(page);
  await linkFunc.check_current_page_is_error_500();
});

When('I access the api link {string}', async function (this: ICustomWorld, apiLink: string) {
  const page = this.page!;
  const linkFunc = new linkPage(page);
  await linkFunc.click_on_api_link(apiLink);
});

Then('I see the response {string}', async function (this: ICustomWorld, apiResponse: string) {
  const page = this.page!;
  const linkFunc = new linkPage(page);
  await linkFunc.check_response_of_last_api_link(apiResponse);
});

When('I access the link', async function (this: ICustomWorld) {
  const page = this.page!;
  const linkFunc = new linkPage(page);
  await linkFunc;
});

Then('I am redirected to a new page', async function (this: ICustomWorld) {
  const page = this.page!;
  const linkFunc = new linkPage(page);
});
