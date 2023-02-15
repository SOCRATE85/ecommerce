import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import { useNavigate, useLocation } from "react-router-dom";
import { clearErrors, getCategoryDetailsForFrontEnd, getFilterAndSorting, getCategoryFilterDetailsForFrontEnd } from '../../store/actions/categoryAction';
import { useAlert } from "react-alert";
import { Typography, Button } from "@mui/material";
import { Close } from '@mui/icons-material';
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import ProductCard from '../Home/ProductCard';
import { DoubleHandleSlider } from './DoubleHandleSlider';
import Hoc from '../layout/Hoc';
import { generateUrl } from '../../common/attribute';
import { ToolBar } from "../Toolbar/Toolbar";
import './Category.css';
import "../Product/Products.css";

const Category = (props) => {
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();
    const params = queryString.parse(location.search);
    const dispatch = useDispatch();
    const {filtersorting, settings, loading: loadingFilter, error: filterError} = useSelector( state => state.filterSorting );
    const {
        category: categoryDetails,
        products,
        productCount,
        resultPerPage,
        from,
        to,
        loading,
        error
    } = useSelector( state => state.categoryDetails );
    const {categoryId} = props;
    const [action, setAction] = useState(false);
    const [listGridAction, setListGridAction] = useState(false);
    const [gridClasses, setGridClasses] = useState(['modes-mode', 'mode-grid']);
    const [listClasses, setListClasses] = useState(['modes-mode', 'mode-list']);
    const [filterValues, setFilterValues] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [sortBy, setSortBy] = useState(params['sortby'] ? params['sortby'] : 'position');
    const [sorting, setSorting] = useState(params['orderby'] ? params['orderby'] : 'asc');
    const [show, setShow] = useState(params['show'] && params['show']);
    const [gridlist, setGridlist] = useState(params['mode'] && params['mode']);
    const [currentPage, setCurrentPage] = useState(params['page'] ? params['page'] : 1);
    
    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(filterError) {
            alert.error(filterError);
            dispatch(clearErrors());
        }
    },[alert, dispatch, error, filterError]);

    useEffect(() => {
        if(!loadingFilter) {
            setFilterValues(filtersorting);
        }
    }, [filtersorting, loadingFilter]);
    
    useEffect(() => {
        if(categoryDetails && categoryDetails._id !== categoryId) {
            dispatch(getCategoryDetailsForFrontEnd(categoryId, currentPage, filterValues, show));
        }
    },[dispatch, categoryId, currentPage, filterValues, categoryDetails, show]);
    
    useEffect(() => {
        dispatch(getFilterAndSorting(categoryId));
    }, [dispatch, categoryId]);

    useEffect(() => {
         dispatch(getCategoryFilterDetailsForFrontEnd(categoryId, currentPage, filterValues, show));
    },[dispatch, categoryId, currentPage, filterValues, show]);

    /*const fetchRecord = () => {
        setTimeout(() => {
            dispatch(getCategoryDetailsForFrontEnd(categoryId, currentPage, filterValues, show));
        },1000);
    }*/
    
    const updateHandler = (_event, value, key, order) => {
        const flag = key.split("-");
        let _filterValues = [...filterValues];
        let _selectedFilters = [...selectedFilters];
        if(params) {
            let tempSelectedFilters = [];
            let _temp = {};
            for(let fKey in _filterValues) {
                const item = _filterValues[fKey];
                for(let iKey in item) {
                    const _flag = iKey.split("-");
                    if(params[_flag[0]]) {
                        switch (_flag[1]) {
                            case 'price':
                            case 'number':
                                _temp = {}
                                const _tempParam = params[_flag[0]].split("-");
                                if(_tempParam.length > 1) {
                                    _temp[iKey] = [_tempParam[0], _tempParam[1]];
                                } else {
                                    _temp[iKey] = [_tempParam[0]];
                                }
                                tempSelectedFilters[fKey] = _temp;
                            break;
                            case 'select':
                            case 'multiselect':
                            case 'checkbox':
                            case 'radio':
                                _temp = {}
                                _temp[iKey] = params[_flag[0]];
                                tempSelectedFilters[fKey] = _temp;
                            break;
                            default:
                                _temp = {}
                                _temp[iKey] = params[_flag[0]];
                                tempSelectedFilters[fKey] = _temp;
                            break;
                        }
                    }
                }
            }
            _selectedFilters = [...tempSelectedFilters];
        } 
        
        let _temp = {};
        switch (flag[1]) {
            case 'price':
            case 'number':
                _temp = {};
                _temp[key] = value;
                _filterValues[order] = _temp;
                _selectedFilters[order] = _temp;
            break;
            case 'select':
            case 'multiselect':
            case 'checkbox':
            case 'radio':
                let _currentValue = typeof _filterValues[order][key] === 'string' ? _filterValues[order][key] : "";
                _temp = {};
                if(_currentValue === "") {
                    _temp[key] = value;
                } else {
                    const isExists = _currentValue.split(",").find(item => item === value);
                    if(isExists) {
                        _temp[key] = _currentValue;
                    } else {
                        _temp[key] = _currentValue + "," + value;
                    }
                }
                _filterValues[order] = _temp;
                _selectedFilters[order] = _temp;
            break;
            default:
                _temp = {};
                _temp[key] = value;
                _filterValues[order] = _temp;
                _selectedFilters[order] = _temp;
            break;
        }
        
        setFilterValues(_filterValues);
        setSelectedFilters(_selectedFilters);
        generateUrl(_selectedFilters, navigate, location);        
    }

    const isAppliedOnFilter = (index, item) => {
        if(filtersorting.length !== 0) {
            for(let key in filtersorting) {
                for(let key1 in filtersorting[key]) {
                    const items = filtersorting[key][key1];
                    if(index === key1 && items !== item) {
                        return {index, key, key1, isExist: items.indexOf(item)};
                    }
                }
            }
        }
        return {};
    }

    const actions = (value, _item, key, order) => {
        const flag = key.split("-");
        let _filterValues = [...filterValues];
        let _selectedFilters = [...selectedFilters];
        if(params) {
            let tempSelectedFilters = [];
            let _temp = {};
            for(let fKey in _filterValues) {
                const item = _filterValues[fKey];
                for(let iKey in item) {
                    const _flag = iKey.split("-");
                    if(params[_flag[0]]) {
                        switch (_flag[1]) {
                            case 'price':
                            case 'number':
                                _temp = {}
                                const _tempParam = params[_flag[0]].split("-");
                                if(_tempParam.length > 1) {
                                    _temp[iKey] = [_tempParam[0], _tempParam[1]];
                                } else {
                                    _temp[iKey] = [_tempParam[0]];
                                }
                                tempSelectedFilters[fKey] = _temp;
                            break;
                            case 'select':
                            case 'multiselect':
                            case 'checkbox':
                            case 'radio':
                                _temp = {}
                                _temp[iKey] = params[_flag[0]];
                                tempSelectedFilters[fKey] = _temp;
                            break;
                            default:
                                _temp = {}
                                const __tempParam = params[_flag[0]].split("-");
                                if(__tempParam.length > 1) {
                                    _temp[iKey] = [__tempParam[0], __tempParam[1]];
                                } else {
                                    _temp[iKey] = [__tempParam[0]];
                                }
                                tempSelectedFilters[fKey] = _temp;
                            break;
                        }
                    }
                }
            }
            _selectedFilters = [...tempSelectedFilters];
        }

        let cloneSelectedFilters = _selectedFilters[order][key];
        let selectedValue = '';
        let leftValue = '';
        switch (flag[1]) {
            case 'price':
            case 'number':
                _filterValues[order][key] = filtersorting[order][key];
                _selectedFilters[order] = null;
            break;        
            case 'select':
            case 'multiselect':
            case 'checkbox':
            case 'radio':
                selectedValue = cloneSelectedFilters.split(",");
                if(selectedValue.length > 1) {
                    leftValue = selectedValue.filter(item => item !== value);
                    if(leftValue.length > 0 && selectedValue.length > 0) {
                        let temp = {};
                        temp[key] = leftValue.join(",");
                        _selectedFilters[order] = temp;
                    }
                } else {
                    _filterValues[order][key] = filtersorting[order][key];
                    _selectedFilters[order] = null;
                }
            break;
            default:
            break;
        }
        generateUrl(_selectedFilters, navigate, location);
        setFilterValues(_filterValues);
        setSelectedFilters(_selectedFilters);
    }

    const removeFilter = (value, item, key, order) => {
        const flag = key.split("-");
        switch (flag[1]) {
            case 'price':
            case 'number':
                if(item[key].length > 1) {
                    return (<span className="filter-value">
                        {item[key][0]}-{item[key][1]}
                        <Close onClick={() => actions(value, item, key, order)} fontSize="small" />
                    </span>);
                } else {
                    return (<span className="filter-value">
                        {item[key][0]}
                        <Close onClick={() => actions(value, item, key, order)} fontSize="small" />
                    </span>);
                }
            case 'select':
            case 'multiselect':
            case 'checkbox':
            case 'radio':
                const _temp = filtersorting[order][key];
                if(_temp){
                    const selectedValue = _temp.find(_value => _value._id.toString() === value.toString());
                    return (<span className="filter-value">
                        {selectedValue.value}
                        <Close onClick={() => actions(value, item, key, order)} fontSize="small" />
                    </span>);
                }
            break;              
            default:
            break;
        }
    }

    const getShopByOption = () => {
        let num = 0;
        for(let key in selectedFilters) {
            if(selectedFilters[key] !== null && selectedFilters[key] !== undefined) {
                num++;
            }
        }
        
        if(params) {
            let _filterValues = [...filterValues];
            let _selectedFilters = [...selectedFilters];
            let tempSelectedFilters = [];
            let _temp = {};
            for(let fKey in _filterValues) {
                const item = _filterValues[fKey];
                for(let iKey in item) {
                    const _flag = iKey.split("-");
                    if(params[_flag[0]]) {
                        switch (_flag[1]) {
                            case 'price':
                            case 'number':
                                _temp = {}
                                const _tempParam = params[_flag[0]].split("-");
                                if(_tempParam.length > 1) {
                                    _temp[iKey] = [_tempParam[0], _tempParam[1]];
                                } else {
                                    _temp[iKey] = [_tempParam[0]];
                                }
                                tempSelectedFilters[fKey] = _temp;
                            break;
                            case 'select':
                            case 'multiselect':
                            case 'checkbox':
                            case 'radio':
                                _temp = {}
                                _temp[iKey] = params[_flag[0]];
                                tempSelectedFilters[fKey] = _temp;
                            break;
                            default:
                                _temp = {};
                                _temp[iKey] = params[_flag[0]];
                                tempSelectedFilters[fKey] = _temp;
                            break;
                        }
                    }
                }
            }
            _selectedFilters = [...tempSelectedFilters];
            
            return (_selectedFilters.length > 0 && <div className="shop-by-option">
                <Typography className="title">Shop By Options</Typography>
                <ul className="selected-filters">
                {
                    _selectedFilters.map((item, index) => {
                        for(let key in item) {
                        const flag = key.split("-");
                            if(params[flag[0]]) {
                                switch (flag[1]) {
                                    case 'price':
                                    case 'number':
                                        if(flag.length > 1) {
                                            return (
                                                <li key={key} className="item">
                                                    <span className="filter-title">{flag[0]}</span>: {removeFilter(params[flag[0]], item, key, index)}
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={key} className="item">
                                                    <span className="filter-title">{flag[0]}</span>: {removeFilter(params[flag[0]], item, key, index)}
                                                </li>
                                            );
                                        }
                                    case 'select':
                                    case 'multiselect':
                                    case 'checkbox':
                                    case 'radio':
                                        const itemvalue = params[flag[0]].split(",");
                                        return (<Hoc key={index}>{
                                            itemvalue.map((value, i) => {
                                                return (
                                                    <li key={i} className="item">
                                                        <span className="filter-title">{flag[0]}</span>: {removeFilter(value, item[key], key, index)}
                                                    </li>
                                                )
                                            })
                                        }</Hoc>);
                                    default:
                                    break;
                                }
                            }
                        }
                        return <Hoc key={index}></Hoc>;
                    })
                }
                </ul>
            </div>);
        }

        return (<>{num > 0 && <div className="shop-by-option">
            <Typography className="title">Shop By Options</Typography>
            <ul className="selected-filters">
            {selectedFilters.map((item, index) => {
                for(let key1 in item) {
                    const flag = key1.split("-");
                    const isExit = Object.keys(isAppliedOnFilter(key1, item[key1]));
                    if(isExit.length) {
                        switch (flag[1]) {
                            case 'price':
                            case 'number':
                                if(flag.length > 1) {
                                    return (
                                        <li key={key1} className="item">
                                            <span className="filter-title">{flag[0]}</span>: {removeFilter(item[key1], item, key1, index)}
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={key1} className="item">
                                            <span className="filter-title">{flag[0]}</span>: {removeFilter(item[key1], item, key1, index)}
                                        </li>
                                    );
                                }
                            case 'select':
                            case 'multiselect':
                            case 'checkbox':
                            case 'radio':
                                const itemvalue = item[key1].split(",");
                                return (<Hoc key={index}>{
                                    itemvalue.map((value, i) => {
                                        return (
                                            <li key={i} className="item">
                                                <span className="filter-title">{flag[0]}</span>: {removeFilter(value, item[key1], key1, index)}
                                            </li>
                                        )
                                    })
                                }</Hoc>);
                            default:
                            break;
                        }
                    }
                }
                return true;
            })}
            </ul>
        </div>}</>);
    }

    const getOptionValue = (order, key, filters) => {
        const flag = key.split("-");
        let tempValue = [];
        if(location.search) {
            const params = new URLSearchParams(location.search);
            const paramValue = params.get(flag[0]);
            if(paramValue !== null) {
                switch (flag[1]) {
                    case 'price':
                    case 'number':
                        tempValue = [];
                        const _value = paramValue.split("-");
                        if(_value.length === 2) {
                            tempValue = [parseInt(_value[0]), parseInt(_value[1])];
                        } else {
                            tempValue = [parseInt(_value[0])];
                        }
                    break;                         
                    case 'select':
                    case 'multiselect':
                    case 'checkbox':
                    case 'radio':
                        tempValue = paramValue;
                    break;
                    default:
                    break;
                }
                return tempValue ? tempValue : filters[key];
            } else {
                return filterValues.length > 0 && filterValues[order][key] ? filterValues[order][key] : filters[key];
            }
        } else {
            return filterValues.length > 0 && filterValues[order][key] ? filterValues[order][key] : filters[key];
        }
    }

    const getFilterBox = () => {
        return (
            <>{filtersorting.length !== 0 && <div className="filterBox">
                {getShopByOption()}
                <Typography className="filters-title">Refine Your search</Typography>
                <ul className="filters">
                    {filtersorting.map((filters, index) => {
                        for(let key1 in filters) {
                            const flag = key1.split("-");
                            switch (flag[1]) {
                                case 'price':
                                case 'number':
                                    if(filters[key1].length > 1 && filters[key1][0] < filters[key1][1]) {
                                        return <DoubleHandleSlider
                                            key={key1}
                                            title={flag[0]}
                                            value={getOptionValue(index, key1, filters)}
                                            onChange={(e, value) => updateHandler(e, value, key1, index)}
                                            min={filters[key1][0]}
                                            max={filters[key1][1]}
                                            sliderType={`range-slider`}
                                        />
                                    } else {
                                        return <DoubleHandleSlider
                                            key={key1}
                                            title={flag[0]}
                                            value={getOptionValue(index, key1, filters)}
                                            onChange={(e, value) => updateHandler(e, value, key1, index)}
                                            min={0}
                                            max={filters[key1][0] * 1.5}
                                            sliderType={`continues-slider`}
                                        />
                                    }
                                case 'select':
                                case 'multiselect':
                                case 'checkbox':
                                case 'radio':
                                    return (<li key={key1} className="filter-item">
                                        <Typography className="title">{flag[0]}</Typography>
                                        <div className="filter-container-others">
                                            {filters[key1].length>0 && <ul className="list">{filters[key1].map(item => {
                                                return <li key={item._id} className="item">
                                                    <Button 
                                                        style={{ backgroundColor: 'transparent' }} 
                                                        variant="link"
                                                        onClick={(e) => updateHandler(e, item._id, key1, index)}>
                                                            {item.value}
                                                    </Button>
                                                </li>
                                            })}</ul>}
                                        </div>
                                    </li>);
                                default:
                                break;
                            }
                        }
                        return true;
                    })}
                </ul>
            </div>}</>
        )
    }

    const getProductGrid = () => {
        if(loading) {
            return <Loader />
        }
        if(products.length <= 0) {
            return <>These are not product for listing</>
        }
        return (<>
                {getToolber("top-toolbar")}
                {
                    products.length > 0 && (<div className={`productgrid ${gridlist}`}>
                        {
                            products.length > 0 ? <>
                                {
                                    products && products.map((product) => {
                                        return <ProductCard product={product} key={product._id} />
                                    })
                                }
                            </>:
                            <>There is not any products.</>
                        }
                    </div>)
                }
                {getToolber("bottom-toolbar")}
            </>
        );
    }
    
    const getToolber = (position) => {
        return <ToolBar 
            position={`toolbar ${position}`} 
            filterValues={filterValues}
            setFilterValues={setFilterValues}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            productCount={productCount}
            resultPerPage={resultPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            from={from}
            to={to}
            sortBy={sortBy}
            setSortBy={setSortBy}
            show={show}
            setShow={setShow}
            gridlist={gridlist}
            setGridlist={setGridlist}
            sorting={sorting}
            setSorting={setSorting}
            settings={settings}
            action={action}
            setAction={setAction}
            listGridAction={listGridAction}
            setListGridAction={setListGridAction}
            gridClasses={gridClasses}
            setGridClasses={setGridClasses}
            listClasses={listClasses}
            setListClasses={setListClasses}
        />
    }

    const getCategoryImageSection = () => {
        return (
            <div className="image">
                {
                    categoryDetails.images && categoryDetails.images.length > 0 && <>
                        {
                            categoryDetails.images.map(image => {
                                return <img key={image.public_id} src={image.url} alt={categoryDetails.name}  />
                            })
                        }
                    </>
                }
                <div className="category-title">{categoryDetails.name}</div>
                <div className="category-description">{categoryDetails.description}</div>
            </div>
        );
    }

    return (<>
        <MetaData title={`${categoryDetails && categoryDetails.name} -- Ecommerce`} />
        <div className="category-container">
            {getCategoryImageSection()}
            <div className="productContainer">
                <div className="products">
                    {getProductGrid()}
                </div>
                {getFilterBox()}
            </div>
        </div>
    </>);
}

export default Category;
