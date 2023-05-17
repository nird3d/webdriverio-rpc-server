import { Browser } from 'webdriverio';
import {Page} from "./page";

const now = new Date();
export class Wakeup extends Page {
  
  constructor(browser: Browser) {
    super(browser);
  }
  private get createBtn() {
    return this.browser.$("#ls-title");
  }
  private get newDesignBtn() {
    return this.browser.$("#new-design-btn");
  }
  private get createTitle() {
    return this.browser.$("[qa_id=light-source-title]");
  }
  // private get newDesignTitle() {
  //   return $("#new-design-title");
  // }
  private get designName() {
    return this.browser.$("[qa_id= design-name]");
  }
  private get unitsType() {
    return this.browser.$("#units-type");
  }
  private get createPublicDesignBtn() {
    return this.browser.$("#save_btn");
  }
  private get fileMenu() {
    return this.browser.$("#menu_file_dropdown");
  }
  private get importFile() {
    return this.browser.$("#existing-from-local");
  }
  private get searchBox() {
    return this.browser.$("[qa_id= free-string_qa]");
  }

  private get infoFormTitle() {
    return this.browser.$("#parser-main-title");
  }
  private get infoFormCloseButton() {
    return this.browser.$$("[qa_id=close-details-view]");
  }

  private get searchResults() {
    return this.browser.$$("#setup-name");
  }
  
  private get generalComments() {
    return this.browser.$("#general_comments");
  }

  private get publicOrPrivate() {
    return this.browser.$("#publication");
  }

  private get labelsContainer() {
    return this.browser.$("#labels");
  }

  private get forms() {
    return this.browser.$("#forms");
  }

  private get searchResultsList() {
    return this.browser.$$("#setup-name").map((el) => el.getText());
  }

  //////////////////////////DELETE SETUP/////////////////////////////////////////////////

  private get yesBtnDelete() {
    return this.browser.$('[qa_id="yes-popup-btn-qa"]');
  }

  private get searchSetupTextBox() {
    return this.browser.$('[qa_id="free-string_qa"]');
  }

  private get checkAll() {
    return this.browser.$('[qa_id="check-all-qa"]');
  }

  private get deleteBtn() {
    return this.browser.$('[qa_id="wakeup-delete-btn-qa"]');
  }

  public async search(designName: string) {
    await this.browser.waitUntil(() => this.searchBox.isClickable(), {
      timeout: 100000,
      timeoutMsg: "!!! - The wakeup screen did not load",
    });

    await this.searchBox.setValue(designName);
  }

  public async deleteSetup(setupName: string) {

    await this.browser.waitUntil(() => this.searchSetupTextBox.isClickable(), {
      timeout: 10000,
      interval: 500,
      timeoutMsg:
        "!!! - The 'Search' textbox in the information form is not interactable",
    });

    await this.searchSetupTextBox.addValue(setupName);

    await this.browser.waitUntil(async () => (await this.searchResults.length) > 0, {
      timeout: 10000,
      interval: 500,
      timeoutMsg: "!!! - The search results are empty",
    });

    await this.browser.pause(1000);

    await this.browser.waitUntil(() => this.checkAll.isDisplayed(), {
      timeout: 10000,
      interval: 500,
      timeoutMsg:
        "!!! - The Delete button in the information form is not clickable",
    });

    await this.browser.waitUntil(() => this.checkAll.isClickable(), {
      timeout: 10000,
      interval: 500,
      timeoutMsg:
        "!!! - The Delete button in the information form is not clickable",
    });

    await this.checkAll.click();

    await this.browser.pause(500);

    await this.browser.waitUntil(() => this.deleteBtn.isClickable(), {
      timeout: 10000, 
      interval: 500,
      timeoutMsg:
        "!!! - The Delete button in the information form is not clickable",
    });

    await this.deleteBtn.click();

    await this.browser.pause(1000);

    await this.browser.waitUntil(() => this.yesBtnDelete.isClickable(), {
      timeout: 10000,
      interval: 500,
      timeoutMsg:
        "!!! - The 'Yes' button in the information form is not clickable",
    });

    await this.yesBtnDelete.click();

    await this.browser.pause(3000);
  }

  public async openDesign(designName) {
    await this.browser.waitUntil(() => this.searchBox.isDisplayed(), {
      timeout: 100000,
      timeoutMsg: "!!! - The wakeup screen did not load",
    });

    await this.browser.waitUntil(() => this.searchBox.isClickable(), {
      timeout: 100000,
      timeoutMsg: "!!! - The wakeup screen did not load",
    });

    await this.searchBox.setValue(designName);

    await this.browser.waitUntil(async () => (await this.searchResults.length) > 0, {
      timeout: 5000,
      timeoutMsg: "!!! - The search results are empty",
    });

    const foundDesigns = await this.searchResults;
    const indexOfSearchedNames = await (
      await this.searchResultsList
    ).indexOf(designName);

    await foundDesigns[indexOfSearchedNames].click();

  }
  public async importDesign() {
    await this.browser.execute(
      `op3d.setups.SetupsManager.openFile(pFile, true, false)`
    );
  }

  private async clickCreateBtn() {

    await this.browser.waitUntil(() => this.createTitle.isClickable(), {
      timeout: 100000,
      timeoutMsg: "!!! - The wakeup screen did not fully load",
    });

    await this.createTitle.click();

    await this.browser.waitUntil(() => this.newDesignBtn.isClickable(), {
      timeout: 100000,
      timeoutMsg: "!!! - The wakeup screen did not fully load",
    });

    await this.newDesignBtn.click();

  }

  public async createNewDesign(units) {
    await this.clickCreateBtn();
    await this.browser.waitUntil(() => this.designName.isClickable(), {
      timeout: 100000,
      timeoutMsg: "!!! - The 'New Design' dialog did not open",
    });
    await this.designName.addValue("Automation" + now.toISOString());
    await this.generalComments.addValue("Automated test" + now.toISOString());
    await this.labelsContainer.selectByVisibleText("General");
    await this.unitsType.click();
    await this.unitsType.selectByVisibleText(units);
    await this.createPublicDesignBtn.click();
    await this.browser.waitUntil(() => this.fileMenu.isDisplayed(), {
      timeout: 100000,
      timeoutMsg: "!!! - The new design was not created",
    });
  }



}
