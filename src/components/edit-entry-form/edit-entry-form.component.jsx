import React, { useReducer, useContext } from 'react';

import EditFormInput from '../edit-form-input/edit-form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { Button } from 'reactstrap';

import CurrentUserContext from '../../contexts/current-user.context';
import { firestore } from '../../firebase/firebase.utils';

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

const EditEntryForm = ({ entry, toggleModal, fetchEntries }) => {
    const currentUser = useContext(CurrentUserContext);
    const [state, dispatch] = useReducer(reducer, entry);

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
            toggleModal();
        } catch (error) {
            console.error('Error writing document...', error);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        try {
            const entryRef = await firestore.collection(`users/${currentUser.id}/entries`).doc(entry.id);

            await firestore.collection(`users/${currentUser.id}/entries`).doc(entryRef.id).delete();

            fetchEntries();
            toggleModal();
        } catch (error) {
            console.error('Error writing document...', error);
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        dispatch({ type: `UPDATE_${name.toUpperCase()}`, value });
    }
    return (
        <div className='edit-entry-form-container'>
            <p>{state.date}</p>
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