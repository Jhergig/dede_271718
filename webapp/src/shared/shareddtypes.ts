export type User = {
    name:string;
    email:string;
  }

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