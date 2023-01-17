import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Producto } from "../shared/shareddtypes";
import ProductoCard from "./ProductoCard";


test("ProductoCard renders correctly", () => {

    const { getByText } = render(<BrowserRouter><ProductoCard producto={{ id: 1, nombre: 'prueba', precio: 5, peso: 2, descripcion: 'prueba' } as Producto} ></ProductoCard></BrowserRouter>);

    expect(getByText("prueba")).toBeInTheDocument();
    expect(getByText("Añadir a la cesta")).toBeInTheDocument();

});
