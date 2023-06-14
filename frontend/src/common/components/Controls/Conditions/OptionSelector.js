import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {createCatalogRuleObject} from '../../../../store';
import {AddCircleOutline} from "@mui/icons-material";

const OptionSelector = ({
        selectedConditionOption,
        setSelectedConditionOption,
        item: {level},
        changed,
        id
    }) => {
    const dispatch = useDispatch();
    const [option, setOpen] = useState(false);
    const {conditionObject, loading} = useSelector(state => state.updateCatalogRuleObject);

    const optionChangeHandler = (e) => {
        setSelectedConditionOption(e.target.value);
        setOpen(false);
        let optionObject = {
            type: e.target.value,
            level: level + 1
        };
        switch(e.target.value) {
            case 'conditions_combinations':
                optionObject = {
                    type: 'conditions_combinations',
                    level: level + 1,
                    parent: level
                };
            break;
            case 'attribute_set':
                optionObject = {
                    type: 'attribute_set',
                    level: level + 1,
                    parent: level,
                    attributeset: null
                };
            break;
            case "category":
                optionObject = {
                    type: 'category',
                    level: level + 1,
                    parent: level,
                    category: null
                };
            break;
            case "productid":
                optionObject = {
                    type: 'productid',
                    level: level + 1,
                    parent: level,
                    product: null
                };
            break;
            default:
                optionObject = {
                    type: e.target.value,
                    level: level + 1,
                    parent: level
                };
            break;
        }
        changed(conditionObject, id);
        dispatch(createCatalogRuleObject(optionObject));
    }

    if(loading) { return (<></>); }
    
    return (
        <span>
            {
                !option && <AddCircleOutline 
                    onBlur={() => setOpen(false)}
                    onClick={() => {
                        setOpen(true);
                    }} 
                />
            }
            {option && <span>
                <select 
                    value={selectedConditionOption} 
                    onChange={optionChangeHandler}
                    onMouseOver={() => setOpen(true)}
                    onMouseOut={() => setOpen(false)}
                >
                    <option value={''}>Please choose a condition to add.</option>
                    <option value={'conditions_combinations'}>Conditions Combinations</option>
                    <optgroup label="Product Attribute">
                        <option value={'attribute_set'}>Attribute Set</option>
                        <option value={'category'}>Category</option>
                        <option value={'productid'}>Product Id</option>
                    </optgroup>
                </select>
            </span>}
        </span>
    );
};

export default OptionSelector;
