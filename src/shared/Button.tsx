import React from 'react';

import './Button.scss';

interface ButtonProps {
    buttonText: string | JSX.Element | JSX.Element[],
    onClick?: () => void | null,
    type?: "button" | "submit" | "reset" | undefined,
    isDisabled?: boolean,
    isReversed?: boolean
}

function Button({ buttonText,  onClick, type, isDisabled, isReversed }: ButtonProps) {
    return (
        <button 
            className={`button ${isDisabled && "button--disabled"} ${isReversed && "button--reversed"}`} 
            type={type} onClick={onClick} 
            disabled={isDisabled}
            >
            {buttonText}
        </button>
    );
}

export default Button;