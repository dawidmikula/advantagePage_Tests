import { Locator, Page } from "@playwright/test";

export class RegisterPage {
  createAccountHeader: Locator;
  accountDetailsHeader: Locator;
  username: Locator;
  usernameInput: Locator;
  usernameError: Locator;
  email: Locator;
  emailInput: Locator;
  emailError: Locator;
  password: Locator;
  passInput: Locator;
  passError: Locator;
  passReq: Locator;
  confirmPassword: Locator;
  confirmPassInput: Locator;
  confirmPassError: Locator;
  confirmPassReq: Locator;

  // Consents and Register button
  mailingConsentCheckbox: Locator;
  agreeConditionsCheckbox: Locator;
  registerButton: Locator;

  constructor(private page: Page) {
    // Page header
    this.createAccountHeader = this.page.getByRole("heading", {
      name: "CREATE ACCOUNT",
    });
    // Account Details
    const accountDetailsLocator = page.getByText("ACCOUNT DETAILS *");
    this.accountDetailsHeader = accountDetailsLocator.getByRole("heading", {
      name: "ACCOUNT DETAILS",
    });
    this.username = accountDetailsLocator.locator('[sec-name="userName"] label');
    this.usernameInput = accountDetailsLocator.locator('input[name="usernameRegisterPage"]');
    this.usernameError = accountDetailsLocator.getByText("Username field is required");

    this.email = accountDetailsLocator.locator('[sec-name="userEmail"] label');
    this.emailInput = accountDetailsLocator.locator('input[name="emailRegisterPage"]');
    this.emailError = accountDetailsLocator.getByText("Email field is required");

    this.password = accountDetailsLocator.locator('[sec-name="userPassword"] [a-hint="Password"] label');
    this.passInput = accountDetailsLocator.locator('input[name="passwordRegisterPage"]');
    this.passError = accountDetailsLocator.getByText("Password field is required");
    this.passReq = accountDetailsLocator.locator('[sec-name="userPassword"] [a-hint="Password"] ul');

    this.confirmPassword = accountDetailsLocator.locator('[sec-name="userPassword"] [a-hint="Confirm password"] label');
    this.confirmPassInput = accountDetailsLocator.locator('input[name="confirm_passwordRegisterPage"]');
    this.confirmPassError = accountDetailsLocator.getByText("Confirm password field is");
    this.confirmPassReq = accountDetailsLocator.locator('[sec-name="userPassword"] [a-hint="Confirm password"] ul');

    // Consents and Register button
    this.mailingConsentCheckbox = this.page.locator('input[name="allowOffersPromotion"]');
    this.agreeConditionsCheckbox = this.page.locator('input[name="i_agree"]');
    this.registerButton = this.page.getByRole("button", { name: "REGISTER" });
  }

  async provideAccountDetailsInRegisterForm(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passInput.fill(password);
    await this.confirmPassInput.fill(confirmPassword);
  }

  async agreeConditionsAndRegister() {
    await this.agreeConditionsCheckbox.check();
    await this.registerButton.click();
  }
}
