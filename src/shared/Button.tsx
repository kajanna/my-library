import React from 'react';

import './Button.scss';

interface ButtonProps {
    buttonText: string
    reversed?: boolean | null
}

function Button({ buttonText, reversed }: ButtonProps) {
    return (
        <button className={reversed ? "button--reversed" : "button"}>
            {buttonText}
        </button>
    );
}

export default Button;