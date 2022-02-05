import React from 'react';
import "./Page.scss";

const Page = ({ children }) => {
    return (
        <div className='page'>
            <div className='page-content'>
                {children}
            </div>
        </div>
    )
};

export default Page;