import { expect, Locator, Page } from "@playwright/test";

export class AboutPage {
  navigationPath: Locator;
  aboutHeader: Locator;
  aboutContentPartOne: Locator;
  aboutContentPartTwo: Locator;
  avaliableDevicesHeader: Locator;

  webDevice: Locator;
  webDeviceDesc: Locator;
  webDeviceSvg: Locator;
  mobileWebDevide: Locator;
  mobileWebDevideDesc: Locator;
  mobileWebDevideSvg: Locator;
  nativeMobileDevice: Locator;
  nativeMobileDeviceDesc: Locator;
  nativeMobileDeviceSvg: Locator;

  importantNote: Locator;

  constructor(private page: Page) {
    this.navigationPath = this.page.locator(".pages a").last();
    this.aboutHeader = this.page.getByRole("heading", { name: "ABOUT" });

    this.aboutContentPartOne = this.page
      .locator('[class="aboutPagePaddingCaption"] span')
      .getByText("Advantage Online Shopping (AOS)");
    this.aboutContentPartTwo = this.page
      .locator('[class="aboutPagePaddingCaption"] span')
      .getByText("Its primary assets are a");
    this.avaliableDevicesHeader = this.page
      .locator('[class="aboutPagePaddingCaption"] span')
      .getByText("THE APPLICATION");

    this.webDevice = this.page.locator("#threeFormFactorsWeb span");
    this.webDeviceDesc = this.page.locator("#threeFormFactorsWeb p");
    this.webDeviceSvg = this.page.locator("#threeFormFactorsWeb svg");

    this.mobileWebDevide = this.page.locator("#threeFormFactorsWebMobile span");
    this.mobileWebDevideDesc = this.page.locator("#threeFormFactorsWebMobile p");
    this.mobileWebDevideSvg = this.page.locator("#threeFormFactorsWebMobile svg");

    this.nativeMobileDevice = this.page.locator("#threeFormFactorsNativeMobile span");
    this.nativeMobileDeviceDesc = this.page.locator("#threeFormFactorsNativeMobile p");
    this.nativeMobileDeviceSvg = this.page.locator("#threeFormFactorsNativeMobile svg");

    this.importantNote = this.page.getByText("Important Note: Advantage");
  }
}
