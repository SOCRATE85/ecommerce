import React, { useEffect, useState } from "react";
import NorthIcon from '@mui/icons-material/North';
import { generateUrl, findTheIndex } from "../../common/attribute";
import { useLocation, useNavigate } from "react-router-dom";

export const SortBy = (props) => {
    const [sortByValue, setSortByValue] = useState('');
     const [sortingValue, setSortingValue] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        setSortByValue(props.sortBy);
        setSortingValue(props.sorting === 'asc' ? 'desc' : 'asc');
    },[props]);

    const changeValueHandler = (e) => {
        let _filterValues = [...props.filterValues];
        let _selectedFilters = [...props.selectedFilters];
        let temp = {};
        temp['sortby'] = [e.target.value];
        const selectedFilterIndex = findTheIndex(_selectedFilters, 'sortby');
        const filterValuesIndex = findTheIndex(_filterValues, 'sortby');
        _selectedFilters[selectedFilterIndex] = temp;
        _filterValues[filterValuesIndex] = temp;
        setSortByValue(e.target.value);
        props.setSortBy(e.target.value);
        generateUrl(_selectedFilters, navigate, location);
        props.setSelectedFilters(_selectedFilters);
        props.setFilterValues(_filterValues);
    }

    const sortingHandler = () => {
        let _filterValues = [...props.filterValues];
        let _selectedFilters = [...props.selectedFilters];
        let temp = {};
        temp['orderby'] = [sortingValue];
        const selectedFilterIndex = findTheIndex(_selectedFilters, 'orderby');
        const filterValuesIndex = findTheIndex(_filterValues, 'orderby');
        _selectedFilters[selectedFilterIndex] = temp;
        _filterValues[filterValuesIndex] = temp;
        setSortingValue(sortingValue);
        props.setSorting(sortingValue);
        generateUrl(_selectedFilters, navigate, location);
        props.setSelectedFilters(_selectedFilters);
        props.setFilterValues(_filterValues);
    }

    return (
        <div className="toolbar-sorter sorter">
            <label className="sorter-label" htmlFor="sorter">Sort By</label>
            <select id="sorter" data-role="sorter" value={sortByValue} onChange={(e) => changeValueHandler(e)} className="sorter-options">
                {
                    props.allSortByValue && props.allSortByValue.map((item) => {
                        return <option value={item.value} key={item.value}>{item.title}</option>
                    })
                }
            </select>
            <NorthIcon onClick={() => sortingHandler()} />
        </div>
    );
}