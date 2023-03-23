import { ICustomWorld } from '../../conf/support/custom-world';
import { get_datas_for_test } from '../../conf/utils/load_DataSet_for_tests';
import { LoginPage } from '../../test_resources/page_objects/login';
import { Given } from '@cucumber/cucumber';

Given(
  'I authenticate to {string} as a {string}',
  async function (this: ICustomWorld, ui: string, userProfil: string) {
    const page = this.page!;
    const loginPage = new LoginPage(page);
    const inputs = get_datas_for_test(userProfil, ui);
    await loginPage.login(inputs[0], inputs[1], inputs[2]);
  },
);
