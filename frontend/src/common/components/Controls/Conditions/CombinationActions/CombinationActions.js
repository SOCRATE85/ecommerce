import React from "react";
import ShowCondition from '../ShowCondition';

const CombinationActions = (props) => {
    const { 
        order_number,
        addConditions,
        conditionObject,
        setConditionObject
    } = props;
    const currentObject = conditionObject[order_number];

    return (<div>
        <ShowCondition 
           {...{
            currentObject,
            addConditions,
            setConditionObject
           }}
        ></ShowCondition>
    </div>);
}

export default CombinationActions;
