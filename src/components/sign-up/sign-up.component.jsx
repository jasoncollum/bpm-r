import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_DISPLAYNAME":
            return { ...state, displayName: action.value };

        case "UPDATE_EMAIL":
            return { ...state, email: action.value };

        case "UPDATE_PASSWORD":
            return { ...state, password: action.value };

        case "UPDATE_CONFIRMPASSWORD":
            return { ...state, confirmPassword: action.value };

        default:
            return state;
    }
}

const SignUp = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    const { displayName } = state;

    const handleSubmit = async e => {
        e.preventDefault();
        if (state.password !== state.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                state.email,
                state.password
            );

            await createUserProfileDocument(user, { displayName });
            history.push('/');

        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        console.log("DISPLAY_NAME::", displayName)
        dispatch({ type: `UPDATE_${name.toUpperCase()}`, value });
    }

    return (
        <div className='sign-up'>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={state.displayName}
                    onChange={handleChange}
                    label='display name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={state.email}
                    onChange={handleChange}
                    label='email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={state.password}
                    onChange={handleChange}
                    label='password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={state.confirmPassword}
                    onChange={handleChange}
                    label='confirm password'
                    required
                />
                <CustomButton type='submit'> SIGN UP </CustomButton>
                <Link to='/signin'><p className='login-message'>
                    Already have an account?  Sign In
                    </p></Link>
            </form>

        </div>
    )
}

export default SignUp;