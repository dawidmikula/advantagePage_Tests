import test, { expect } from "@playwright/test";
import { AboutPage } from "../_pages/about.page";

test.describe("About Page", () => {
  let aboutPage: AboutPage;

  test.beforeEach(async ({ page }) => {
    aboutPage = new AboutPage(page);
    await page.goto("/#/about", { waitUntil: "networkidle" });
  });

  test("About Page - Page Check", async ({ page }) => {
    await expect(aboutPage.navigationPath).toHaveText("ABOUT");
    await expect(aboutPage.aboutHeader).toHaveText("ABOUT");
    await expect(aboutPage.aboutContentPartOne).toHaveText(
      "Advantage Online Shopping (AOS) is a fictional company used by OpenText as the “application under test” during customer-facing product demonstrations."
    );
    await expect(aboutPage.aboutContentPartTwo).toHaveText(
      "Its primary assets are a fully-functional website and a mobile client, each designed using modern programming practices, focusing on high quality and scalability.  AOS is built using DevOps practices, specifically Agile backlog management and continuous testing, including functional, non-functional, performance and security testing."
    );

    await expect(aboutPage.avaliableDevicesHeader).toHaveText(
      "THE APPLICATION IS AVAILABLE IN 3 FORM FACTORS:"
    );
    await expect(aboutPage.webDevice).toHaveText("WEB");
    await expect(aboutPage.webDeviceDesc).toHaveText(
      "For computers(Windows and Docker)"
    );
    await expect(aboutPage.webDeviceSvg).toBeVisible();
    await expect(aboutPage.mobileWebDevide).toHaveText("MOBILE WEB");
    await expect(aboutPage.mobileWebDevideDesc).toHaveText(
      "Opening a browser on amobile device"
    );
    await expect(aboutPage.mobileWebDevideSvg).toBeVisible();

    await expect(aboutPage.nativeMobileDevice).toHaveText("NATIVE MOBILE");
    await expect(aboutPage.nativeMobileDeviceDesc).toHaveText(
      "Android and iOS"
    );
    await expect(aboutPage.nativeMobileDeviceSvg).toBeVisible();

    await expect(aboutPage.importantNote).toHaveText(
      "Important Note: Advantage Online Shopping is not an actual shopping site.  It is purely used for demonstration purposes. for any inquiry, please contact adm_demo_app_development@microfocus.com"
    );
  });
});
