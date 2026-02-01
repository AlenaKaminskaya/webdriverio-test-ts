import Page from "./page";

class CartPage extends Page {
  get cartItems() {
    return $$(".cart_item");
  }

  get checkoutBtn() {
    return $('[data-test="checkout"]');
  }

  itemInCartByName(name: string) {
    return $(
      `//div[contains(@class,"cart_item")]//div[contains(@class,"inventory_item_name") and normalize-space()="${name}"]`
    );
  }

  async expectItemVisible(name: string) {
    const item = this.itemInCartByName(name);
    await item.waitForDisplayed();
    await expect(item).toBeDisplayed();
  }

  async checkout() {
    await this.checkoutBtn.waitForClickable();
    await this.checkoutBtn.click();
  }
}

export default new CartPage();
