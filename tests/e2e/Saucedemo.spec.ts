import { TestUsers } from '../../data/users';
import { test } from '../../fixtures';

test.describe('Saucedemo - Flujo de compra', () => {
    
    test('Login exitoso', async ({ loginPage}) => {

        await loginPage.navigate('/');
        await loginPage.login(TestUsers.standard.username, TestUsers.standard.password);
        await loginPage.assertLoginSuccess();
    });

    test('Agregar producto aleatorio al carro', async ({ authenticatedPage }) => {

        const producto = await authenticatedPage.getRandomProduct();
        console.log(`Nombre: ${producto.nombre} \nDescripcion: ${producto.descripcion} \nPrecio: ${producto.precio}`);

        // Agrego al carrito
        await authenticatedPage.addToCart(producto.elemento);

        // Verifico carrito
        await authenticatedPage.assertCartCount('1');
    })

});