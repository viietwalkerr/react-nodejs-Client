import React from 'react';
import "./RainbowButton.css";

interface RainbowButtonProps {
    type?: "button" | "submit";
    title: string;
}

const RainbowButton: React.FC<RainbowButtonProps> = ({
    type = "submit",
    title = "Button",

}) => {
    return (
        <button type={type} className='rainbowButton'>
            <span>{title}</span>
        </button>
    )
}

export default RainbowButton
