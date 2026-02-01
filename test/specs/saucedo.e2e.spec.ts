// test/specs/saucedo.e2e.spec.ts
import { expect } from "@wdio/globals";

import loginPage from "../pageobjects/login.page";
import inventoryPage from "../pageobjects/inventory.page";
import cartPage from "../pageobjects/cart.page";

describe("Open Swag Labs (WDIO)", () => {
  const user = "standard_user";
  const password = "secret_sauce";

  beforeEach(async () => {
    await loginPage.open();
  });

  describe("Login", () => {
    it("Successful login redirects to Inventory page", async () => {
      await loginPage.login(user, password);

      const url = await browser.getUrl();
      expect(url).toContain("/inventory.html");

      await expect(inventoryPage.pageTitle).toHaveText("Products");
      await expect(inventoryPage.items).toBeElementsArrayOfSize(6);
    });

    it("Invalid login shows error message", async () => {
      await loginPage.login("wrong_user", "wrong_pass");

      await expect(loginPage.error).toBeDisplayed();
      await expect(loginPage.error).toHaveText(
        expect.stringContaining("Username and password do not match")
      );
    });
  });

  describe("Inventory & Cart", () => {
    beforeEach(async () => {
      await loginPage.login(user, password);

      const url = await browser.getUrl();
      expect(url).toContain("/inventory.html");
    });

    it("Add item to cart by name updates cart badge and item appears in cart", async () => {
      await inventoryPage.addItemToCartByName("Sauce Labs Backpack");

      await expect(inventoryPage.cartBadge).toHaveText("1");

      await inventoryPage.openCart();

      const url = await browser.getUrl();
      expect(url).toContain("/cart.html");

      await cartPage.expectItemVisible("Sauce Labs Backpack");
    });

 it("Remove item from cart removes badge", async () => {
  await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
  await expect(inventoryPage.cartBadge).toHaveText("1");

  await inventoryPage.removeItemByName("Sauce Labs Backpack");
  await expect(inventoryPage.cartBadge).not.toExist();
});

    it("Sorting by Price (low to high) changes order", async () => {
      await inventoryPage.selectSort("lohi");

      const nums = await inventoryPage.getPricesAsNumbers();
      expect(nums[0]).toBeLessThan(nums[1]);

      await expect(inventoryPage.activeSortOption).toHaveText(
        expect.stringContaining("Price (low to high)")
      );
    });

    it("Logout redirects to login page", async () => {
      await inventoryPage.logout();

      const url = await browser.getUrl();
      expect(url).toContain("saucedemo.com");

      await expect(loginPage.loginBtn).toBeDisplayed();
    });
  });
});
