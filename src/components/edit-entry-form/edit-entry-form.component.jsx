import React, { useReducer, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import EditFormInput from '../edit-form-input/edit-form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import ErrorMessage from '../error-message/error-message.component';
import { Button } from 'reactstrap';

import BpmContext from '../../contexts/bpm.context';
import { firestore } from '../../firebase/firebase.utils';

import '../new-entry-form/new-entry-form.styles.scss';
import './edit-entry-form.styles.scss';

const reducer = (state, action) => {
    switch (action.type) {
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

const EditEntryForm = ({ entry }) => {
    const { currentUser, fetchEntries } = useContext(BpmContext);
    const [state, dispatch] = useReducer(reducer, entry);
    const [hasError, setHasError] = useState(false);
    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const entryRef = await firestore.collection(`users/${currentUser.id}/entries`).doc(entry.id);

            await firestore.collection(`users/${currentUser.id}/entries`).doc(entryRef.id).set({
                date: state.date,
                systolic: state.systolic,
                diastolic: state.diastolic,
                pulse: state.pulse,
                weight: state.weight,
                notes: state.notes
            });

            fetchEntries();
            history.push('/entries');
        } catch (error) {
            setMessage('Unable to save edited entry');
            setHasError(true);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        try {
            const entryRef = await firestore.collection(`users/${currentUser.id}/entries`).doc(entry.id);

            await firestore.collection(`users/${currentUser.id}/entries`).doc(entryRef.id).delete();

            fetchEntries();
            history.push('/entries');
        } catch (error) {
            setMessage('Unable to delete entry');
            setHasError(true);
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        dispatch({ type: `UPDATE_${name.toUpperCase()}`, value });
    }

    return (
        <div className='edit-entry-form-container'>
            {hasError && <ErrorMessage message={message} />}
            <div className="date-and-cancel-div">
                <span className='edit-entry-form-date-display'>{state.date}</span>
                <Link to='/entries' className='edit-entry-form-cancel-icon'>
                    <i className="fas fa-times"></i>
                </Link>
            </div>
            <form className='edit-entry-form' onSubmit={handleSubmit}>
                <EditFormInput
                    type='number'
                    name='systolic'
                    value={state.systolic}
                    onChange={handleChange}
                    label='systolic'
                    required
                />
                <EditFormInput
                    type='number'
                    name='diastolic'
                    value={state.diastolic}
                    onChange={handleChange}
                    label='diastolic'
                    required
                />
                <EditFormInput
                    type='number'
                    name='pulse'
                    value={state.pulse}
                    onChange={handleChange}
                    label='pulse'
                    required
                />
                <EditFormInput
                    type='number'
                    name='weight'
                    value={state.weight}
                    onChange={handleChange}
                    label='weight'
                    required
                />
                <textarea
                    className='edit-entry-form-textarea'
                    name='notes'
                    value={state.notes}
                    placeholder='Enter notes here...'
                    onChange={handleChange}
                    rows='2'
                >
                </textarea>
                <div className='edit-entry-form-buttons-container'>
                    <Button
                        outline color="danger"
                        className='edit-entry-form-delete-button'
                        onClick={handleDelete}
                    > DELETE ENTRY </Button>
                    <CustomButton type='submit'> SAVE CHANGES </CustomButton>
                </div>
            </form>

        </div>
    )
}

export default EditEntryForm;