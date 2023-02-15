import React from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getValue } from "../../common/attribute";
import "./CartItemCard.css";

const CartItemCard = ({product, removeItemFromcart }) => {
    const dispatch = useDispatch();
    return <div className="CartItemCard">
        <img src={product.images[0].url} alt={getValue("name", product.data)} />
        <div>
            <Link to={`/${product.url_key}`}>{getValue("name", product.data)}</Link>
            <span>{`Price: ${getValue("price", product.data)}`}</span>
            <p onClick={() => dispatch(removeItemFromcart(product._id))}>Remove</p>
        </div>
    </div>
}

export default CartItemCard;
