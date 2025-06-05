import { Locator, Page } from "@playwright/test";

export class HomePage_ContactUs {
  chatWithUs: Locator;
  chatWithUsLabel: Locator;
  contactUs: Locator;
  selectCategory: Locator;
  selectProduct: Locator;
  contactEmail: Locator;
  emailError: Locator;
  subjectContactUs: Locator;
  subjectContactUsError: Locator;
  sendButton: Locator;
  invalidEmail: Locator;

  contactSuccessHeader: Locator;
  contactSuccessButton: Locator;

  constructor(private page: Page) {
    this.chatWithUs = this.page.locator('#supportCover [name="chat_with_us"]');
    this.chatWithUsLabel = this.page.locator('#supportCover [name="chat_with_us"] label');
    this.contactUs = this.page.getByRole("heading", { name: "CONTACT US" });
    this.selectCategory = this.page.locator('#supportCover select[name="categoryListboxContactUs"]');
    this.selectProduct = this.page.locator('#supportCover select[name="productListboxContactUs"]');
    this.contactEmail = this.page.locator('#supportCover input[name="emailContactUs"]');
    this.emailError = this.page.locator('#supportCover [a-hint="Email"] label');
    this.subjectContactUs = this.page.locator('#supportCover textarea[name="subjectTextareaContactUs"]');
    this.subjectContactUsError = this.page.locator('#supportCover [a-hint="subjectTextarea"] label');
    this.sendButton = this.page.locator("#supportCover #send_btn");
    this.invalidEmail = this.page.locator("#supportCover .invalid.center");

    this.contactSuccessHeader = this.page.locator("#registerSuccessCover p");
    this.contactSuccessButton = this.page.locator("#registerSuccessCover a");
  }
}

type PopularItemLocators = {
  image: Locator;
  name: Locator;
  link: Locator;
};

export class HomePage_PopularItems {
  poularItemsTittle: Locator;
  productName: Locator;

  constructor(private page: Page) {
    this.poularItemsTittle = this.page.locator("#popular_items h3");
    // Product page - possible move do product.page.ts
    this.productName = this.page.locator("#Description h1");
  }

  getPopularItems(): PopularItemLocators[] {
    const itemsRoot = this.page.locator(".grid-table div");

    return Array.from({ length: 3 }, (_, i) => {
      const item = itemsRoot.nth(i);
      return {
        image: item.locator("img"),
        name: item.locator(".productName, .roboto-regular"),
        link: item.locator("a"),
      };
    });
  }
}
