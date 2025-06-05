import test from "@playwright/test";
import { RegisterPage } from "../_pages/register.page";

test.describe("Register", () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto("/#/register", { waitUntil: "networkidle" });
  });

  test("Register - Provide Account Details", async ({ page }) => {
    await registerPage.provideAccountDetailsInRegisterForm(
      "aaaaaa",
      "aaa@aa.pl",
      "111Aa",
      "111Aa"
    );
    await registerPage.agreeConditionsAndRegister();
  });
});
