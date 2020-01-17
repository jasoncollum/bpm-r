import React, { useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
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

const EditEntryForm = ({ entry }) => {
    const currentUser = useContext(CurrentUserContext);
    const [state, dispatch] = useReducer(reducer, entry);
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

            history.push('/entries');
        } catch (error) {
            console.error('Error writing document...', error);
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        dispatch({ type: `UPDATE_${name.toUpperCase()}`, value });
    }
    return (
        <div>
            <p>{state.date}</p>
            <form className='edit-entry-form' onSubmit={handleSubmit}>
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
                    className='edit-entry-form-textarea'
                    name='notes'
                    value={state.notes}
                    placeholder='Enter notes here...'
                    onChange={handleChange}
                    rows='2'
                >

                </textarea>
                <CustomButton type='submit'> SAVE CHANGES </CustomButton>
                <Button color="danger" onClick={() => console.log("DELETE BUTTON CLICKED")}>DELETE ENTRY</Button>
            </form>

        </div>
    )
}

export default EditEntryForm;