import React, { useMemo, useState } from 'react';
import {useDispatch} from 'react-redux';
import {updateCatalogRuleObject} from '../../../../store';

const Category = ({ categories, children, deleteCompoment, level, parent }) => {
    const dispatch = useDispatch();
    const [option, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    const changeOptionHandler = (e) => {
        setSelectedCategory(e.target.value);
        dispatch(updateCatalogRuleObject({
            type: "category",
            category: e.target.value,
            level,
            parent
        }));
        setOpen(false);
    }

    const _category = useMemo(() => {
        if(selectedCategory) {
            const matched = categories.find(category => category._id === selectedCategory);
            return matched.name;
        }
        return null;
    }, [selectedCategory, categories]);

    return (<div className="flex flex-col">
        <div className="flex">
            Category is &nbsp;{!option && <span onClick={() => setOpen(true)}>
                {_category ? _category : "..."}</span>
            }&nbsp;{option && <span className="element">
                <select
                    value={selectedCategory}
                    onChange={changeOptionHandler}
                    onMouseOver={() => setOpen(true)}
                    onMouseOut={() => setOpen(false)}
                >
                    <option value={""}>Select Category</option>
                    {categories.map(category => {
                        return (<option value={category._id} key={category._id}>
                            {category.name}
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
