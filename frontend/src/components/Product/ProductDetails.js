import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import ReactStars from 'react-rating-stars-component';
import { useAlert } from 'react-alert';
import { Dialog, DialogActions, DialogContent, DialogTitle,Button, Rating } from "@mui/material";
import Loader from '../layout/Loader/Loader';
import { clearErrors, productDetails, newReview } from "../../store/actions/productAction";
import ReviewCard from './ReviewCard';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from "../../store/actions/cartAction";
import { getValue } from '../../common/attribute';
import './productDetails.css';
import { NEW_REVIEW_RESET } from "../../store/contants/productConstant";

const ProductDetails = (props) => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const [ open, setOpen ] = useState(false);
    const [ rating, setRating ] = useState(0);
    const [ comment, setComment ] = useState("");
    const [ quantity, setQuantity ] = useState(1);
    const { product, loading, error } = useSelector( state => state.productDetails );
    const { success, error: errorReview } = useSelector( state => state.newReview );
    
    useEffect(() => {
        if(errorReview){
            alert.error(errorReview);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Review submitted successfully");
            dispatch(productDetails(props.productId));
            dispatch({ type: NEW_REVIEW_RESET });
        }
    }, [dispatch, errorReview, alert, success, props]);

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(productDetails(props.productId));
    }, [dispatch, props.productId, error, alert]);
    
    const addToCartHandler = () => {
        dispatch(addItemsToCart(props.productId, quantity));
        alert.success("Item added To Cart");
        navigate("/cart");
    }

    if(loading || error){
        return <Loader />
    }

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true
    };

    const descreasequantity = () => {
        if(quantity <= 1 ){return;}
        const qty = quantity-1;
        setQuantity(qty);
    }

    const increasequantity  = () => {
        const stock = getValue('stock', product.data);   
        if(stock <= quantity){return;}
        const qty = quantity+1;
        setQuantity(qty);
    }

    const submitReviewToggle = () => {
        return open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", props.productId);
        dispatch(newReview(myForm));
        setOpen(false);
    }
    const images = getValue('images', product.data);
    const reviewForm = () => {
        return <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
                <Rating onChange={(e) => setRating(e.target.value)} value={rating} />
                <textarea 
                    className="submitDialogTextArea" 
                    onChange={(e) => setComment(e.target.value)} 
                    cols={30} 
                    rows={5} 
                    value={comment}></textarea>
            </DialogContent>
            <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                <Button color="primary" onClick={reviewSubmitHandler}>Submit</Button>
            </DialogActions>
        </Dialog>
    }
    
    return <>
        <MetaData title={`${getValue('name', product.data)} -- Ecommerce`}/>
        <div className="productDetails">
            <div className="media">
                <Carousel>
                    {
                        images && images.map((item, i) => (<img 
                            className="CarouselImage" 
                            src={item} 
                            key={i}
                            alt={`${i} slide`}
                            />))
                    }
                </Carousel>
            </div>
            <div>
                <div className="detailsBlock-1">
                    <h2>{getValue('name', product.data)}</h2>
                    <p>Product #{product._id}</p>
                </div>
                <div className="detailsBlock-2">
                    <ReactStars {...options} /><span> ({product.numOfReviews} Reviews)</span>
                </div>
                <div className="detailsBlock-3">
                    <h1>{`$${getValue('price', product.data)}`}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button onClick={descreasequantity}>-</button>
                            <input readOnly value={ quantity } type="number" />
                            <button onClick={increasequantity}>+</button>
                        </div>{" "}
                        <button onClick={addToCartHandler} disabled={getValue('stock', product.data) > 1? false : true }>Add to Cart</button>
                    </div>
                    <p>Status{" "}
                        <b className={getValue('stock', product.data) < 1 ? "redColor" : "greenColor" }>
                            {getValue('stock', product.data) < 1 ? "Out of Stock" : "In Stock" }
                        </b>
                    </p>
                </div>
                <div className="detailsBlock-4">
                    Description: <p>{ getValue('description', product.data) }</p>
                </div>
                <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
            </div>
        </div>
        <h3 className="reviewHeading">REVIEWS</h3>
        {reviewForm()}
        {
            product.reviews && product.reviews[0] ? (
                <div className="reviews">
                    {
                        product.reviews && product.reviews.map(review => {
                            return <ReviewCard key={review._id} review={review} />
                        })
                    }
                </div>
            ):(
                <p className="noReviews">No Reviews Yet</p>
            )
        }
    </>
}

export default ProductDetails;
