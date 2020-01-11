import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });

    const { email, password } = userCredentials;

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setUserCredentials({ email: '', password: '' });
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = e => {
        const { value, name } = e.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className='sign-in'>
            <span>Log in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    value={email}
                    handleChange={handleChange}
                    label="email"
                    required />
                <FormInput
                    name="password"
                    type="password"
                    value={password}
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