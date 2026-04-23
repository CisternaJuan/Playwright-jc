import { Page } from "@playwright/test";

export class BasePage {
    constructor(protected readonly page: Page) {}

    // Ir a Url, cualquiera que necesite
    async navigate(path: string = '') {
        await this.page.goto(path);
    }

    // Valido que página cargue. Networkidle: valida que la página cargó completamente
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }
    
    // Extraigo el título de la página
    async getTitle(): Promise<string> {
        return this.page.title();
    }
}