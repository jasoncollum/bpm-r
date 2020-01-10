import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

import CurrentUserContext from '../../contexts/current-user.context';

import Branding from '../../components/branding/branding.component';

import './homepage.styles.scss';

const HomePage = () => {
    const currentUser = useContext(CurrentUserContext)

    return (
        <div className='homepage'>
            <Branding />
            <p className='tag-line'>monitor your blood pressure</p>
            {currentUser ? (
                <>
                    <h3 className='homepage-greeting'>Hello, {currentUser.displayName}</h3>
                    <span className='homepage-option'
                        onClick={() => auth.signOut()}>
                        SIGN OUT
                    </span>
                </>
            ) : (
                    <Link className='homepage-option'>SIGN IN</Link>
                )
            }

        </div>
    )
};

export default HomePage;