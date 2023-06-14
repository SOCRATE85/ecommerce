import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {deleteRules, getAttributeSets, getAdminProducts, getAllCategories} from '../../../../store';
import {Delete} from "@mui/icons-material";
import Loader from '../../../../components/layout/Loader';
import OptionSelector from './OptionSelector';
import ConditionLayout from './ConditionLayout';
import AttributeSet from './AttributeSet';
import Category from './Category';
import Product from './Product';

const ShowCondition = ({ changed, value, id }) => {
    const dispatch = useDispatch();
    const [selectedConditionOption, setSelectedConditionOption] = useState("");
    const {categories} = useSelector(state => state.categories);
    const {products} = useSelector(state => state.products);
    const {attributesets} = useSelector(state => state.attributesets);
    const {conditionObject, loading} = useSelector(state => state.updateCatalogRuleObject);

    useEffect(() => {
        dispatch(getAttributeSets());
        dispatch(getAdminProducts());
        dispatch(getAllCategories());
    }, [dispatch]);

    if(loading) {
        return <Loader />
    }

    return (<>
        {
            conditionObject.length > 0 && conditionObject.map((item, index) => {
                switch(item.type) {
                    case 'conditions_combinations':
                        return (
                            <div style={{marginLeft: index * 16}} key={index}>
                                <ConditionLayout
                                    item={item}
                                    level={item.level}
                                    changed={changed}
                                    value={value}
                                    id={id}
                                    parent={item.parent}
                                    conditionObject={conditionObject}
                                    deleteCompoment={item.level !== 0 && <>:<Delete onClick={() => {
                                            if(item.level !== 0) {
                                                dispatch(deleteRules(item.level))
                                            }
                                        }} />
                                    </>}
                                >
                                    {item.level === (conditionObject.length-1) && <>
                                        <OptionSelector
                                            changed={changed}
                                            value={value}
                                            id={id}
                                            selectedConditionOption={selectedConditionOption}
                                            setSelectedConditionOption={setSelectedConditionOption}
                                            item={item}
                                        />
                                    </>}
                                </ConditionLayout>
                            </div>
                        );
                    case 'attribute_set':
                        return (
                            <div style={{marginLeft: index * 16}} key={index}>
                                <AttributeSet
                                    item={item}
                                    changed={changed}
                                    value={value}
                                    id={id}
                                    attributesets={attributesets}
                                    conditionObject={conditionObject}
                                    deleteCompoment={item.level !== 0 && <>:<Delete onClick={() => {
                                            if(item.level !== 0) {
                                                dispatch(deleteRules(item.level))
                                            }
                                        }} />
                                    </>}
                                >
                                    {item.level === (conditionObject.length-1) && <>
                                        <OptionSelector
                                            changed={changed}
                                            value={value}
                                            id={id}
                                            selectedConditionOption={selectedConditionOption}
                                            setSelectedConditionOption={setSelectedConditionOption}
                                            item={item}
                                        />
                                    </>}
                                </AttributeSet>
                            </div>
                        );
                    case "category":
                        return (
                            <div style={{marginLeft: index * 16}} key={index}>
                                <Category
                                    changed={changed}
                                    value={value}
                                    id={id}
                                    item={item}
                                    categories={categories}
                                    conditionObject={conditionObject}
                                    deleteCompoment={item.level !== 0 && <>:<Delete onClick={() => {
                                            if(item.level !== 0) {
                                                dispatch(deleteRules(item.level))
                                            }
                                        }} />
                                    </>}
                                >
                                    {item.level === (conditionObject.length-1) && <>
                                        <OptionSelector
                                            changed={changed}
                                            value={value}
                                            id={id}
                                            selectedConditionOption={selectedConditionOption}
                                            setSelectedConditionOption={setSelectedConditionOption}
                                            item={item}
                                        />
                                    </>}
                                </Category>
                            </div>
                        );
                    case "productid":
                        return (
                            <div style={{marginLeft: index * 16}} key={index}>
                                <Product
                                    changed={changed}
                                    value={value}
                                    id={id}
                                    item={item}
                                    products={products}
                                    conditionObject={conditionObject}
                                    deleteCompoment={item.level !== 0 && <>:<Delete onClick={() => {
                                            if(item.level !== 0) {
                                                dispatch(deleteRules(item.level))
                                            }
                                        }} />
                                    </>}
                                >
                                    {item.level === (conditionObject.length-1) && <>
                                        <OptionSelector
                                            changed={changed}
                                            value={value}
                                            id={id}
                                            selectedConditionOption={selectedConditionOption}
                                            setSelectedConditionOption={setSelectedConditionOption}
                                            item={item}
                                        />
                                    </>}
                                </Product>
                            </div>
                        );
                    default:
                        return (
                            <div style={{marginLeft: index * 16}} key={index}>
                                <ConditionLayout
                                    changed={changed}
                                    value={value}
                                    id={id}
                                    item={item}
                                    conditionObject={conditionObject}
                                    deleteCompoment={item.level !== 0 && <>:<Delete onClick={() => {
                                            if(item.level !== 0) {
                                                dispatch(deleteRules(item.level))
                                            }
                                        }} />
                                    </>}
                                >
                                    {item.level === (conditionObject.length-1) && <>
                                        <OptionSelector
                                            changed={changed}
                                            value={value}
                                            id={id}
                                            selectedConditionOption={selectedConditionOption}
                                            setSelectedConditionOption={setSelectedConditionOption}
                                            item={item}
                                        />
                                    </>}
                                </ConditionLayout>
                            </div>
                        );
                }
            })
        }
    </>);
}

export default ShowCondition;
