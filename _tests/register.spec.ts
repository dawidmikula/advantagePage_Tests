import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import {
  RegisterPage_AccountDetails,
  RegisterPage_Address,
  RegisterPage_BottomContent,
  RegisterPage_PersonalDetails,
} from "../_pages/register.page";

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

  test("Register - Account Details Text Checking", async ({ page }) => {
    //
    await expect(registerPageAccountDetails.createAccountHeader).toHaveText(
      "CREATE ACCOUNT"
    );
    await expect(registerPageAccountDetails.accountDetailsHeader).toHaveText(
      "ACCOUNT DETAILS"
    );

    await registerPageAccountDetails.checkInputHeaderAndErrorInfo(
      page,
      registerPageAccountDetails.username,
      "Username",
      registerPageAccountDetails.usernameError,
      "Username field is required"
    );
    await registerPageAccountDetails.checkInputHeaderAndErrorInfo(
      page,
      registerPageAccountDetails.email,
      "Email",
      registerPageAccountDetails.emailError,
      "Email field is required"
    );
    await registerPageAccountDetails.checkInputHeaderAndErrorInfo(
      page,
      registerPageAccountDetails.password,
      "Password",
      registerPageAccountDetails.passError,
      "Password field is required"
    );
    await registerPageAccountDetails.checkInputHeaderAndErrorInfo(
      page,
      registerPageAccountDetails.confirmPassword,
      "Confirm password",
      registerPageAccountDetails.confirmPassError,
      "Confirm password field is required"
    );
  });

  test("Register - Account Details Provide Correct Data", async ({ page }) => {
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
    //await registerPageBottomContent.agreeConditionsAndRegister(true, true);
  });

  test("Register - Provide All Correct Informations", async ({ page }) => {
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
