import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../redux/cartSlice";

const Cart = () => {

    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    const clearCartItems = () => {
        dispatch(clearCart());
    }
    const removeItemFromCart = (item) => {
        dispatch(removeItem(item));
    }

    return (
        <div>
            <div className="cart-header">
                <h1>Cart</h1>
                <button className="clear-cart" onClick={clearCartItems}>Clear Cart</button>
            </div>
            <ul>
                {
                    cartItems.map((item) => 
                        <li key={item?.card?.info?.id} className="item-row" data-testid="cartItem">
                            {item?.card?.info?.name} - Rs. {item?.card?.info?.price/100 || item?.card?.info?.defaultPrice/100}
                            <button onClick={() => removeItemFromCart(item)}>Remove</button>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

export default Cart;