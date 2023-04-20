import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { useAlert } from "react-alert";
import Pagination from 'react-js-pagination';
import { Typography, Slider } from "@mui/material";
import { clearErrors, getProducts } from "../../store/actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from '../layout/MetaData';
import "./Products.css";

const Products = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const numofProduct = 3;
    const [price, setPrice] = useState([0, 25000]);
    const [ratings, setRatings] = useState([0,5]);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");
    const { 
            products, 
            productCount, 
            resultPerPage,
            loading, 
            error 
        } = useSelector(state => state.products);
    const { categories, loading: loadingCategory } = useSelector( state => state.categories);    
    const keyword = params.keyword;
    
    const priceHandler = (_event, newPrice) => {
        setPrice(newPrice);
    }

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    useEffect(() =>{
        if(error){
            alert.error(error.error);
            dispatch(clearErrors());
        }
        setTimeout(()=> {
            dispatch(getProducts(keyword, currentPage, price, category, ratings, numofProduct));
        }, 1000);
    }, [dispatch, error, alert, keyword, currentPage, price, category, ratings]);
    
    if(loading || loadingCategory) {
        return <Loader />
    }
    
    return <>
        <MetaData title="Product -- Ecommerce" />
        <h2 className="productsHeading">Products: {productCount} record Found</h2>
        <div className="productContainer">
            <div className="products">
                {
                    loading || error 
                    ?  <Loader /> 
                    : <>
                        <div className="productgrid">
                        {
                            products && products.map((product) => {
                                return <ProductCard product={product} key={product._id} />
                            })
                        }
                        </div>
                        {
                            resultPerPage && (productCount > products.length) && <div className="paginationBox">
                                <Pagination 
                                    activePage={currentPage} 
                                    itemsCountPerPage={parseInt(resultPerPage)}
                                    totalItemsCount={productCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText={"Prev"}
                                    firstPageText={"1st"}
                                    lastPageText={"last"}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        }
                    </>
                }
                
            </div>            
            <div className="filterBox">
                <Typography>Price</Typography>
                <Slider 
                    value={price} 
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={25000}
                    size="medium"
                />
                <Typography>Category</Typography>
                <ul className="categoryBox">
                    {
                        categories.map((_category) => (
                            <li className="category-link" key={_category} onClick={() => setCategory(_category)}>
                                {_category}
                            </li>
                        ))
                    }
                    
                </ul>
                <Typography>Rating Above</Typography>
                <Slider 
                    value={ratings}
                    onChange={(e, newRating) => setRatings(newRating)}
                    aria-labelledby="continues-slider"
                    min={0}
                    max={5}
                    valueLabelDisplay="auto"
                />
            </div>
        </div>

        
    </>
}

export default Products;
