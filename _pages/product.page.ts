import { Locator, Page } from "@playwright/test";

export class ProductPage {
  productName: Locator;
  productPrice: Locator;
  productDesc: Locator;
  productColorTitle: Locator;
  productColorSelectorByIndex: (index: number) => Locator;
  quantityTitle: Locator;
  quantityMinus: Locator;
  quantityInput: Locator;
  quantityPlus: Locator;
  addToCartButton: Locator;

  productSpecificationsHeader: Locator;

  constructor(private page: Page) {
    const description = this.page.locator("#Description");

    this.productName = description.locator("h1");
    this.productPrice = description.getByRole("heading", { name: "$" });
    this.productDesc = description.locator("p");
    this.productColorTitle = description.locator(".Colors");
    this.productColorSelectorByIndex = (index: number): Locator => this.page.locator(".Colors #bunny").nth(index);
    this.quantityTitle = description.getByText("Quantity:");
    this.quantityMinus = description.locator(".minus");
    this.quantityInput = description.locator('input[name="quantity"]');
    this.quantityPlus = description.locator(".plus");
    this.addToCartButton = description.locator('[name="save_to_cart"]');

    this.productSpecificationsHeader = this.page.locator('article:has-text("Product Specifications") h2');
  }

  async getAllProductAttributes(): Promise<{ attr: string; value: string }[]> {
    const rows = this.page.locator('article:has-text("Product Specifications") div');
    const result: { attr: string; value: string }[] = [];

    for (let i = 0; i < (await rows.count()); i++) {
      const row = rows.nth(i);

      const attr = (await row.locator(".attr").textContent())?.trim();
      const value = (await row.locator(".value").textContent())?.trim();

      if (attr && value) {
        result.push({ attr, value });
      } else {
        throw new Error(`Brak tekstu w polu 'attr' lub 'value' w wierszu #${i + 1}`);
      }
    }

    return result;
  }
}
