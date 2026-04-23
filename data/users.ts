// Datos de prueba para los usuarios
export const TestUsers = {

    standard: {
        username: process.env.USERNAME ?? 'standard_user',
        password: process.env.PASSWORD ?? 'secret_sauce',
    },
} as const;