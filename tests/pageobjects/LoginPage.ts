import { Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly loginButton: Locator;
    
    constructor(page: Page) {
        this.usernameTextbox = page.getByRole('textbox', {name: 'Username'});
        this.passwordTextbox = page.getByRole('textbox', {name: 'Password'});
        this.loginButton = page.getByRole('button', {name: 'Login'});
    }

    async loginSuccessfulLogin(){
        await this.usernameTextbox.fill(process.env.user!);
        await this.passwordTextbox.fill(process.env.password!);
        await this.loginButton.click();
        // Espera 3 segundos (3000 milisegundos)
        await this.loginButton.page().waitForTimeout(3000);
    }
}
