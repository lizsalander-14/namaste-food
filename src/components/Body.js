import RestaurantCard, {withBoltLabel} from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useOnlineStatus from "../util/useOnlineStatus";

const Body = () => {
    const [displayList, setDisplayList] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");
    const BoltRestaurantCard = withBoltLabel(RestaurantCard);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        setDisplayList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false) {
        return <h1>Looks like you're offline!! Please check your internet connection</h1>;
    }

    return (
        displayList.length === 0 ? 
        <Shimmer /> :
        <div className="body"> 
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" value={searchText} 
                        onChange={(e) => setSearchText(e.target.value)}/>
                    <button onClick={() => {
                        const searchResList = displayList.filter(res => res?.info?.name.toLowerCase().includes(searchText));
                        setFilteredRestaurant(searchResList);
                    }}>
                        Search
                    </button>
                </div>
                <button className="filter-btn" onClick={() => {
                    const topResList = displayList.filter(res => res?.info?.avgRating > 4.5);
                    setFilteredRestaurant(topResList);
                }}>
                    Top Rated Restaurants
                </button>
            </div>
            <div className="res-container">
                {
                    filteredRestaurant.map((restuarant) => 
                        <Link key={restuarant?.info?.id} to={"/restaurants/"+restuarant?.info?.id}>
                            {restuarant?.info?.badges?.imageBadges ? 
                            <BoltRestaurantCard key={restuarant?.info?.id} resData={restuarant?.info} /> :
                            <RestaurantCard key={restuarant?.info?.id} resData={restuarant?.info} />}
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default Body;