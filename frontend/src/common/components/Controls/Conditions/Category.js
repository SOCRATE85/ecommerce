import React from 'react';

const Category = ({ categories }) => {
    return (<div className="flex">
        Category is <span>...</span>
        <span className="element">
            <select>
                <option value={""}>Select Category</option>
            </select>
        </span>
    </div>);
}

export default Category;