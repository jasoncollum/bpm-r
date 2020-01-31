import React, { useReducer, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import ErrorMessage from '../error-message/error-message.component';

import BpmContext from '../../contexts/bpm.context';
import { firestore } from '../../firebase/firebase.utils';

import './new-entry-form.styles.scss';

const initialState = {
    systolic: '',
    diastolic: '',
    pulse: '',
    weight: '',
    notes: '',
    userId: ''
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
    const { currentUser, fetchEntries } = useContext(BpmContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [hasError, setHasError] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let date = moment().format();
        try {
            await firestore.collection('entries')
                .add({
                    ...state,
                    userId: currentUser.id,
                    date
                })
            fetchEntries();
            history.push('/entries');
        } catch (error) {
            setHasError(true);
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;

        dispatch({ type: `UPDATE_${name.toUpperCase()}`, value })
    }

    return (
        <div className='new-entry-form'>
            {hasError && <ErrorMessage message='Unable to save bpm entry' />}
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