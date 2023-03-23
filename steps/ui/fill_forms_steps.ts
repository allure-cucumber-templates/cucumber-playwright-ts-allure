import { Given, Then, When } from '@cucumber/cucumber';
import { ICustomWorld } from '../../conf/support/custom-world';
import { formPage } from '../../test_resources/page_objects/demo_QA/form_page/practice_form_page';
import * as dataset from '../../test_resources/test_datas/dataset.json';

When('I fill the form using the data from my json dataset', async function (this: ICustomWorld) {
  const page = this.page!;
  const formFunc = new formPage(page);
  await formFunc.fill_form_with_dataset(dataset.Form_user);
});

Then(
  'I see my submitted form in the popup with the correct values',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const formFunc = new formPage(page);
    await formFunc.check_form_answers_with_dataset(dataset.Form_user);
  },
);
