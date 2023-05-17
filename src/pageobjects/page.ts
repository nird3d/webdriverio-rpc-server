// page.ts
import { Browser, remote } from 'webdriverio';

export class Page {
  protected browser: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  public open(siteUrl: string) {
    this.browser.url(siteUrl);
  }

  public async waitUntilPageOpens(loginUrl: string): Promise<void> {
    await this.browser.waitUntil(
      async () => {
        const currentUrl = await this.browser.getUrl();
        return currentUrl === loginUrl;
      },
      {
        timeout: 15000,
        timeoutMsg: `Timeout waiting for ${loginUrl}`,
        interval: 500,
      }
    );
  }

}