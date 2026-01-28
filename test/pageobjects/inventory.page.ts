// test/pageobjects/inventory.page.ts
import Page from "./page";
import menu from "./menu.component";

class InventoryPage extends Page {
  // --- Page elements ---
  get pageTitle() {
    return $(".title"); // "Products"
  }

  get items() {
    return $$(".inventory_item");
  }

  get cartLink() {
    return $(".shopping_cart_link");
  }

  get cartBadge() {
    return $(".shopping_cart_badge");
  }

  get sortSelect() {
    return $('[data-test="product-sort-container"]');
  }

  get activeSortOption() {
    return $(".active_option");
  }

  get itemPrices() {
    return $$(".inventory_item_price");
  }

  // --- Buttons by item name (XPath, stable for WDIO) ---
  addToCartBtn(name: string) {
    return $(
      `//div[contains(@class,"inventory_item")][.//div[contains(@class,"inventory_item_name") and normalize-space()="${name}"]]` +
        `//button[starts-with(@data-test,"add-to-cart-")]`
    );
  }

  removeBtn(name: string) {
    return $(
      `//div[contains(@class,"inventory_item")][.//div[contains(@class,"inventory_item_name") and normalize-space()="${name}"]]` +
        `//button[starts-with(@data-test,"remove-")]`
    );
  }

  // --- Actions ---
  async addItemToCartByName(name: string) {
    const addBtn = this.addToCartBtn(name);
    const removeBtn = this.removeBtn(name);

    // If item is already added, Add button won't exist; Remove will exist instead.
    if (await removeBtn.isExisting()) {
      return;
    }

    await addBtn.waitForDisplayed({ timeout: 10000 });
    await addBtn.scrollIntoView();
    await addBtn.waitForClickable({ timeout: 10000 });
    await addBtn.click();

    // Confirm state changed (Remove button appears)
    await removeBtn.waitForDisplayed({ timeout: 10000 });
  }

  async removeItemByName(name: string) {
    const removeBtn = this.removeBtn(name);

    await removeBtn.waitForDisplayed({ timeout: 10000 });
    await removeBtn.scrollIntoView();
    await removeBtn.waitForClickable({ timeout: 10000 });
    await removeBtn.click();

    // Optional: confirm Remove disappears and Add comes back
    const addBtn = this.addToCartBtn(name);
    await addBtn.waitForDisplayed({ timeout: 10000 });
  }

  async openCart() {
    await this.cartLink.waitForClickable({ timeout: 10000 });
    await this.cartLink.click();
  }

  async selectSort(value: "lohi" | "hilo" | "az" | "za") {
    await this.sortSelect.waitForDisplayed({ timeout: 10000 });
    await this.sortSelect.selectByAttribute("value", value);
  }

  async getPricesAsNumbers(): Promise<number[]> {
    const priceEls = await this.itemPrices;
    const texts: string[] = [];

    for (const el of priceEls) {
      texts.push(await el.getText());
    }

    return texts.map((t) => Number(t.replace("$", "").trim()));
  }

  async logout() {
    await menu.logout();
  }
}

export default new InventoryPage();
