import { fireEvent, render, screen } from "@testing-library/react"
import Header from "../Header"
import { Provider } from "react-redux";
import appStore from "../../redux/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Header page tests", () => {
    test("Should load login button in Header component", () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header/>
                </Provider>
            </BrowserRouter>
        );

        const loginBtn = screen.getByRole("button", {name: "Login"});

        expect(loginBtn).toBeInTheDocument();
    });

    test("Should load Cart items 0 in Header component", () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header/>
                </Provider>
            </BrowserRouter>
        );

        const cartItems = screen.getByText("Cart - 0");

        expect(cartItems).toBeInTheDocument();
    });

    test("Should change login button to logout on click", () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header/>
                </Provider>
            </BrowserRouter>
        );

        const loginBtn = screen.getByRole("button", {name: "Login"});
        fireEvent.click(loginBtn);
        const logoutBtn = screen.getByRole("button", {name: "Logout"});

        expect(logoutBtn).toBeInTheDocument();
    });
});