import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import {updateCatalogRuleObject} from '../../../../store';

const AttributeSet = ({ children, attributesets, item, deleteCompoment }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(!item.open);
    const [attributesetValue, setAttributesetValue] = useState(item.attributeset);
    const attributesetLavel = attributesets.find(attributeset => {
        if(attributeset._id === item.attributeset) {
            return true;
        }
        return false;
    });

    return (<>
        <div className="flex">
            Attribute Set is &nbsp;{!open && <span style={{textDecoration: "underline"}} onClick={() => setOpen(true)}>{
            attributesetLavel.attribute_set_name ? attributesetLavel.attribute_set_name : "..."
            }</span>}
            {open && <span className="element">
                <select
                    value={attributesetValue}
                    onChange={(e) => {
                        setAttributesetValue(e.target.value);
                        setOpen(false);
                        dispatch(updateCatalogRuleObject({
                            level: item.level,
                            type: "attribute_set",
                            attributeset: e.target.value,
                            open
                        }));
                    }}
                >
                    <option value={""}>Select Attribute Set</option>
                    {attributesets.map(attributeset => {
                        return <option key={attributeset._id} value={attributeset._id}>{attributeset.attribute_set_name}</option>
                    })}
                </select>
            </span>}
            <span>{deleteCompoment}</span>
        </div>
        {children}
    </>);
}

export default AttributeSet;
