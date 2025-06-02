import { test, expect } from "@playwright/test";
import { Footer } from "../_components/footer.component";
import { linkInNewTabOpenCheck } from "../_utils/linkInNewTabOpenCheck";

test.describe("Footer Page", () => {
  let footer: Footer;

  test.beforeEach(async ({ page }) => {
    footer = new Footer(page);
    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("Footer - visual test", async ({ page }) => {
    await expect(footer.followUs).toHaveText("FOLLOW US");

    await expect(footer.fbIcon).toBeVisible();
    await expect(footer.twitterIcon).toBeVisible();
    await expect(footer.lnIcon).toBeVisible();

    await expect(footer.copyright).toHaveText(
      " © Advantage Inc, 2024. Release 3.3 "
    );
  });

  test("Footer - socials check", async ({ page }) => {
    await linkInNewTabOpenCheck(
      page,
      footer.fbIcon,
      "https://www.facebook.com/MicroFocus/"
    );
    await linkInNewTabOpenCheck(
      page,
      footer.twitterIcon,
      "https://x.com/i/flow/login?redirect_after_login=%2FMicroFocus"
    );
    await linkInNewTabOpenCheck(
      page,
      footer.lnIcon,
      "https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F1024%3Ftrk%3Dtyah%26trkInfo%3DclickedVertical%253Ashowcase%252CclickedEntityId%253A1024%252Cidx%253A2-1-2%252CtarId%253A145431482.327%252Ctas%253Ahewlett%2520packard%2520enterprise%2520software"
    );
  });
});
