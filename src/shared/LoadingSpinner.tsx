import React from 'react';
import { createPortal } from 'react-dom';

import './LoadingSpinner.scss'

function LoadingSpinner() {
    const loadingSpinner = (
      <div className="loading-spinner__bg">
        <div className="loading-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
    const spinnerRoot = document.getElementById("spinner-root") as HTMLElement;
    return createPortal(loadingSpinner, spinnerRoot);
}

export default LoadingSpinner;