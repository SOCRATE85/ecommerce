import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {createCatalogRuleObject} from '../../../../store';
import {AddCircleOutline} from "@mui/icons-material";

const OptionSelector = ({addConditions, selectedConditionOption, setSelectedConditionOption, level}) => {
    const dispatch = useDispatch();
    const [option, setOpen] = useState(false);
    const {/*conditionObject,*/ loading} = useSelector(state => state.catalogrule);

    if(loading) { return (<></>); }

    return (
        <span>
            {
                !option && <AddCircleOutline 
                    onBlur={() => setOpen(false)}
                    onClick={() => {
                        addConditions(setOpen);
                        setOpen(true);
                    }} 
                />
            }
            {option && <span>
                <select 
                    value={selectedConditionOption} 
                    onChange={(e) => {
                        setSelectedConditionOption(e.target.value);
                        setOpen(false);
                        dispatch(createCatalogRuleObject({
                            type: e.target.value,
                            level: level + 1
                        }));
                    }}
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