import { Locator, Page } from "@playwright/test";

export class ProductPage {
  productName: Locator;
  constructor(private page: Page) {
    this.productName = this.page.locator("#Description h1");
  }
}
