import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import ProductCard from './ProductCard';
import MetaData from "../layout/MetaData";
import { fetchProducts, clearErrors } from "../../store";
import Loader from "../layout/Loader/Loader";
import MainBanner from '../../common/components/MainBanner';
import './home.css';

const Home  = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products)

    useEffect(() => {
        if(error){
            alert.error(error.error);
            dispatch(clearErrors());
        }        
    }, [dispatch, error, alert]);

    useEffect(() => {
        dispatch(fetchProducts());
    },[dispatch]);

    if(loading || error){
        return <Loader />
    }
    
    return <>
        <MetaData title={"Ecommerce"} />
        <MainBanner />
        <h2 className="homeHeading font-size-16">Featured Products</h2>
        <div className="productcontainer" id="container">
            {
                products && products.map((product) => {
                    return <ProductCard product={product} key={product._id} />
                })
            }
        </div>
    </>
}

export default Home;