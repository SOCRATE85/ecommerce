import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateCatalogRuleObject} from '../../../../store';
import {getValue} from '../../../attribute';

const Product = ({ products, children, deleteCompoment, item, changed, id }) => {
const {level, parent}=item;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState("");
    const {conditionObject, loading} = useSelector(state => state.updateCatalogRuleObject);

    const product = products.find(product => {
        if(product._id === item.product) {
            return true;
        }
        return false;
    });

    const changeOptionHandler = (e) => {
        setSelectedProduct(e.target.value);
        dispatch(updateCatalogRuleObject({
            type: "productid",
            product: e.target.value,
            level,
            parent,
            open
        }));
        changed(conditionObject, id);
        setOpen(false);
    }

    if(loading) {
        return (<></>);
    }

    return (
        <div className="flex flex-col">
            <div className="flex">
                Product is &nbsp;{!open && <span onClick={() => setOpen(true)}>
                    {product ? getValue("name", product.data) : "..."}
                </span>}&nbsp;{open && <span className="element">
                    <select
                        value={selectedProduct}
                        onChange={(e) => changeOptionHandler(e)}
                        onMouseOver={() => setOpen(true)}
                        onMouseOut={() => setOpen(false)}
                    >
                        <option value={""}>Select Product</option>
                        {products.map(_product => {
                            return (
                                <option value={_product._id} key={_product._id}>
                                    {getValue("name", _product.data)}
                                </option>
                            )
                        })}
                    </select>
                </span>}
                <span>{deleteCompoment}</span>
            </div>
            {children}
        </div>
    );
}

export default Product;
