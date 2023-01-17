import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import * as solid from "../api/solidSession";
import Header from "./Header";

jest.mock("../api/solidSession")

test("Header renders correctly", () => {

    jest.spyOn(solid,'isLoggedIn').mockImplementation(():boolean => true)

    const {getByText} = render(<BrowserRouter><Header nombre={'test1'}/></BrowserRouter>);

    expect(getByText("DeDe")).toBeInTheDocument();

});
