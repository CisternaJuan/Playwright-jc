import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { InventoryPage } from '../pages/InventoryPage'

type CustonFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    authenticatedPage: InventoryPage;
}

export const test = base.extend<CustonFixtures>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },

    authenticatedPage: async({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate('/');
        await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
        await loginPage.assertLoginSuccess();

        await use(new InventoryPage(page));
    },

});