import React from 'react';

import './AppearAnimation.scss'

interface AppearAnimationProps {
    children: JSX.Element | JSX.Element[]
}

function AppearAnimation({ children }: AppearAnimationProps) {
    return (
        <div className='appear-animation'>
            {children}
        </div>
    );
}

export default AppearAnimation;