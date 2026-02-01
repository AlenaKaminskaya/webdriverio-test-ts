class MenuComponent {
  get menuBtn() {
    return $("#react-burger-menu-btn");
  }

  get logoutLink() {
    return $("#logout_sidebar_link");
  }

  async openMenu() {
    await this.menuBtn.waitForClickable();
    await this.menuBtn.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.waitForClickable();
    await this.logoutLink.click();
  }
}

export default new MenuComponent();
