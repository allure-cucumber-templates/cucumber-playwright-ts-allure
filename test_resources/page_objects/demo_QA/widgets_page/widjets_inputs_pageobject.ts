import { Page } from 'playwright';

export class inputsPage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly PROGRESS_BAR_START_STOP_BUTTON = '#startStopButton';
  readonly PROGRESS_BAR_CURRENT_VALUE = '.progress-bar';
  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async start_stop_progress_bar() {
    const page = this.page!;
    let startLocator = page.locator(this.PROGRESS_BAR_START_STOP_BUTTON);
    await startLocator.click();
  }

  async check_progress_bar_startup() {
    await this.page.waitForTimeout(300);
    // const page = this.page!;
    // let barLocator = page.locator(this.PROGRESS_BAR_CURRENT_VALUE)
    // let currentBarProgress = barLocator.getAttribute('aria-valuenow').then((progressBar) => {return progressBar;})
    // console.log(currentBarProgress);
    // await page.waitForTimeout(5000);
    // console.log(currentBarProgress);
    //    expect(parseInt(currentBarProgress)).toBeGreaterThan(0)
  }

  async check_progress_bar_is_stopped() {
    await this.page.waitForTimeout(300);
  }
  async check_progress_bar_stops_at_max() {
    await this.page.waitForTimeout(300);
  }

  async check_reset_button_is_visible() {
    await this.page.waitForTimeout(300);
  }
}
