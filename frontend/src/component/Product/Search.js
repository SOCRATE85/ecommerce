import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Search.css";

const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }else{
            navigate(`/products`);
        }
    }

    return <>
        <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input 
                type={"text"} 
                placeholder="Search a Product ..." 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
            />
            <input type={"submit"} value="search" />
        </form>
    </>
}

export default Search;
