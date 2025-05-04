import { render, screen } from "@testing-library/react"
import Contact from "../Contact"
import "@testing-library/jest-dom"

describe("Contact Us page tests", () => {
    test("Should load Contact component", () => {
        render(<Contact/>);

        const heading = screen.getByRole("heading");

        expect(heading).toBeInTheDocument();
    });

    test("Should load button in Contact component", () => {
        render(<Contact/>);

        const button = screen.getByRole("button");

        expect(button).toBeInTheDocument();
    });

    test("Should have 2 input boxes in Contact component", () => {
        render(<Contact/>);

        const inputBoxes = screen.getAllByRole("textbox");

        expect(inputBoxes.length).toBe(2);
    });
});