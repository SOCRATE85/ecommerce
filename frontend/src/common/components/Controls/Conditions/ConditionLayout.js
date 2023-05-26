import React, {useMemo} from "react";
import {useDispatch} from 'react-redux';
import {updateCatalogRuleObject} from '../../../../store';

const ConditionLayout = ({ children, item, deleteCompoment }) => {
    const dispatch = useDispatch();
    const {level, conditionType, conditionValue, conditionTypeFlag, conditionValueFlag} = item;
    
    const conditionTypes = useMemo(() => {
        return [{value: "all", label: "ALL"},{value: "any", label: "ANY"}];
    }, []);
    const conditionValues = useMemo(() => {
        return [{value: true, label: "TRUE"}, {value: false, label: "FALSE"}];
    }, []);
    
    const getConditionType = useMemo(() => {
        const _tempValue = conditionTypes.find(_conditionType => {
            if( _conditionType.value === conditionType) {
                return true;
            }
            return false;
        });
        return _tempValue.label;
    }, [conditionType, conditionTypes]);

    const getConditionValue = useMemo(() => {
        const _tempValue = conditionValues.find(_conditionValue => {
            if(_conditionValue.value === conditionValue) {
                return true;
            }
            return false;
        });
        return _tempValue.label;
    }, [conditionValue, conditionValues]);

    return (
        <>
            <div className="flex">
                <div className="flex justify-center text-center gap-2">if{' '} 
                    <span className="rule-param underline">
                        {!conditionTypeFlag && <span onClick={() => {
                            dispatch(updateCatalogRuleObject({
                                type: 'conditions_combinations',
                                level,
                                conditionValue,
                                conditionType,
                                conditionValueFlag,
                                conditionTypeFlag: true
                            }));
                        }}>{getConditionType}</span>}
                        {
                            conditionTypeFlag && <span className="element">
                                <select value={conditionType} onChange={(e) => {
                                    dispatch(updateCatalogRuleObject({
                                        type: 'conditions_combinations',
                                        level,
                                        conditionValue: e.target.value === 'true' ? true : false,
                                        conditionType: e.target.value,
                                        conditionValueFlag,
                                        conditionTypeFlag: false
                                    }));
                                }}
                                onMouseOver={() => {
                                    dispatch(updateCatalogRuleObject({
                                        type: 'conditions_combinations',
                                        level,
                                        conditionValue,
                                        conditionType,
                                        conditionValueFlag,
                                        conditionTypeFlag: false
                                    }));
                                }}
                                onMouseOut={() => {
                                    dispatch(updateCatalogRuleObject({
                                        type: 'conditions_combinations',
                                        level,
                                        conditionValue,
                                        conditionType,
                                        conditionValueFlag,
                                        conditionTypeFlag: false
                                    }));
                                }}
                                >
                                    {conditionTypes.map(_conditionType => {
                                        return (<option value={_conditionType.value} key={_conditionType.value}>
                                            {_conditionType.label}
                                        </option>);
                                    })}
                                </select>
                            </span>
                        }
                    </span> of these conditions are{' '}
                    <span className="rule-param underline">
                        {!conditionValueFlag && <span onClick={() => {
                            dispatch(updateCatalogRuleObject({
                                type: 'conditions_combinations',
                                level,
                                conditionValue,
                                conditionType,
                                conditionValueFlag: true,
                                conditionTypeFlag
                            }));
                        }}>{getConditionValue}</span>}
                        {conditionValueFlag && <span className="element">
                            <select value={conditionValue} onChange={(e) => {
                                dispatch(updateCatalogRuleObject({
                                    type: 'conditions_combinations',
                                    level,
                                    conditionValue: e.target.value === 'true' ? true : false,
                                    conditionType,
                                    conditionValueFlag: false,
                                    conditionTypeFlag
                                }));
                            }}>
                                {conditionValues.map(_conditionValue => {
                                    return (<option value={_conditionValue.value} key={_conditionValue.value}>
                                        {_conditionValue.label}
                                    </option>);
                                })}
                            </select>
                        </span>}
                    </span>
                </div>
                <span>{deleteCompoment}</span>
            </div>
            {children}
        </>
    );
}

export default ConditionLayout;
