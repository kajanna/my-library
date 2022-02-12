import React from 'react';

import './BackDrop.scss'

interface BackDropProps {
    close: () => void
}

function BackDrop({ close }: BackDropProps) {
    return <div className='backdrop' onClick={close}></div>
}

export default BackDrop;