import Page from "./page";

class MockPage extends Page {
  private readonly mockUrl =
    "https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks";

  get fetchBtn() {
    return $("#fetchBtn");
  }

  get result() {
    return $("#result");
  }

  async open() {
    await browser.url(this.mockUrl);
  }

  async clickFetch() {
    await this.fetchBtn.waitForClickable();
    await this.fetchBtn.click();
  }

  async expectSuccessVisible() {
    await this.result.waitForDisplayed();
    await expect(this.result).toHaveText(expect.stringContaining("Success"));
  }

  async expectErrorVisible() {
    await this.result.waitForDisplayed();
    await expect(this.result).toHaveText(expect.stringContaining("Error"));
  }
}

export default new MockPage();


