import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const initialState = {
    email: '',
    password: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_EMAIL":
            return { ...state, email: action.value };

        case "UPDATE_PASSWORD":
            return { ...state, password: action.value };

        default:
            return state;
    }
}

const SignIn = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(state.email, state.password);
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;

        dispatch({ type: `UPDATE_${name.toUpperCase()}`, value });
    }

    return (
        <div className='sign-in'>
            <span>Log in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    value={state.email}
                    handleChange={handleChange}
                    label="email"
                    required />
                <FormInput
                    name="password"
                    type="password"
                    value={state.password}
                    handleChange={handleChange}
                    label="password"
                    required />
                <div className='button'>
                    <CustomButton type="submit">Sign In</CustomButton>
                </div>
                <Link to='/signup'><span className='sign-up-message'>Sign up for an account</span></Link>
            </form>
        </div>
    )
}

export default SignIn;