import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { findTheIndex, generateUrl } from "../../common/attribute";
import { useLocation, useNavigate } from "react-router-dom";

export const Pagination = ({
    currentPage,
    from,
    to,
    total,
    recordPerPage,
    numOfPage,
    setCurrentPage,
    filterValues,
    selectedFilters,
    setSelectedFilters,
    setFilterValues
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [pages, setPages] = useState([]);
    
    useEffect(() => {
        const _temp = [];
        const _numOfPage = Math.ceil(total/recordPerPage);
        for(let i = 1; i <= _numOfPage; i++) {
            _temp.push(i)
        }
        setPages(_temp);
    },[total, recordPerPage]);
    
    const pagingHandler = (pageNo) => {
        let _filterValues = [...filterValues];
        let _selectedFilters = [...selectedFilters];
        let temp = {};
        temp['page'] = [pageNo];
        const selectedFilterIndex = findTheIndex(_selectedFilters, 'page');
        const filterValuesIndex = findTheIndex(_filterValues, 'page');
        _selectedFilters[selectedFilterIndex] = temp;
        _filterValues[filterValuesIndex] = temp;
        setCurrentPage(pageNo);
        generateUrl(_selectedFilters, navigate, location);
        setSelectedFilters(_selectedFilters);
        setFilterValues(_filterValues);
    }

    if(pages.length === 0) {
        return (<div className="pages"></div>);
    }
    
    return (
        <div className="pages">
            <strong className="label pages-label" id="paging-label">Page</strong>
            <ul className="items pages-items" aria-labelledby="paging-label">
                {(currentPage-1) !==0 && <li className="item pages-item-prev">
                    <Button onClick={() => pagingHandler(currentPage - 1)} className="action prev" title="Prev">
                        <span className="label">Page</span>
                        <span>Prev</span>
                    </Button>
                </li>}
                {pages.map((page) => {
                    if(currentPage === page) {
                        return (
                            <li className="item current" key={`page_${page}`}>
                                <Button className="page" onClick={() => pagingHandler(page)}>
                                    <span className="label">You're currently reading page</span>
                                    <span>{page}</span>
                                </Button>
                            </li>
                        );
                    } else {
                        return (
                            <li className="item" key={`page_${page}`}>
                                <Button className="page" onClick={() => pagingHandler(page)}>
                                    <span className="label">Page</span>
                                    <span>{page}</span>
                                </Button>
                            </li>
                        );
                    }
                })}
                {pages.length > currentPage && <li className="item pages-item-next">
                    <Button className="action next" title="Next" onClick={() => pagingHandler(currentPage + 1)}>
                        <span className="label">Page</span>
                        <span>Next</span>
                    </Button>
                </li>}
            </ul>
        </div>
    );
}
