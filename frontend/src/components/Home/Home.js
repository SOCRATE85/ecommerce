import React, { useEffect } from "react";
import { CgMouse } from 'react-icons/cg';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import ProductCard from './ProductCard';
import MetaData from "../layout/MetaData";
import { fetchProducts, clearErrors } from "../../store";
import Loader from "../layout/Loader/Loader";
import JCarousel from '../../common/components/Carousel/JCarousel'
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
        <div className="banner">
            <p className="font-size-16 font-weight-400">Welcome to Ecommerce</p>
            <h1 className="font-size-25 font-weight-600 text-white">Find Amazing Product Below</h1>
            <a href="#container">
                <button className="font-semibold">
                    Scoll <CgMouse />
                </button>
            </a>
        </div>
        <h2 className="homeHeading font-size-16">Featured Products</h2>
        <div className="productcontainer" id="container">
            {
                products && products.map((product) => {
                    return <ProductCard product={product} key={product._id} />
                })
            }
        </div>
        <JCarousel />
    </>
}

export default Home;