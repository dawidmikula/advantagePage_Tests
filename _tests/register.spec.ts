import test from "@playwright/test";
import { faker, Faker } from "@faker-js/faker";
import {
  RegisterPage_AccountDetails,
  RegisterPage_Address,
  RegisterPage_BottomContent,
  RegisterPage_PersonalDetails,
} from "../_pages/register.page";
import { format } from "path";

test.describe("Register", () => {
  let registerPageAccountDetails: RegisterPage_AccountDetails;
  let registerPagePersonalDetails: RegisterPage_PersonalDetails;
  let registerPageAddress: RegisterPage_Address;
  let registerPageBottomContent: RegisterPage_BottomContent;

  test.beforeEach(async ({ page }) => {
    registerPageAccountDetails = new RegisterPage_AccountDetails(page);
    registerPagePersonalDetails = new RegisterPage_PersonalDetails(page);
    registerPageAddress = new RegisterPage_Address(page);
    registerPageBottomContent = new RegisterPage_BottomContent(page);

    await page.goto("/#/register", { waitUntil: "networkidle" });
  });

  test("Register - Correct Account Details", async ({ page }) => {
    const password =
      faker.string.alpha({ casing: "upper" }) +
      faker.string.alpha({ casing: "lower" }) +
      faker.string.numeric(2);

    await registerPageAccountDetails.provideAccountDetailsInRegisterForm(
      faker.internet.username().slice(1, 15),
      faker.internet.email(),
      password,
      password
    );
    await registerPageBottomContent.agreeConditionsAndRegister(true, true);
  });

  test("Register - Provide All Informations", async ({ page }) => {
    const password =
      faker.string.alpha({ casing: "upper" }) +
      faker.string.alpha({ casing: "lower" }) +
      faker.string.numeric(2);

    await registerPageAccountDetails.provideAccountDetailsInRegisterForm(
      faker.internet.username().slice(1, 15),
      faker.internet.email(),
      password,
      password
    );
    await registerPagePersonalDetails.providePersonalDetailsInRegisterForm(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.string.numeric(9)
    );
    await registerPageAddress.provideAddressInRegisterForm(
      "Poland",
      faker.location.city(),
      faker.location.streetAddress(),
      faker.location.state(),
      faker.location.zipCode()
    );
    await registerPageBottomContent.agreeConditionsAndRegister(true, true);
  });
});
