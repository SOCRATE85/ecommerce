import React, { useEffect } from "react";
import { generateUrl, findTheIndex } from "../../common/attribute";
import { useLocation, useNavigate } from "react-router-dom";

export const ListGrid = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    let find = null;

    const mode = props.mode.split("_");
    useEffect(() => {
        if(!props.listGridAction) {
            let _listClasses = [];
            let _gridClasses = [];
            const active = mode[0];
            if(props.gridlist === undefined) {
                if(active === 'grid') {
                    _gridClasses = [...props.gridClasses];
                    _gridClasses.push('active');
                    props.setGridClasses(_gridClasses);
                }
                if(active === 'list') {
                    _listClasses = [...props.listClasses];
                    _listClasses.push("active");
                    props.setListClasses(_listClasses);
                }
            } else {
                if(props.gridlist === 'grid') {
                    _gridClasses = [...props.gridClasses];
                    _gridClasses.push('active');
                    props.setGridClasses(_gridClasses);
                } else {
                    _listClasses = [...props.listClasses];
                    _listClasses.push("active");
                    props.setListClasses(_listClasses);
                }
            }
            props.setGridlist(props.gridlist ? props.gridlist : active);
            props.setListGridAction(true);
        }
    },[props, mode]);

    const listgridHandler = (flag) => {
        props.setShow(props.defaultValue);
        props.setListGridAction(true);
        props.setAction(false);
        let _listClasses = [];
        let _gridClasses = [];
        if(flag === 'grid') {
            _listClasses = props.listClasses.filter(item => item !== 'active');
            _gridClasses = [...props.gridClasses];
            find = _gridClasses.find(item => item === 'active');
            if(!find) {
                 _gridClasses.push('active');
            }
        } else {
            _gridClasses = props.gridClasses.filter(item => item !== 'active');
            _listClasses = [...props.listClasses];
            find = _listClasses.find(item => item === 'active');
            if(!find) {
                 _listClasses.push('active');
            }
        }
        props.setListClasses(_listClasses);
        props.setGridClasses(_gridClasses);
        let _filterValues = [...props.filterValues];
        let _selectedFilters = [...props.selectedFilters];
        let temp = {};
        temp['mode'] = [flag];
        const selectedFilterIndex = findTheIndex(_selectedFilters, 'mode');
        const filterValuesIndex = findTheIndex(_filterValues, 'mode');
        _selectedFilters[selectedFilterIndex] = temp;
        _filterValues[filterValuesIndex] = temp;
        props.setGridlist(flag);
        generateUrl(_selectedFilters, navigate, location);
        props.setSelectedFilters(_selectedFilters);
        props.setFilterValues(_filterValues);
    }

    if(mode.length === 1) {
        return <div className="modes"></div>
    }

    return (<div className="modes">
        <strong className="modes-label" id="modes-label">View as</strong>
        <strong title="Grid" className={props.gridClasses.join(" ")} onClick={() => listgridHandler('grid')} data-value="grid">
            <span>Grid</span>
        </strong>
        <strong title="List" className={props.listClasses.join(" ")} onClick={() => listgridHandler('list')} data-value="list">
            <span>List</span>
        </strong>
    </div>);
}