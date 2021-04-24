import React, { useState } from 'react';
import { initialState } from './initialState';

const initialStateValue = {...initialState};
export const Context = React.createContext(undefined);


const Store = (props) => {
    const [state, setState] = useState(initialStateValue);

    return (
        <Context.Provider value={[state, setState]}>
            {props.children}
        </Context.Provider>
    )
}

export default Store;