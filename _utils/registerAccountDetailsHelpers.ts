import { faker } from "@faker-js/faker";
import { expect, Locator } from "@playwright/test";

export const generateValidPassword = () =>
  faker.string.alpha({ casing: "upper" }) +
  faker.string.alpha({ casing: "lower" }) +
  faker.string.numeric(2);

async function fillAndBlur(inputLocator: Locator, valueToEnter: string) {
  await inputLocator.fill(valueToEnter);
  await inputLocator.blur();
}

export async function checkValidation(
  inputLocator: Locator,
  labelLocator: Locator,
  steps: { valueToInput: string; expectedLabelText: string }[]
) {
  for (const { valueToInput, expectedLabelText } of steps) {
    await fillAndBlur(inputLocator, valueToInput);
    await expect(labelLocator).toHaveText(expectedLabelText);
  }
}
