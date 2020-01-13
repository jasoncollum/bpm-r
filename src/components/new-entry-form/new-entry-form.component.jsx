import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './new-entry-form.styles.scss';

const NewEntryForm = () => {
    const [newEntryData, setNewEntryData] = useState({
        date: '',
        systolic: '',
        diastolic: '',
        pulse: '',
        weight: '',
        notes: ''
    });

    const { date, systolic, diastolic, pulse, weight, notes } = newEntryData;

    const handleSubmit = e => {
        console.log('New Entry Form SUBMIT Button Clicked...');
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setNewEntryData({ ...newEntryData, [name]: value });
    }

    return (
        <div className='new-entry-form'>
            {/* <span>Add a new entry</span> */}
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='systolic'
                    value={systolic}
                    onChange={handleChange}
                    label='systolic'
                    required
                />
                <FormInput
                    type='text'
                    name='diastolic'
                    value={diastolic}
                    onChange={handleChange}
                    label='diastolic'
                    required
                />
                <FormInput
                    type='text'
                    name='pulse'
                    value={pulse}
                    onChange={handleChange}
                    label='pulse'
                    required
                />
                <FormInput
                    type='text'
                    name='weight'
                    value={weight}
                    onChange={handleChange}
                    label='weight'
                    required
                />
                <textarea
                    className='entry-form-textarea'
                    name='notes'
                    value={notes}
                    placeholder='Enter notes here...'
                    onChange={handleChange}
                    rows='2'
                >

                </textarea>
                <CustomButton type='submit'> SAVE ENTRY </CustomButton>
            </form>

        </div>
    )
}

export default NewEntryForm;