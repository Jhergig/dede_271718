import { addDireccion, obtenerDirecciones } from "./direcciones";


test("funcion para añadir direccion", async () => {

    try {
        let dir = await addDireccion("https://uo271718-dedeuser1.solidcommunity.net/profile/card#me", {
        calle: 'string',
        ciudad: 'string',
        region: 'string',
        cp: 'string'
    })
    } catch (error) {}
    
});

test("funcion para obtener direcciones", async () => {

    try {
        let dir = await obtenerDirecciones("https://uo271718-dedeuser1.solidcommunity.net/profile/card#me")
    } catch (error) {}
    
});
