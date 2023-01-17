import { act, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import * as solid from "../api/solidSession";
import Pedidos from "./Pedidos";

jest.mock("../api/solidSession")

test("Compra renders correctly", async () => {

    jest.spyOn(solid, 'getName').mockImplementation((_webid:string): Promise<string> => Promise.resolve("prueba"))
    jest.spyOn(solid, 'isLoggedIn').mockImplementation((): boolean => true)

    await act(async () => {
        const { getByText } = render(<BrowserRouter><Pedidos webId='prue' /></BrowserRouter>);

        expect(getByText("Mis pedidos")).toBeInTheDocument();
    });

});
