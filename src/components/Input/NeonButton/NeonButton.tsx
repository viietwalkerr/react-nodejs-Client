// import React from 'react';
import "./NeonButton.scss";

interface NeonButtonProps {
    type?: "button" | "submit";
    title: string;
    onClick?: () => void;
    id?: string | undefined;
    className?: string;
};

const NeonButton: React.FC<NeonButtonProps> = ({
    type = "submit",
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
