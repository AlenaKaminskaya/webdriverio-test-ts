import Page from "./page";

class LoginPage extends Page {
  get username() {
    return $('[data-test="username"]');
  }

  get password() {
    return $('[data-test="password"]');
  }

  get loginBtn() {
    return $('[data-test="login-button"]');
  }

  get error() {
    return $('[data-test="error"]');
  }

  async open() {
    await super.open("/");
  }

  async login(user: string, pass: string) {
    await this.username.waitForDisplayed();
    await this.username.setValue(user);
    await this.password.setValue(pass);
    await this.loginBtn.click();
  }

  async expectErrorContains(text: string) {
    await this.error.waitForDisplayed();
    await expect(this.error).toHaveText(expect.stringContaining(text));
  }
}

export default new LoginPage();
