import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "../mocks/resListDataMock.json";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        }
    })
});

describe("Search functionality", () => {
    test("Should render Body component with Search button", async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <Body />
                </BrowserRouter>
            );
        });

        const searchBtn = screen.getByRole("button", {name: "Search"});
        const searchInput = screen.getByTestId("searchInput");

        expect(searchBtn).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
    });

    test("Should search restaurant list for burger text input", async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <Body />
                </BrowserRouter>
            );
        });
        const cardsBeforeSearch = screen.getAllByTestId("resCard");
        expect(cardsBeforeSearch.length).toBe(20);

        const searchBtn = screen.getByRole("button", {name: "Search"});
        const searchInput = screen.getByTestId("searchInput");
        fireEvent.change(searchInput, {target: {value: "burger"}});
        fireEvent.click(searchBtn);
        const cardsAfterSearch = screen.getAllByTestId("resCard");

        expect(cardsAfterSearch.length).toBe(2);
    });

    test("Should filter top rated restaurants", async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <Body />
                </BrowserRouter>
            );
        });
        const cardsBeforeFilter = screen.getAllByTestId("resCard");
        expect(cardsBeforeFilter.length).toBe(20);

        const topRatedResBtn = screen.getByRole("button", {name: "Top Rated Restaurants"});
        fireEvent.click(topRatedResBtn);
        const topRatedResCards = screen.getAllByTestId("resCard");

        expect(topRatedResCards.length).toBe(6);
    });
});