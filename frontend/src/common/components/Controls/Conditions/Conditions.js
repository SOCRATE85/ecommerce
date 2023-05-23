import React, { useState } from "react";
import CombinationActions from './CombinationActions';

const Conditions = () => {
    const [conditionObject, setConditionObject] = useState([
        {
            conditionType: 'all',
            conditionValue: true,
            conditionTypeFlag: false,
            conditionValueFlag: false,
            conditions: {
                conditionType: 'all',
                conditionValue: true,
                conditionTypeFlag: false,
                conditionValueFlag: false,
                conditions: []
            }
        }
    ]);

    const addConditions = (index, objectData) => {
        
    }

    return (<div>
        {
            conditionObject.map((_conditionObject, index) => {
                return (
                    <CombinationActions
                        key={index}
                        order_number={index}
                        addConditions={addConditions} 
                        conditionObject={conditionObject}
                        setConditionObject={setConditionObject}
                    />
                );
            })
        }
    </div>);
}

export default Conditions;
