import React from 'react';

const Product = ({ products }) => {
    return (<div className="flex">
        Category is <span>...</span>
        <span className="element">
            <select>
                <option value={""}>Select Category</option>
            </select>
        </span>
    </div>);
}

export default Product;
