import React, { FC } from 'react';
import "./SubArea.scss";

interface SubAreaProps {
    heading: string;
    children: React.ReactElement[];
};

const SubArea: FC<SubAreaProps> = ({ 
    heading,
    children, 


}) => {
    return (
        <div className='sub'>
            <div className='sub-container'>
                <h2>{heading}</h2>
                <div className='subcontent'>
                    {children?.map((child) => {
                        return (
                            <div className='section'>
                            {child}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SubArea;