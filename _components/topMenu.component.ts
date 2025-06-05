import { Locator, Page } from "@playwright/test";

export class TopMenu {
  brandLogo: Locator;
  ourProducts: Locator;
  specialOffer: Locator;
  popularItems: Locator;
  contactUs: Locator;
  searchIcon: Locator;
  searchInput: Locator;
  searchClose: Locator;
  userIcon: Locator;
  shoppingCart: Locator;
  helpIcon: Locator;

  helpAbout: Locator;
  helpADSVersion: Locator;
  helpManagementConsole: Locator;

  constructor(private page: Page) {
    this.brandLogo = this.page.getByRole("link", { name: "dvantage DEMO" });
    this.ourProducts = this.page.getByRole("link", { name: "OUR PRODUCTS" });
    this.specialOffer = this.page.getByRole("link", { name: "SPECIAL OFFER" });
    this.popularItems = this.page.getByRole("link", { name: "POPULAR ITEMS" });
    this.contactUs = this.page.getByRole("link", { name: "CONTACT US" });
    this.searchIcon = this.page.getByTitle("SEARCH");
    this.searchInput = this.page.locator("#search input");
    this.searchClose = this.page.locator("#search img");
    this.userIcon = this.page.getByRole("link", { name: "UserMenu" });
    this.shoppingCart = this.page.getByRole("link", { name: "ShoppingCart" });
    this.helpIcon = this.page.locator("#helpLink");

    this.helpAbout = this.page.getByRole("link", {
      name: "About",
      exact: true,
    });
    this.helpADSVersion = this.page.getByRole("link", {
      name: "AOS Versions",
      exact: true,
    });
    this.helpManagementConsole = this.page.getByRole("link", {
      name: "Management Console",
      exact: true,
    });
  }
}

// await page.getByTitle('SEARCH').click();
// await page.locator('a').filter({ hasText: 'CATEGORIES TOP RESULTS FOR' }).click();
// await page.locator('a').filter({ hasText: 'CATEGORIES TOP RESULTS FOR' }).click();
