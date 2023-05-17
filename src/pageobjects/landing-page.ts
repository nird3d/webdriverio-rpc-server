import { Browser } from 'webdriverio';
import {Page} from "./page";

export class Landing extends Page {
  constructor(browser: Browser) {
    super(browser);
  }
  public get inputEmail() {
    return this.browser.$$("[name=username]");
  }

  public get inputPassword() {
    return this.browser.$$("[name=password]");
  }

  public get btnLogin() {
    return this.browser.$$("[name=signInSubmitButton]");
  }

  public get authUser() {
    return this.browser.$("#env-username");
  }

  public get authPassword() {
    return this.browser.$("#env-password");
  }
  public get btnAuth() {
    return this.browser.$("#env-enter");
  }

  public async authenticate(username: string, password: string) {
    const isAuthUserDisplayed = await this.authUser.isDisplayed();
    if (isAuthUserDisplayed) {
      this.browser.waitUntil(() => this.btnAuth.isClickable(), {
        timeout: 10000,
        timeoutMsg: "!!! - The authentication dialog did not fully load",
      });
      await this.authUser.setValue(username);
      await this.authPassword.setValue(password);
      await this.btnAuth.click();
    }
  }
  

  public async login(username: string, password: string, loginURL: string) {
    await super.waitUntilPageOpens(loginURL);
    const isInputEmailDisplayed = await this.inputEmail[1].isDisplayed();
    this.browser.waitUntil(() => isInputEmailDisplayed, {
      timeout: 20000,
      timeoutMsg: "!!! - The login dialog did not fully load",
    });
    await this.inputEmail[1].setValue(username);
    await this.inputPassword[1].setValue(password);
    const isBtnLoginDisplayedAndClickable = await this.btnLogin[1].isDisplayed() && await this.btnLogin[1].isClickable();
    this.browser.waitUntil(() => isBtnLoginDisplayedAndClickable, {
      timeout: 5000,
      timeoutMsg: "!!! - The login button is not clickable"
    });
    await this.btnLogin[1].click();
  }
  
  public openSite(site) {
    super.open(site);
    this.browser.maximizeWindow();
  }

  public async enterSiteAndLogin(
    siteURL,
    loginPageURL,
    authUser,
    authPassword,
    loginEmail,
    loginPassword
  ) {
    await this.openSite(siteURL);
    await this.authenticate(authUser, authPassword);
    await this.login(loginEmail, loginPassword, loginPageURL);
  }
}
