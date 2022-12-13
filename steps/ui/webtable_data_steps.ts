import { Given, Then, When } from '@cucumber/cucumber';
import { ICustomWorld } from '../../conf/support/custom-world';
import { webtablePage } from '../../test_resources/page_objects/demo_QA/elements_page/web_table_pageobject';

When(
  'I add the following entry to the webtable first Name:{string}, last name:{string}, email:{string}, age:{string}, salary: {string}, department:{string}',
  async function (
    this: ICustomWorld,
    firstName: string,
    lastName: string,
    email: string,
    age: string,
    salary: string,
    department: string,
  ) {
    const page = this.page!;
    const webtableFunc = new webtablePage(page);
    await webtableFunc.add_new_entry_to_webtable(
      firstName,
      lastName,
      email,
      age,
      salary,
      department,
    );
  },
);

Then('my entry is added to the web table', async function (this: ICustomWorld) {
  const page = this.page!;
  const webtableFunc = new webtablePage(page);
  await webtableFunc.check_new_entry_added_to_webtable();
});

When(
  'I edit the first entry to the webtable first Name:{string}, last name:{string}, email:{string}, age:{string}, salary: {string}, department:{string}',
  async function (
    this: ICustomWorld,
    firstName: string,
    lastName: string,
    email: string,
    age: string,
    salary: string,
    department: string,
  ) {
    const page = this.page!;
    const webtableFunc = new webtablePage(page);
    await webtableFunc.edit_first_entry_in_webtable(
      firstName,
      lastName,
      email,
      age,
      salary,
      department,
    );
  },
);

Then('the first entry has been edited', async function (this: ICustomWorld) {
  const page = this.page!;
  const webtableFunc = new webtablePage(page);
  await webtableFunc.check_first_entry_is_edited();
});

When('I delete the third entry in the web table', async function (this: ICustomWorld) {
  const page = this.page!;
  const webtableFunc = new webtablePage(page);
  await webtableFunc.delete_third_entry_in_webtable();
});

Then('the third entry has been deleted', async function (this: ICustomWorld) {
  const page = this.page!;
  const webtableFunc = new webtablePage(page);
  await webtableFunc.check_third_entry_deletion();
});

When(
  'I search the entry {string} in the web table',
  async function (this: ICustomWorld, searchEntry: string) {
    const page = this.page!;
    const webtableFunc = new webtablePage(page);
    await webtableFunc.search_entry_in_webtable(searchEntry);
  },
);

Then('only my entry appears in the search results', async function (this: ICustomWorld) {
  const page = this.page!;
  const webtableFunc = new webtablePage(page);
  await webtableFunc.check_entry_search_results();
});
