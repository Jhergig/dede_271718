export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  peso: number;
  descripcion: string;
}

export type Direccion = {
  calle: string;
  ciudad: string;
  region: string;
  cp: string;
}

export type Almacen = {
  idProducto: number;
  almacen: string;
  cantidad: number;
  zona: string;
}

export type Pedido = {
  _id: string;
  webid: string;
  idProducto: number;
  nombreProducto: string,
  cantidad: number,
  precio: number,
  almacen: string,
  envio: number, 
  estado: string 
}