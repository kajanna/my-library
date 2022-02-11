import React from 'react';

import './Button.scss';

interface ButtonProps {
    buttonText: string | JSX.Element | JSX.Element[],
    onClick?: () => void | null,
    type?: "button" | "submit" | "reset" | undefined,
    disabled?: boolean
}

function Button({ buttonText,  onClick, type, disabled }: ButtonProps) {
    return (
        <button className="button" type={type} onClick={onClick} disabled={disabled}>
            {buttonText}
        </button>
    );
}

export default Button;