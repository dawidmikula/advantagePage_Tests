import { test, expect } from "@playwright/test";
import {
  HomePage_ContactUs,
  HomePage_PopularItems,
  HomePage_SpecialOffer,
} from "../_pages/home.page";
import { categoriesWithProducts } from "../_testData/categoriesToContactUs";
import {
  popularItems,
  popularItemsAfterClick,
} from "../_testData/popularItems";
import { ProductPage } from "../_pages/product.page";

test.describe("Home Page - Popular Items", () => {
  let homePage: HomePage_PopularItems;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage_PopularItems(page);
    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("Popular Items - Popular Items Checking", async ({ page }) => {
    await expect(homePage.poularItemsTittle).toHaveText("POPULAR ITEMS");

    const items = homePage.getPopularItems();

    for (const [i, item] of items.entries()) {
      await expect(item.image).toBeVisible();
      await expect(item.name).toBeVisible();
      await expect(item.name).not.toHaveText("");
      await expect(item.link).toBeVisible();
      await expect(item.link).toHaveText("View Details");

      const productName = await item.name.innerText();
      expect(productName.trim()).toBe(popularItems[i]);
    }
  });

  test("Popular Items - Products open", async ({ page }) => {
    let productPage: ProductPage;
    productPage = new ProductPage(page);

    const items = homePage.getPopularItems();

    for (const [i, item] of items.entries()) {
      await item.link.click();
      await expect(productPage.productName).toHaveText(
        popularItemsAfterClick[i]
      );
      await page.goBack();
      await expect(homePage.poularItemsTittle).toBeVisible();
    }
  });
});

test.describe("Home Page - Contact Us", () => {
  let homePage: HomePage_ContactUs;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage_ContactUs(page);
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

test.describe("Home Page - Special Offer", () => {
  let homePage: HomePage_SpecialOffer;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage_SpecialOffer(page);
    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("Special Offer - Checking", async ({ page }) => {
    let productPage: ProductPage;
    productPage = new ProductPage(page);

    await expect(homePage.specialOfferHeader).toHaveText("SPECIAL OFFER");
    await expect(homePage.specialOfferProductHeader).toHaveText(
      "EXPLORE THE NEW DESIGN"
    );
    const specialOfferProductName =
      await homePage.specialOfferProductName.innerText();
    expect(specialOfferProductName).toBe("HP Pavilion 15z Touch Laptop");
    await expect(homePage.specialOfferProductDesc).toHaveText(
      "Supremely thin, yet incredibly durable"
    );
    await expect(homePage.specialOfferSeeOfferButton).toHaveText("SEE OFFER");
    await page.waitForTimeout(1000);
    await expect(homePage.specialOfferImg).toBeVisible();

    await homePage.specialOfferSeeOfferButton.click();
    await expect(productPage.productName).toHaveText(
      new RegExp(specialOfferProductName, "i")
    );
  });
});
