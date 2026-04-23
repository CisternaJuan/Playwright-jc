import { expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    
    constructor(page: any) {
        super(page); // <- le pasa page a BasePage
        this.usernameTextbox = page.getByRole('textbox', {name: 'Username'});
        this.passwordTextbox = page.getByRole('textbox', {name: 'Password'});
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async login(username: string, password: string) {
        await this.usernameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }

    async assertLoginSuccess() {
        await expect(this.page).toHaveURL(/inventory/);
    }

    async assertErrorLogin(message: string) {
        await expect(this.errorMessage).toContainText(message);
    }
}
