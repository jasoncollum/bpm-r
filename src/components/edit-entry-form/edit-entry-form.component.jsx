import React, { useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import CurrentUserContext from '../../contexts/current-user.context';
import { firestore } from '../../firebase/firebase.utils';

import './edit-entry-form.styles.scss';

// const initialState = {
//     id: '',
//     date: '',
//     systolic: '',
//     diastolic: '',
//     pulse: '',
//     weight: '',
//     notes: ''
// };

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
    // const initialState = {
    //     id: entry.id,
    //     date: '',
    //     systolic: '',
    //     diastolic: '',
    //     pulse: '',
    //     weight: '',
    //     notes: entry.notes
    // };
    const currentUser = useContext(CurrentUserContext)
    const [state, dispatch] = useReducer(reducer, entry);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("EDIT ENTRY FORM SUBMIT BUTTON CLICKED")
        // try {
        //     const entryRef = await firestore.collection(`users/${currentUser.id}/entries`).doc();

        //     await firestore.collection(`users/${currentUser.id}/entries`)
        //         .add({
        //             ...state,
        //             date,
        //             id: entryRef.id
        //         })
        //     history.push('/entries');
        // } catch (error) {
        //     console.error('Error writing document...', error);
        // }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        dispatch({ type: `UPDATE_${name.toUpperCase()}`, value })
    }
    return (
        <div className='edit-entry-form'>
            <p>{state.date}</p>
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
                <CustomButton type='submit'> SAVE CHANGES </CustomButton>
            </form>

        </div>
    )
}

export default EditEntryForm;