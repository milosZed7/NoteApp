import React from 'react';
import Menu from './Menu';

const WithMenu = Component => {
    return props => (
        <React.Fragment>
            <Menu {...props} />
            <div className="App">
                <Component {...props}> </Component>
            </div>
        </React.Fragment>
    );
};

export default WithMenu;
