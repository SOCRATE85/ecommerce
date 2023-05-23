import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {getAttributeSets, updateCatalogRuleObject} from '../../../../../store';
import {AddCircleOutline} from "@mui/icons-material";
import Loader from '../../../../../components/layout/Loader';

const OptionSelector = ({addConditions, selectedConditionOption, setSelectedConditionOption, optionValues, level}) => {
    const dispatch = useDispatch();
    const [option, setOpen] = useState(false);
    const {conditionObject, loading} = useSelector(state => state.catalogrule);

    if(loading) {
        return (<></>);
    }

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
                        optionValues(e.target.value);
                        setOpen(false);
                        dispatch(updateCatalogRuleObject({
                            type: e.target.value,
                            level
                        }));
                    }}>
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

const ConditionLayout = ({level, children}) => {
    console.log('level: ', level);
    const dispatch = useDispatch();
    const conditionTypes = useMemo(() => {
        return [{value: "all", label: "ALL"},{value: "any", label: "ANY"}];
    }, []);
    const conditionValues = useMemo(() => {
        return [{value: true, label: "TRUE"}, {value: false, label: "FALSE"}];
    }, []);
    const [conditionType, setConditionType] = useState("all");
    const [conditionValue, setConditionValue] = useState(true);
    const [conditionTypeFlag, setConditionTypeFlag] = useState(false);
    const [conditionValueFlag, setConditionValueFlag] = useState(false);

    const getConditionType = useMemo(() => {
        return conditionTypes.find(_conditionType => _conditionType.value === conditionType).label;
    }, [conditionType, conditionTypes]);
    console.log("getConditionType: ", getConditionType, conditionType, conditionTypes);
    const getConditionValue = useMemo(() => {
        const _tempValue = conditionValues.find(_conditionValue => _conditionValue.value === conditionValue);
        return _tempValue.label;
    }, [conditionValue, conditionValues]);
    console.log("getConditionValue: ", getConditionValue, conditionValue, conditionValues)
    return (
        <>
            <div>if{' '} 
                <span className="rule-param">
                    {!conditionTypeFlag && <span onClick={() => setConditionTypeFlag(prev => !prev)}>{getConditionType}</span>}
                    {
                        conditionTypeFlag && <span className="element">
                            <select value={conditionType} onChange={(e) => {
                                setConditionType(e.target.value);
                                setConditionTypeFlag(false);
                                dispatch(updateCatalogRuleObject({
                                    type: 'conditions_combinations',
                                    level,
                                    conditionValue: e.target.value === 'true' ? true : false,
                                    conditionType: e.target.value
                                }));
                            }}>
                                {conditionTypes.map(_conditionType => {
                                    return (<option value={_conditionType.value} key={_conditionType.value}>
                                        {_conditionType.label}
                                    </option>);
                                })}
                            </select>
                        </span>
                    }
                </span> of these conditions are{' '}
                <span className="rule-param">
                    {!conditionValueFlag && <span onClick={() => setConditionValueFlag(prev => !prev)}>{getConditionValue}</span>}
                    {conditionValueFlag && <span className="element">
                        <select value={conditionValue} onChange={(e) => {
                            setConditionValue(e.target.value === 'true' ? true : false);
                            setConditionValueFlag(false);
                            dispatch(updateCatalogRuleObject({
                                type: 'conditions_combinations',
                                level,
                                conditionValue: e.target.value === 'true' ? true : false,
                                conditionType
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
            {children}
        </>
    );
}

const ShowCondition = (props) => {
    const dispatch = useDispatch();
    const [selectedConditionOption, setSelectedConditionOption] = useState("");
    const [contents, setContents] = useState([]);
    const {categories} = useSelector(state => state.categories);
    const {attributesets} = useSelector(state => state.attributesets);
    const {conditionObject, loading} = useSelector(state => state.catalogrule);

    useEffect(() => {
        dispatch(getAttributeSets());
    }, [dispatch]);

    const addConditions = (option) => {
        setSelectedConditionOption("");
        props.addConditions();
    }

    const AttributeSet = () => (<>attribute_set</>);
    const Category = () => (<>Category</>);
    const Product = () => (<>Product</>);

    const optionValues = (value) => {
        let temp = [...contents];
        switch (value) {
            case "conditions_combinations":
                temp.push({data: <ConditionLayout />});
            break;
            case "attribute_set":
                temp.push({data: <AttributeSet />});
            break; 
            case "category":
                temp.push({data: <Category />});
            break;
            case "productid":
                temp.push({data: <Product />});
            break;
            default:
                temp.push({data: <ConditionLayout />});
            break;
        }
        setContents(temp);
    }
    
    if(loading) {
        return <Loader />
    }

    return (<>
        <ConditionLayout level={0}>
            <OptionSelector
                addConditions={addConditions}
                selectedConditionOption={selectedConditionOption}
                setSelectedConditionOption={setSelectedConditionOption}
                optionValues={optionValues}
                level={0}
            />
        </ConditionLayout>
    </>);
}

export default ShowCondition;
