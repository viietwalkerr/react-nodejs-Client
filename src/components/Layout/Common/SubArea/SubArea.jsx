import React from 'react';
import "./SubArea.scss";

const SubArea = ({ 
    heading,
    children, 


}) => {
    return (
        <div className='sub'>
            <div className='sub-container'>
            <h2>{heading}</h2>
            <div className='subcontent'>
                {children.map((child) => {
                    return (
                        <div className='section'>
                        {child}
                        </div>
                    )
                    
                })}
                {/* <div className='first-area'>
                    {children[0] && children[0]}
                </div>
                <div className='second-area'>
                    {children[1] && children[1]}
                </div>
                <div className='third-area'>
                    {children[2] && children[2]}
                </div> */}
            </div>
            </div>
        </div>
    )
}

export default SubArea;