import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import {
  RegisterPage_AccountDetails,
  RegisterPage_Address,
  RegisterPage_BottomContent,
  RegisterPage_PersonalDetails,
} from "../_pages/register.page";
import {
  checkValidation,
  generateValidPassword,
} from "../_utils/registerAccountDetailsHelpers";

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
    await expect(registerPageAccountDetails.createAccountHeader).toHaveText(
      "CREATE ACCOUNT"
    );
    await expect(registerPageAccountDetails.accountDetailsHeader).toHaveText(
      "ACCOUNT DETAILS"
    );

    await registerPageAccountDetails.checkInputHeaderAndErrorInfo(
      page,
      registerPageAccountDetails.usernameLabel,
      "Username",
      registerPageAccountDetails.usernameLabel,
      "Username field is required"
    );
    await registerPageAccountDetails.checkInputHeaderAndErrorInfo(
      page,
      registerPageAccountDetails.emailLabel,
      "Email",
      registerPageAccountDetails.emailLabel,
      "Email field is required"
    );
    await registerPageAccountDetails.checkInputHeaderAndErrorInfo(
      page,
      registerPageAccountDetails.passwordLabel,
      "Password",
      registerPageAccountDetails.passwordLabel,
      "Password field is required"
    );
    await registerPageAccountDetails.checkInputHeaderAndErrorInfo(
      page,
      registerPageAccountDetails.confirmPasswordLabel,
      "Confirm password",
      registerPageAccountDetails.confirmPasswordLabel,
      "Confirm password field is required"
    );
  });

  test("Register - Personal Details Text Checking", async ({ page }) => {
    await expect(registerPagePersonalDetails.personalDetailsHeader).toHaveText(
      "PERSONAL DETAILS"
    );
    await expect(registerPagePersonalDetails.firstName).toHaveText(
      "First Name"
    );
    await expect(registerPagePersonalDetails.lastName).toHaveText("Last Name");
    await expect(registerPagePersonalDetails.phoneNumber).toHaveText(
      "Phone Number"
    );
  });

  test("Register - Address Text Checking ", async ({ page }) => {
    await expect(registerPageAddress.addressHeader).toHaveText("ADDRESS");
    await expect(registerPageAddress.country).toHaveText("Country");
    await expect(registerPageAddress.city).toHaveText("City");
    await expect(registerPageAddress.address).toHaveText("Address");
    await expect(registerPageAddress.state).toHaveText(
      "State / Province / Region"
    );
    await expect(registerPageAddress.postalCode).toHaveText("Postal Code");
  });

  test("Register - Bottom Text Checking ", async ({ page }) => {
    await expect(registerPageBottomContent.mailingConsent).toHaveText(
      "Receive exclusive offers and promotions from Advantage"
    );
    await expect(registerPageBottomContent.agreeConditions).toHaveText(
      "I agree to the www.AdvantageOnlineShopping.com Conditions of Use and Privacy Notice"
    );
    await expect(registerPageBottomContent.alreadyHaveAccount).toHaveText(
      "ALREADY HAVE AN ACCOUNT?"
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
    await registerPageBottomContent.agreeConditionsAndRegister(true, true);
  });

  test("Register - Account Details Provide Incorrect Username", async () => {
    const password = generateValidPassword();

    await registerPageAccountDetails.provideAccountDetailsInRegisterForm(
      "",
      faker.internet.email(),
      password,
      password
    );

    await expect(registerPageAccountDetails.usernameLabel).toHaveText(
      "Username field is required"
    );

    const usernameSteps = [
      {
        valueToInput: faker.internet.username().slice(1, 4),
        expectedLabelText: "Use 5 character or longer",
      },
      {
        valueToInput: "Long123456789012",
        expectedLabelText: "Use maximum 15 character",
      },
    ];

    await checkValidation(
      registerPageAccountDetails.usernameInput,
      registerPageAccountDetails.usernameLabel,
      usernameSteps
    );
  });

  test("Register - Account Details Provide Incorrect Email", async () => {
    const password = generateValidPassword();

    await registerPageAccountDetails.provideAccountDetailsInRegisterForm(
      faker.internet.username().slice(1, 15),
      "",
      password,
      password
    );
    await expect(registerPageAccountDetails.emailLabel).toHaveText(
      "Email field is required"
    );

    const emailSteps = [
      {
        valueToInput: "test",
        expectedLabelText: "Your email address isn't formatted correctly",
      },
      {
        valueToInput: "test@",
        expectedLabelText: "Your email address isn't formatted correctly",
      },
      {
        valueToInput: "test@o",
        expectedLabelText: "Your email address isn't formatted correctly",
      },
      {
        valueToInput: "test@op",
        expectedLabelText: "Your email address isn't formatted correctly",
      },
      {
        valueToInput: "test@op.",
        expectedLabelText: "Your email address isn't formatted correctly",
      },
      {
        valueToInput: "test@op.p",
        expectedLabelText: "Your email address isn't formatted correctly",
      },
      { valueToInput: "test@op.pl", expectedLabelText: "Email" },
    ];

    await checkValidation(
      registerPageAccountDetails.emailInput,
      registerPageAccountDetails.emailLabel,
      emailSteps
    );
  });

  // Analogicznie dla hasła i potwierdzenia hasła:

  test("Register - Account Details Provide Incorrect Password", async () => {
    await registerPageAccountDetails.provideAccountDetailsInRegisterForm(
      faker.internet.username().slice(1, 15),
      faker.internet.email(),
      "",
      "Aaa1"
    );

    await expect(registerPageAccountDetails.passwordLabel).toHaveText(
      "Password field is required"
    );

    const passwordSteps = [
      { valueToInput: "Tes", expectedLabelText: "Use  4 character or longer" },
      { valueToInput: "Test", expectedLabelText: "One number required" },
      { valueToInput: "tes1", expectedLabelText: "One upper letter required" },
      { valueToInput: "TEST", expectedLabelText: "One lower letter required" },
      {
        valueToInput: "Test123456789",
        expectedLabelText: "Use maximum 12 character",
      },
      { valueToInput: "Tes1", expectedLabelText: "Password" },
    ];

    await checkValidation(
      registerPageAccountDetails.passInput,
      registerPageAccountDetails.passwordLabel,
      passwordSteps
    );
  });

  test("Register - Account Details Provide Incorrect Confirm Password", async () => {
    await registerPageAccountDetails.provideAccountDetailsInRegisterForm(
      faker.internet.username().slice(1, 15),
      faker.internet.email(),
      "Aaa1",
      ""
    );
    await registerPageAccountDetails.confirmPassInput.blur();
    await expect(registerPageAccountDetails.confirmPasswordLabel).toHaveText(
      "Confirm password field is required"
    );

    const confirmSteps = [
      { valueToInput: "Aaa2", expectedLabelText: "Passwords do not match" },
      { valueToInput: "Aaa1", expectedLabelText: "Confirm password" },
    ];

    await checkValidation(
      registerPageAccountDetails.confirmPassInput,
      registerPageAccountDetails.confirmPasswordLabel,
      confirmSteps
    );
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
      faker.person.firstName().slice(2, 30),
      faker.person.lastName().slice(2, 30),
      faker.string.numeric(9)
    );
    await registerPageAddress.provideAddressInRegisterForm(
      "Poland",
      faker.location.city().slice(1, 25),
      faker.location.streetAddress().slice(1, 50),
      faker.location.state().slice(1, 10),
      faker.location.zipCode().slice(1, 10)
    );
    await registerPageBottomContent.agreeConditionsAndRegister(true, true);
  });
});
