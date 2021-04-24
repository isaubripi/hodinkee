import React, { useContext } from 'react';
import '../App.css';

import {Context} from '../Store';
const Header = () => {

    const [state, setState] = useContext(Context); 

    const goToPage = (e) => {
        let newGlobaState = {...state};
        newGlobaState.currentPage = e.target.id;
        setState(newGlobaState);
    }

    return (

        <div className="is-sticky">
            <div className="blogHeader">Blog</div>
            <div className="itemsHeader">
                <div className="itemHeader" onClick={(e)=>goToPage(e)} id="local">Local Articles</div>
                <div className="itemHeader" onClick={(e)=>goToPage(e)} id="remote">Remote Articles </div>
            </div> 
        </div>
    )
}

export default Header;