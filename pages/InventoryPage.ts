import { expect , Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    private readonly inventoryItems: Locator;
    private readonly cartBadge: Locator;

    constructor(page: any) {
        super(page);
        this.inventoryItems = page.locator('#inventory_container .inventory_item');
        this.cartBadge = page.locator('.shopping_cart_link');
    }

    // Escojo producto random
    async getRandomProduct() {
        const productos = await this.inventoryItems.all();
        const randomIndex = Math.floor(Math.random() * productos.length);
        const producto = productos[randomIndex];

        return {
            nombre: await producto.locator('.inventory_item_name').innerText(),
            descripcion: await producto.locator('.inventory_item_desc').innerText(),
            precio: await producto.locator('.inventory_item_price').innerText(),
            elemento: producto,
        };
    }

    // Agrego al carro
    async addToCart(productElement: Locator) {
        await productElement.getByRole('button', {name: 'Add to cart'}).click();
    }

    // Valido numero en el icono del carro
    async assertCartCount(count: string) {
        await expect(this.cartBadge).toHaveText(count);
    }
}