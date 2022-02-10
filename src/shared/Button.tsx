import React from 'react';

import './Button.scss';

interface ButtonProps {
    buttonText: string | JSX.Element | JSX.Element[],
    onClick?: () => void | null,
    type?: "button" | "submit" | "reset" | undefined
}

function Button({ buttonText,  onClick, type }: ButtonProps) {
    return (
        <button className="button" type={type} onClick={onClick}>
            {buttonText}
        </button>
    );
}

export default Button;