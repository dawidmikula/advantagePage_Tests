import { Locator, Page } from "@playwright/test";
//    ACCOUNT DETAILS    //
export class RegisterPage_AccountDetails {
  createAccountHeader: Locator;

  accountDetailsHeader: Locator;
  username: Locator;
  usernameError: Locator;
  email: Locator;
  emailError: Locator;
  password: Locator;
  passError: Locator;
  passReq: Locator;
  confirmPassword: Locator;
  confirmPassError: Locator;
  confirmPassReq: Locator;

  constructor(private page: Page) {
    this.createAccountHeader = this.page.getByRole("heading", {
      name: "CREATE ACCOUNT",
    });
    const accountDetailsLocator = page.getByText("ACCOUNT DETAILS *");
    this.accountDetailsHeader = accountDetailsLocator.getByRole("heading", {
      name: "ACCOUNT DETAILS",
    });
    this.username = accountDetailsLocator.locator('[sec-name="userName"] label');
    this.usernameError = accountDetailsLocator.getByText("Username field is required");

    this.email = accountDetailsLocator.locator('[sec-name="userEmail"] label');
    this.emailError = accountDetailsLocator.getByText("Email field is required");

    this.password = accountDetailsLocator.locator('[sec-name="userPassword"] [a-hint="Password"] label');
    this.passError = accountDetailsLocator.getByText("Password field is required");
    this.passReq = accountDetailsLocator.locator('[sec-name="userPassword"] [a-hint="Password"] ul');

    this.confirmPassword = accountDetailsLocator.locator('[sec-name="userPassword"] [a-hint="Confirm password"] label');
    this.confirmPassError = accountDetailsLocator.getByText("Confirm password field is");
    this.confirmPassReq = accountDetailsLocator.locator('[sec-name="userPassword"] [a-hint="Confirm password"] ul');
  }

  usernameInput: Locator;
  emailInput: Locator;
  passInput: Locator;
  confirmPassInput: Locator;

  async provideAccountDetailsInRegisterForm(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    this.usernameInput = this.page.locator('input[name="usernameRegisterPage"]');
    this.emailInput = this.page.locator('input[name="emailRegisterPage"]');
    this.passInput = this.page.locator('input[name="passwordRegisterPage"]');
    this.confirmPassInput = this.page.locator('input[name="confirm_passwordRegisterPage"]');

    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passInput.fill(password);
    await this.confirmPassInput.fill(confirmPassword);
  }
}
//    PERSONAL DETAILS    //
export class RegisterPage_PersonalDetails {
  constructor(private page: Page) {
    //
  }

  firstNameInput: Locator;
  lastNameInput: Locator;
  phoneNumberInput: Locator;

  async providePersonalDetailsInRegisterForm(firstName: string, lastName: string, phoneNumber: string) {
    this.firstNameInput = this.page.locator('input[name="first_nameRegisterPage"]');
    this.lastNameInput = this.page.locator('input[name="last_nameRegisterPage"]');
    this.phoneNumberInput = this.page.locator('input[name="phone_numberRegisterPage"]');

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.phoneNumberInput.fill(phoneNumber);
  }
}

//    ADDRESS    //
export class RegisterPage_Address {
  constructor(private page: Page) {
    //
  }

  countrySelect: Locator;
  cityInput: Locator;
  addressInput: Locator;
  stateInput: Locator;
  postalCodeInput: Locator;

  async provideAddressInRegisterForm(
    country: string,
    city: string,
    address: string,
    state: string,
    postalCode: string
  ) {
    this.countrySelect = this.page.locator('select[name="countryListboxRegisterPage"]');
    this.cityInput = this.page.locator('input[name="cityRegisterPage"]');
    this.addressInput = this.page.locator('input[name="addressRegisterPage"]');
    this.stateInput = this.page.locator('input[name="state_/_province_/_regionRegisterPage"]');
    this.postalCodeInput = this.page.locator('input[name="postal_codeRegisterPage"]');

    await this.countrySelect.selectOption({ label: country });
    await this.cityInput.fill(city);
    await this.addressInput.fill(address);
    await this.stateInput.fill(state);
    await this.postalCodeInput.fill(postalCode);
  }
}

//    BOTTOM    //
export class RegisterPage_BottomContent {
  userAlreadyExistError: Locator;
  alreadyHaveAccount: Locator;

  constructor(private page: Page) {
    this.userAlreadyExistError = this.page.getByText("User name already exists");
    this.alreadyHaveAccount = this.page.getByRole("link", { name: "ALREADY HAVE AN ACCOUNT?" });
  }
  mailingConsentCheckbox: Locator;
  agreeConditionsCheckbox: Locator;
  registerButton: Locator;

  async agreeConditionsAndRegister(mailingConsentCheckbox: boolean, agreeConditionsCheckbox: boolean) {
    this.mailingConsentCheckbox = this.page.locator('input[name="allowOffersPromotion"]');
    this.agreeConditionsCheckbox = this.page.locator('input[name="i_agree"]');
    this.registerButton = this.page.getByRole("button", { name: "REGISTER" });

    if (mailingConsentCheckbox) {
      await this.mailingConsentCheckbox.check();
    } else {
      await this.mailingConsentCheckbox.uncheck();
    }
    if (agreeConditionsCheckbox) {
      await this.agreeConditionsCheckbox.check();
    } else {
      await this.agreeConditionsCheckbox.uncheck();
    }
    await this.registerButton.click();
  }
}
