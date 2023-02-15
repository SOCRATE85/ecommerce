import React, { useState } from "react";
import Select from 'react-select';

const CategoryDDL = () => {
    const [selectValue, setSelectValue] = useState([]);
    const options = [
                        { label: "One", value: 1 },
                        { label: "Two", value: 2 },
                        { label: "Three", value: 3, disabled: true }
                    ];
    console.log('selectValue: ', selectValue);
    return (<>
        <Select 
            options={options} 
            value={selectValue}
            isMulti
            onChange={(value) => setSelectValue(value)}
        />        
    </>);
}
export default CategoryDDL;
