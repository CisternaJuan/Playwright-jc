import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test('Test Pag Saucedemo', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Navego a SauceDemo
  await loginPage.navigate('/');

  //Login
  await loginPage.login('standard_user','secret_sauce');
  await loginPage.assertLoginSuccess();

  // Producto aleatorio
  const producto = await inventoryPage.getRandomProduct();
  console.log(`Nombre: ${producto.nombre} \nDescripcion: ${producto.descripcion} \nPrecio: ${producto.precio}`);  

  // Agrego al carrito
  await inventoryPage.addToCart(producto.elemento);

  // Verifico carrito
  await inventoryPage.assertCartCount('1');
});