import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import './GlobalFilter.css'
import { Link } from '@material-ui/core';


const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div className="main">
            <input type="text" value={filter || ''} onChange={(e) => setFilter(e.target.value)} 
             placeholder="Search anything..." className='search' />
             <Link><SearchIcon style={{ cursor:"pointer"}} /></Link>
        </div>
    )
}

export default GlobalFilter
