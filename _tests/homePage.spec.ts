import { test, expect } from "@playwright/test";
import { HomePage } from "../_pages/home.page";
import { categoriesWithProducts } from "../_testData/categoriesToContactUs";

test.describe("Home Page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("Contact Us - Empty", async ({ page }) => {
    await expect(homePage.contactUs).toHaveText("CONTACT US");
    await homePage.selectCategory.selectOption({ label: "Laptops" });
    await homePage.selectProduct.selectOption({
      label: "HP Chromebook 14 G1(ES)",
    });
    await homePage.contactEmail.click();
    await homePage.subjectContactUs.click();
    await expect(homePage.emailError).toHaveText("Email field is required");
    await homePage.subjectContactUs.blur();
    await expect(homePage.subjectContactUsError).toHaveText(
      "Email field is required" // Incorrect errror message on webpage
    );
  });

  test("Contact Us - Incorrect email address - validation check", async ({
    page,
  }) => {
    await homePage.selectCategory.selectOption({ label: "Laptops" });
    await homePage.selectProduct.selectOption({
      label: "HP Chromebook 14 G1(ES)",
    });
    await homePage.subjectContactUs.fill("Content");

    const emailSteps = [
      "test",
      "test@",
      "test@t",
      "test@test",
      "test@test.",
      "test@test.p",
      "test@test.pl",
    ];

    for (const email of emailSteps) {
      await homePage.contactEmail.fill(email);
      await homePage.sendButton.click();

      if (email !== emailSteps[emailSteps.length - 1]) {
        await expect(homePage.invalidEmail).toBeVisible();
        await expect(homePage.invalidEmail).toHaveText(
          "Invalid e-mail address."
        );
      } else {
        await expect(homePage.invalidEmail).not.toBeVisible();
      }
      await page.waitForTimeout(3500);
    }
  });

  test("Contact Us - Correct completion of fields", async ({ page }) => {
    await homePage.selectCategory.selectOption({ label: "Laptops" });
    await homePage.selectProduct.selectOption({
      label: "HP Chromebook 14 G1(ES)",
    });
    await homePage.contactEmail.fill("test@test.pl");
    await homePage.subjectContactUs.fill("Content");
    await homePage.sendButton.click();

    await expect(homePage.contactSuccessHeader).toHaveText(
      "Thank you for contacting Advantage support."
    );
    await expect(homePage.contactSuccessButton).toHaveText("CONTINUE SHOPPING");
    await homePage.contactSuccessButton.click();
  });

  test("Contact Us - all categ", async ({ page }) => {
    for (const [category, expectedProducts] of Object.entries(
      categoriesWithProducts
    )) {
      await homePage.selectCategory.selectOption({ label: category });

      // List should contain product from file
      await expect(homePage.selectProduct).toContainText(expectedProducts[1], {
        timeout: 5000,
      });

      const actualOptions = await homePage.selectProduct
        .locator("option")
        .allTextContents();

      for (const expectedProduct of expectedProducts) {
        expect(actualOptions).toContain(expectedProduct);
      }
    }
  });
});
