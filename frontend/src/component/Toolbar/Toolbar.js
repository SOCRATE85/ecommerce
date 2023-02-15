import React from "react";
import { useSelector } from "react-redux";
import { ListGrid } from "./ListGrid";
import { ToolbarAmount } from './ToolbarAmount';
import { SortBy } from './SortBy';
import { Pagination } from './Pagination';
import { Show } from './Show';
import { getToolbarValue } from "../../common/attribute";

export const ToolBar = (props) => {
    const {settings, loading: loadingFilter} = useSelector( state => state.filterSorting );
    if(loadingFilter){return <></>}
    return (<>
        <div className={props.position}>
            <ListGrid 
                filterValues={props.filterValues}
                setFilterValues={props.setFilterValues}
                selectedFilters={props.selectedFilters}
                setSelectedFilters={props.setSelectedFilters}
                gridlist={props.gridlist}
                setGridlist={props.setGridlist}
                mode={getToolbarValue(settings,"catalog/list_mode")}
                listGridAction={props.listGridAction}
                setListGridAction={props.setListGridAction}
                setAction={props.setAction}
                gridClasses={props.gridClasses}
                setGridClasses={props.setGridClasses}
                listClasses={props.listClasses}
                setListClasses={props.setListClasses}
                setShow={props.setShow}
                defaultValue={props.gridlist === 'grid' ? getToolbarValue(settings,"catalog/per_page_in_grid_default") : getToolbarValue(settings,"catalog/per_page_in_list_default")}
            />
            <ToolbarAmount 
                from={props.from}
                to={props.to}
                total={props.productCount}
                resultPerPage={props.resultPerPage}
            />
            <Pagination 
                filterValues={props.filterValues}
                setFilterValues={props.setFilterValues}
                selectedFilters={props.selectedFilters}
                setSelectedFilters={props.setSelectedFilters}
                currentPage={props.currentPage}
                setCurrentPage={props.setCurrentPage}
                from={props.from}
                to={props.to}
                total={props.productCount}
                recordPerPage={props.show}
                numOfPage={Math.ceil(props.productCount/props.show)}
            />
            {props.gridlist && <Show
                allShowValue={props.gridlist === 'grid' ? getToolbarValue(settings,"catalog/per_page_in_grid").split(",") : getToolbarValue(settings,"catalog/per_page_in_list").split(",")}
                filterValues={props.filterValues}
                setFilterValues={props.setFilterValues}
                selectedFilters={props.selectedFilters}
                setSelectedFilters={props.setSelectedFilters}
                action={props.action}
                setAction={props.setAction}
                show={props.show}
                gridlist={props.gridlist}
                setShow={props.setShow}
                sorting={props.sorting}
                setSorting={props.setSorting}
                defaultValue={props.gridlist === 'grid' ? getToolbarValue(settings,"catalog/per_page_in_grid_default") : getToolbarValue(settings,"catalog/per_page_in_list_default")}
            />}
            <SortBy 
                allSortByValue={[
                {value: 'position', title: "Position"}, 
                {value: 'name', title: "Product Name"}, 
                {value: 'price', title: "Price"}]} 
                filterValues={props.filterValues}
                setFilterValues={props.setFilterValues}
                selectedFilters={props.selectedFilters}
                setSelectedFilters={props.setSelectedFilters}
                sortBy={props.sortBy}
                setSortBy={props.setSortBy}
                sorting={props.sorting}
                setSorting={props.setSorting}
            />
        </div>
    </>);
}
