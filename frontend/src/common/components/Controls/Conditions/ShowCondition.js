import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {deleteRules} from '../../../../store';
import {Delete} from "@mui/icons-material";
import Loader from '../../../../components/layout/Loader';
import OptionSelector from './OptionSelector';
import ConditionLayout from './ConditionLayout';
import AttributeSet from './AttributeSet';
import Category from './Category';
import Product from './Product';

const ShowCondition = (props) => {
    const dispatch = useDispatch();
    const [selectedConditionOption, setSelectedConditionOption] = useState("");
    const {categories} = useSelector(state => state.categories);
    const {products} = useSelector(state => state.products);
    const {attributesets} = useSelector(state => state.attributesets);
    const {conditionObject, loading} = useSelector(state => state.catalogrule);

    const addConditions = () => {
        setSelectedConditionOption("");
    }

    if(loading) {
        return <Loader />
    }
    console.log('conditionObject: ', conditionObject);
    return (<>
        {
            conditionObject.length > 0 && conditionObject.map((item, index) => {
                switch(item.type) {
                    case 'conditions_combinations':
                        return (<div style={{marginLeft: index * 16}} key={index}>
                            <ConditionLayout 
                                item={item}
                                level={item.level}
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
                                        addConditions={addConditions}
                                        selectedConditionOption={selectedConditionOption}
                                        setSelectedConditionOption={setSelectedConditionOption}
                                        level={item.level}
                                    />
                                </>}
                            </ConditionLayout>
                        </div>);
                    case 'attribute_set':
                        return (
                            <div style={{marginLeft: index * 16}} key={index}>
                                <AttributeSet
                                    item={item}
                                    level={item.level}
                                    parent={item.parent}
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
                                            addConditions={addConditions}
                                            selectedConditionOption={selectedConditionOption}
                                            setSelectedConditionOption={setSelectedConditionOption}
                                            level={item.level}
                                        />
                                    </>}
                                </AttributeSet>
                            </div>
                        );
                    case "category":
                        return (
                            <div style={{marginLeft: index * 16}} key={index}>
                                <Category
                                    item={item}
                                    categories={categories}
                                    level={item.level}
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
                                            addConditions={addConditions}
                                            selectedConditionOption={selectedConditionOption}
                                            setSelectedConditionOption={setSelectedConditionOption}
                                            level={item.level}
                                        />
                                    </>}
                                </Category>
                            </div>
                        );
                    case "productid":
                        return (
                            <div style={{marginLeft: index * 16}} key={index}>
                                <Product
                                    item={item}
                                    level={item.level}
                                    parent={item.parent}
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
                                            addConditions={addConditions}
                                            selectedConditionOption={selectedConditionOption}
                                            setSelectedConditionOption={setSelectedConditionOption}
                                            level={item.level}
                                        />
                                    </>}
                                </Product>
                            </div>
                        );
                    default:
                        return (
                            <div style={{marginLeft: index * 16}} key={index}>
                                <ConditionLayout 
                                    item={item}
                                    level={item.level}
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
                                            addConditions={addConditions}
                                            selectedConditionOption={selectedConditionOption}
                                            setSelectedConditionOption={setSelectedConditionOption}
                                            level={item.level}
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
