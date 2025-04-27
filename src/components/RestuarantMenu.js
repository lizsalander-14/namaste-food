import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestuarantMenu from "../util/useRestuarantMenu"
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";

const RestuarantMenu = () => {
    const {resId} = useParams();    
    const resInfo = useRestuarantMenu(resId);

    if(resInfo === null) {
        return <Shimmer />;
    }

    const {name, cuisines, costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;
    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
                        .filter(c => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

    const dispatch = useDispatch();
    const addItemToCart = (newItem) => {
        dispatch(addItem(newItem));
    }

    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines.join(", ")} - {costForTwoMessage}</p>
            {categories.map((category, index) => 
                <div key={index}>
                    <h2>{category?.card?.card?.title}</h2>
                    <ul>
                    {
                        category?.card?.card?.itemCards.map((item) => 
                            <li key={item?.card?.info?.id} className="item-row">
                                {item?.card?.info?.name} - Rs. {item?.card?.info?.price/100 || item?.card?.info?.defaultPrice/100}
                                <button onClick={() => addItemToCart(item)}>Add</button>
                            </li>
                        )
                    }
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RestuarantMenu;