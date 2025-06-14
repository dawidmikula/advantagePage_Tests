import test, { expect } from "@playwright/test";
import { ProductPage } from "../_pages/product.page";

test.describe("Product", () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);

    await page.goto("/#/product/3", { waitUntil: "networkidle" });
  });

  test("Product - Product Description", async ({ page }) => {
    await expect(productPage.productName).toBeVisible();
    await expect(productPage.productPrice).toBeVisible();
    await expect(productPage.productDesc).toBeVisible();
    await expect(productPage.productColorTitle).toHaveText("Color:");
    await expect(productPage.quantityTitle).toHaveText("Quantity:");
    await expect(productPage.quantityMinus).toBeVisible();
    await expect(productPage.quantityInput).toBeVisible();
    await expect(productPage.quantityPlus).toBeVisible();
    await expect(productPage.addToCartButton).toHaveText("ADD TO CART");
  });

  test("Product - Product Specifications", async ({ page }) => {
    await expect(productPage.productSpecificationsHeader).toHaveText(
      "PRODUCT SPECIFICATIONS"
    );
    const attributes = await productPage.getAllProductAttributes();
  });
});
