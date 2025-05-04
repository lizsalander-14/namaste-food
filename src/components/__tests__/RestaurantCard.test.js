import { render, screen } from "@testing-library/react";
import RestaurantCard, {withBoltLabel} from "../RestaurantCard";
import MOCK_DATA from "../mocks/resDataMock.json";
import "@testing-library/jest-dom";

describe("RestaurantCard tests", () => {
    test("Should render props data in RestaurantCard component", () => {
        render(<RestaurantCard resData={MOCK_DATA}/>)

        const resCard = screen.getByText("Theobroma");

        expect(resCard).toBeInTheDocument();
    });

    test("Should render bolt label in RestaurantCard component", () => {
        const BoltRestaurantCard = withBoltLabel(RestaurantCard); 
        render(<BoltRestaurantCard resData={MOCK_DATA}/>)

        const boltLabel = screen.getByText("Bolt");

        expect(boltLabel).toBeInTheDocument();
    });
});