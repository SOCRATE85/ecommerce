import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { getValue } from "../../common/attribute";

const ProductCard  = ({ product }) => {    
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5
    };
    const images = getValue("images", product.data);
    return <Link className="productCard" to={`/${product.url_key}`}>
        {images.map((image, index) => {
            return <img src={image} key={index} alt={`${getValue("name", product.data)}`} />
        })}
        <div className="actions">
            <p className="font-size-14">{`${getValue("name", product.data)}`}</p>
            <div>
                <Rating {...options} /><span> ({product.numOfReviews} Reviews)</span>
            </div>
            <span className="font-size-14">{`$${getValue("price", product.data)}`}</span>
        </div>
    </Link>
}

export default ProductCard;
