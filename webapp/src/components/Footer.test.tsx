import { render } from "@testing-library/react";
import Footer from "./Footer";


test("Footer renders correctly", () => {

    const {getByText} = render(<Footer/>);

    expect(getByText("Creado por")).toBeInTheDocument();

});
