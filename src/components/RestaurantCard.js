import { CDN_URL } from "../util/constants";

const RestaurantCard = (props) => {
    const {resData} = props;
    const {name, cuisines, avgRating, sla} = resData;
    return (
        <div className="res-card" data-testid="resCard">
            <img className="res-logo" src={CDN_URL+resData.cloudinaryImageId}/>
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating}</h4>
            <h4>{sla?.deliveryTime} minutes</h4>
        </div>
    )
}

export const withBoltLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="bolt">Bolt</label>
                <RestaurantCard {...props} />
            </div>
        );
    }
}

export default RestaurantCard;