import { render } from "@testing-library/react";
import Catalogo from "./Catalogo";


test("Catalogo renders correctly", () => {

    const {getByText} = render(<Catalogo/>);

    expect(getByText("Buscar")).toBeInTheDocument();

});
