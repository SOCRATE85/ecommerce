import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findTheIndex, generateUrl, getToolbarValue } from "../../common/attribute";
import { useLocation, useNavigate } from "react-router-dom";

export const Show = (props) => {
    const {settings, loading: loadingFilter} = useSelector( state => state.filterSorting ); 
    const [allShowValue, setAllShowValue] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        setAllShowValue(props.gridlist === 'grid' ? getToolbarValue(settings,"catalog/per_page_in_grid").split(",") : getToolbarValue(settings,"catalog/per_page_in_list").split(","));        
    },[props, settings]);

    useEffect(() => {
        if(!props.action) {
            props.setShow(props.gridlist === 'grid' ? getToolbarValue(settings,"catalog/per_page_in_grid_default") : getToolbarValue(settings,"catalog/per_page_in_list_default"));
            props.setAction(true);
        }
    }, [props, settings]);

    const changeValueHandler = (e) => {
        let _filterValues = [...props.filterValues];
        let _selectedFilters = [...props.selectedFilters];
        let temp = {};
        temp['show'] = [e.target.value];
        const selectedFilterIndex = findTheIndex(_selectedFilters, 'show');
        const filterValuesIndex = findTheIndex(_filterValues, 'show');
        _selectedFilters[selectedFilterIndex] = temp;
        _filterValues[filterValuesIndex] = temp;
        props.setShow(e.target.value);
        generateUrl(_selectedFilters, navigate, location);
        props.setSelectedFilters(_selectedFilters);
        props.setFilterValues(_filterValues);
    }
    if(loadingFilter){return <></>}
    return (
        <div className="field limiter">
            <label className="label" htmlFor="limiter"><span>Show</span></label>
            <div className="control">
                <select id="limiter" data-role="limiter" value={typeof props.show === "object" ? props.show[0] : props.show} onChange={(e) => changeValueHandler(e)} className="limiter-options">
                    {
                        allShowValue && allShowValue.map((item) => {
                            return <option value={item} key={item}>{item}</option>
                        })
                    }
                </select>
            </div>
            <span className="limiter-text">per page</span>
        </div>
    );
}