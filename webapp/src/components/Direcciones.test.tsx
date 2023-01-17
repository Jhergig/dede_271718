import { act, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import * as solid from "../api/solidSession";
import * as direc from "../api/direcciones";
import { Direccion } from "../shared/shareddtypes";
import Direcciones from "./Direcciones";

jest.mock("../api/solidSession")
jest.mock("../api/direcciones")

test("Direcciones renders correctly", async () => {

    jest.spyOn(solid, 'getName').mockImplementation((_webid:string): Promise<string> => Promise.resolve("prueba"))
    jest.spyOn(solid, 'isLoggedIn').mockImplementation((): boolean => true)
    jest.spyOn(direc, 'obtenerDirecciones').mockImplementation((): Promise<Direccion[]> => Promise.resolve([{
        calle: 'string',
        ciudad: 'string',
        region: 'string',
        cp: 'string'
    }]))

    await act(async () => {
        const { getByText } = render(<BrowserRouter><Direcciones webId="prueba"/></BrowserRouter>);

        expect(getByText("Mis direcciones")).toBeInTheDocument();
    });

});
