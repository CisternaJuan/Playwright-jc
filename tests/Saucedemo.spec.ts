import { test } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';

test('Test Pag Saucedemo', async ({ page }) => {

  const loginPage = new LoginPage(page);

  //Ingreso URL
  await page.goto(process.env.url!);

  //Login
  await loginPage.loginSuccessfulLogin();

  //Escojo producto aleatoriamente
  const productos = await page.locator('#inventory_container .inventory_item').all();
  const randomIndex = Math.floor(Math.random() * productos.length);
  const randomProducto = productos[randomIndex];

  //Escribo el elemento seleccionado
  const nombreProductoRandom = await randomProducto.locator('.inventory_item_name').innerText();
  const descripcionProductoRandom = await randomProducto.locator('.inventory_item_desc').innerText();
  const precioProductoRandom = await randomProducto.locator('.inventory_item_price').innerText();
  console.log(`Nombre: ${nombreProductoRandom} \nDescripcion: ${descripcionProductoRandom} \nPrecio: ${precioProductoRandom}`);  

  await randomProducto.getByRole('button', {name: 'Add to cart'}).click();
});