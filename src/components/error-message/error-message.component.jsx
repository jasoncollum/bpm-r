import React from 'react';

import './error-message.styles.scss';

const ErrorMessage = ({ message }) => {
    return <div className='error-message'>{message}</div>
}

export default ErrorMessage;