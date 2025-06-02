import { expect, Locator, Page } from "@playwright/test";

export async function linkInNewTabOpenCheck(
  page: Page,
  locator: Locator,
  expectedUrl: string
) {
  if (!expectedUrl || expectedUrl.trim() === "") {
    throw new Error("expectedUrlPart nie może być pusty");
  }

  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    locator.click(),
  ]);

  await newPage.waitForLoadState("domcontentloaded");

  await expect(newPage).toHaveURL(expectedUrl);
}
