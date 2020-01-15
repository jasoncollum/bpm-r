import React, { useReducer, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import CurrentUserContext from '../../contexts/current-user.context';

import './new-entry-form.styles.scss';

const initialState = {
    date: '',
    systolic: '',
    diastolic: '',
    pulse: '',
    weight: '',
    notes: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_DATE":
            return { ...state, date: action.value };

        case "UPDATE_SYSTOLIC":
            return { ...state, systolic: action.value };

        case "UPDATE_DIASTOLIC":
            return { ...state, diastolic: action.value };

        case "UPDATE_PULSE":
            return { ...state, pulse: action.value };

        case "UPDATE_WEIGHT":
            return { ...state, weight: action.value };

        case "UPDATE_NOTES":
            return { ...state, notes: action.value };

        default:
            return state;
    }
}

const NewEntryForm = () => {
    const currentUser = useContext(CurrentUserContext)
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = e => {
        e.preventDefault();
        console.log('New Entry Form SUBMIT Button Clicked...');
        console.log("USER_ID::", currentUser.id)

        try {
            // Add logic to post new entry to db here
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;

        dispatch({ type: `UPDATE_${name.toUpperCase()}`, value })
    }

    return (
        <div className='new-entry-form'>
            {/* <span>Add a new entry</span> */}
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='number'
                    name='systolic'
                    value={state.systolic}
                    onChange={handleChange}
                    label='systolic'
                    required
                />
                <FormInput
                    type='number'
                    name='diastolic'
                    value={state.diastolic}
                    onChange={handleChange}
                    label='diastolic'
                    required
                />
                <FormInput
                    type='number'
                    name='pulse'
                    value={state.pulse}
                    onChange={handleChange}
                    label='pulse'
                    required
                />
                <FormInput
                    type='number'
                    name='weight'
                    value={state.weight}
                    onChange={handleChange}
                    label='weight'
                    required
                />
                <textarea
                    className='entry-form-textarea'
                    name='notes'
                    value={state.notes}
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