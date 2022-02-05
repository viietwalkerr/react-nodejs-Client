import React from 'react';
import "./RainbowButton.css";

const RainbowButton = ({
    type = "Submit",
    title = "Button",

}) => {
    return (
        <button type={type} className='rainbowButton'>
            <span>{title}</span>
        </button>
    )
}

export default RainbowButton
