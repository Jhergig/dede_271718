import { act, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Compra from "./Compra";
import * as solid from "../api/solidSession";
import * as direc from "../api/direcciones";
import { Direccion } from "../shared/shareddtypes";

jest.mock("../api/solidSession")
jest.mock("../api/direcciones")

test("Compra renders correctly", async() => {

    jest.spyOn(solid, 'getWebId').mockImplementation((): string => 'prueba#deprueba')
    jest.spyOn(solid, 'isLoggedIn').mockImplementation((): boolean => true)
    jest.spyOn(direc, 'obtenerDirecciones').mockImplementation((): Promise<Direccion[]> => Promise.resolve([]))

    await act(async() => {
        const { getByText } = render(<BrowserRouter><Compra nombre={"test1"} /></BrowserRouter>);

        expect(getByText("Comprar")).toBeInTheDocument();
    });

});
