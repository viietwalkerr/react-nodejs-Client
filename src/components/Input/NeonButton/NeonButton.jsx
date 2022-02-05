import React from 'react';
import "./NeonButton.scss";


const NeonButton = ({
    type = "Submit",
    title = "Button",
    onClick,
    id = "none",
    className = id === "backToTopBtn" ? "" : "neonButton",


}) => {
    return (
        <button type={type} id={id} className={className} onClick={onClick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>{title}
        </button>
    )
}

export default NeonButton
