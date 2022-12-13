import { Given, Then, When } from '@cucumber/cucumber';
import { ICustomWorld } from '../../conf/support/custom-world';
import { dropPage } from '../../test_resources/page_objects/demo_QA/interactions_page/drag_drop_pageobject';

When('I drag my element to the drop zone', async function (this: ICustomWorld) {
  const page = this.page!;
  const dropFunc = new dropPage(page);
  await dropFunc.drag_element_to_drop_zone();
});

Then('the drop zone changes color', async function (this: ICustomWorld) {
  const page = this.page!;
  const dropFunc = new dropPage(page);
  await dropFunc.check__draggable_is_in_drop_zone();
});
