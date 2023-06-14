import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateCatalogRuleObject} from '../../../../store';

const Category = ({ categories, children, deleteCompoment, item, changed, id  }) => {
    const { level, parent} = item;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const {conditionObject, loading} = useSelector(state => state.updateCatalogRuleObject);

    const category = categories.find(category => {
        if(category._id === item.category) {
            return true;
        }
        return false;
    });
    
    const changeOptionHandler = (e) => {
        setSelectedCategory(e.target.value);
        dispatch(updateCatalogRuleObject({
            type: "category",
            category: e.target.value,
            level,
            parent,
            open
        }));
        changed(conditionObject, id);
        setOpen(false);
    }
    
    if(loading) {return <></>}

    return (<div className="flex flex-col">
        <div className="flex">
            Category is &nbsp;{!open && <span onClick={() => setOpen(true)}>
                {category ? category.name : "..."}</span>
            }&nbsp;{open && <span className="element">
                <select
                    value={selectedCategory}
                    onChange={(e) => changeOptionHandler(e)}
                    onMouseOver={() => setOpen(true)}
                    onMouseOut={() => setOpen(false)}
                >
                    <option value={""}>Select Category</option>
                    {categories.map(_category => {
                        return (<option value={_category._id} key={_category._id}>
                            {_category.name}
                        </option>);
                    })}
                </select>
            </span>}
            <span>{deleteCompoment}</span>
        </div>
        {children}
    </div>);
}

export default Category;
