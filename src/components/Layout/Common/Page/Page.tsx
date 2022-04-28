import React, { ReactNode } from 'react';
import "./Page.scss";

interface PageProps {
    children: ReactNode;
}

const Page: React.FC<PageProps> = ({ 
    children 
}) => {
    return (
        <div className='page'>
            <div className='page-content'>
                {children}
            </div>
        </div>
    )
};

export default Page;