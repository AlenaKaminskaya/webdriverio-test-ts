import Page from "./page";

class CheckoutPage extends Page {
  get firstName() {
    return $('[data-test="firstName"]');
  }

  get lastName() {
    return $('[data-test="lastName"]');
  }

  get postalCode() {
    return $('[data-test="postalCode"]');
  }

  get continueBtn() {
    return $('[data-test="continue"]');
  }

  get cancelBtn() {
    return $('[data-test="cancel"]');
  }

  get error() {
    return $('[data-test="error"]');
  }


  async open() {
    await super.open("/checkout-step-one.html");
  }

  async fillForm(first: string, last: string, zip: string) {
    await this.firstName.waitForDisplayed();
    await this.firstName.setValue(first);
    await this.lastName.setValue(last);
    await this.postalCode.setValue(zip);
  }

  async continue() {
    await this.continueBtn.waitForClickable();
    await this.continueBtn.click();
  }

  async cancel() {
    await this.cancelBtn.waitForClickable();
    await this.cancelBtn.click();
  }

  async getErrorText(): Promise<string> {
    await this.error.waitForDisplayed();
    return (await this.error.getText()).trim();
  }
}

export default new CheckoutPage();
