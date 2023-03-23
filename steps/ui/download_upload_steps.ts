import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../../conf/support/custom-world';
import { download_upload_page } from '../../test_resources/page_objects/demo_QA/elements_page/download_upload_pageobjects';

When('I download a file', async function (this: ICustomWorld) {
  const page = this.page!;
  const DownloadFunc = new download_upload_page(page);
  await DownloadFunc.download_file();
});

Then('my file has been downloaded', async function (this: ICustomWorld) {
  const page = this.page!;
  const DownloadFunc = new download_upload_page(page);
  await DownloadFunc.check_download_file();
});

When('I upload my file', async function (this: ICustomWorld) {
  const page = this.page!;
  const DownloadFunc = new download_upload_page(page);
  await DownloadFunc.upload_file();
});

Then('I see my uploaded file path', async function (this: ICustomWorld) {
  const page = this.page!;
  const DownloadFunc = new download_upload_page(page);
  await DownloadFunc.check_upload_file();
});
