import React from 'react';

const WithoutMenu = Component => {
    return props => (
        <div className="App">
            <Component {...props}> </Component>
        </div>
    );
};

export default WithoutMenu;
