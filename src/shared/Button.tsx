import React from 'react';

import './Button.scss';

interface ButtonProps {
    buttonText: string | JSX.Element | JSX.Element[],
    reversed?: boolean | null,
    onClick: () => void
}

function Button({ buttonText, reversed, onClick }: ButtonProps) {
    return (
        <button className={reversed ? "button--reversed" : "button"} onClick={onClick}>
            {buttonText}
        </button>
    );
}

export default Button;