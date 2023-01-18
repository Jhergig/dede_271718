import { addPedido, getAlmacenes, getPedidos, getProducto, getProductos } from "./api";


test("funcion para añadir direccion", async () => {
        try {
        let dir = await getProductos()
        } catch (error) {}
});

test("funcion para obtener direcciones", async () => {
        try {
        let dir = await getProducto(1)
        } catch (error) {}
});

test("funcion para obtener direcciones", async () => {
    try {
    let dir = await getPedidos(1)
    } catch (error) {}
});

test("funcion para obtener direcciones", async () => {
    try {
    let dir = await getAlmacenes(1)
    } catch (error) {}
});

test("funcion para obtener direcciones", async () => {
    try {
    let dir = await addPedido(1)
    } catch (error) {}
});
