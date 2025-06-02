import { Locator, Page } from "@playwright/test";

export class Footer {
  followUs: Locator;
  fbIcon: Locator;
  twitterIcon: Locator;
  lnIcon: Locator;
  copyright: Locator;

  constructor(private page: Page) {
    this.followUs = this.page.getByRole("heading", { name: "FOLLOW US" });
    this.fbIcon = this.page.locator('#follow [name="follow_facebook"]');
    this.twitterIcon = this.page.locator('#follow [name="follow_twitter"]');
    this.lnIcon = this.page.locator('#follow [name="follow_linkedin"]');
    this.copyright = this.page.locator("footer label");
  }
}
