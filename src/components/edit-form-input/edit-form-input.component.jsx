import React from 'react';

import './edit-form-input.styles.scss';

const EditFormInput = ({ handleChange, label, ...otherProps }) => (
    <div className='group'>
        <input className='edit-form-input' onChange={handleChange} {...otherProps} />
        {
            label ?
                (<label className={`${otherProps.value.length ? 'shrink' : ''} edit-form-input-label`}>
                    {label}
                </label>)
                : null
        }
    </div>
)

export default EditFormInput;