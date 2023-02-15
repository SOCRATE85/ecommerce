import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { addItemsToCart, removeItemFromcart } from '../../store/actions/cartAction';
import RemoveShoppingCartOutlined from '@mui/icons-material/RemoveShoppingCartOutlined';
import { getValue } from "../../common/attribute";
import CartItemCard from './CartItemCard';
import MetaData from '../layout/MetaData';
import "./Cart.css";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector( state => state.cart );
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if(stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if(1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }
    
    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    }
    
    return <>
        <MetaData title="Checkout Page" />
        {
            cartItems.length === 0 ? <div className="emptyCart">
                <RemoveShoppingCartOutlined />
                <Typography>No Product in Your Cart!</Typography>
                <Link to="/">Continue shopping</Link>
            </div> :  (<div className="cartPage">
                    <div className="cartHeader">
                        <p>Product</p>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                    </div>
                    {
                        cartItems && cartItems.map((cartItem, index) => {
                            const product = cartItem.product;
                            return (<div key={index} className="cartContainer">
                                <CartItemCard product={product} removeItemFromcart={removeItemFromcart} />
                                <div className="cartInput">
                                    <button onClick={() => decreaseQuantity(product._id, cartItem.quantity)}>-</button>
                                    <input type={'number'} value={ cartItem.quantity } readOnly />
                                    <button onClick={() => increaseQuantity(product._id, cartItem.quantity, getValue("stock", product.data))}>+</button>
                                </div>
                                <p className="cartSubtotal">{`$${ getValue("price", product.data) * cartItem.quantity }`}</p>
                            </div>)
                        })
                    }
                    <div className="cartGrossProfit">
                        <div></div>
                        <div className="cartGrossProfitBox">
                            <p>Gross Total</p>
                            <p>{`$${cartItems.reduce(
                                (acc, item) => {
                                    const product = item.product;
                                    return acc + (item.quantity * getValue("price", product.data))
                                },0
                            )}`}</p>
                        </div>
                        <div></div>
                        <div className="checkoutBtn">
                            <button onClick={checkoutHandler}>Check Out</button>
                        </div>
                    </div>
                </div>)
        }
       
    </>;
}

export default Cart;
