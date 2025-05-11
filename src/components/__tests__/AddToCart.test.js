import { fireEvent, render, screen } from "@testing-library/react";
import RestuarantMenu from "../RestuarantMenu";
import Header from "../Header";
import Cart from "../Cart";
import { act } from "react";
import MOCK_DATA from "../mocks/resMenuMock.json";
import { Provider } from "react-redux";
import appStore from "../../redux/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        }
    })
});

describe("Add to Cart functionality", () => {
    test("Should load RestaurantMenu Component", async () => {
        await act(async () => {
            render(
                <Provider store={appStore}>
                    <RestuarantMenu/>
                </Provider>
            )
        });

        const categories = screen.getAllByTestId("category");

        expect(categories.length).toBe(7);
    });

    test("Should add item to cart", async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <Provider store={appStore}>
                        <Header/>
                        <RestuarantMenu/>
                        <Cart/>
                    </Provider>
                </BrowserRouter>
            )
        });
        const cartTitle = screen.getByText("Cart - 0");
        expect(cartTitle).toBeInTheDocument();

        const addBtns = screen.getAllByRole("button", {name: "Add"});
        fireEvent.click(addBtns[0]);
        const updatedCartTitle = screen.getByText("Cart - 1");
        const cartItems = screen.getAllByTestId("cartItem");

        expect(updatedCartTitle).toBeInTheDocument();
        expect(cartItems.length).toBe(1);
    });
});