import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import BpmContext from '../../contexts/bpm.context';

import Branding from '../../components/branding/branding.component';

import './homepage.styles.scss';

const HomePage = ({ signUserOut }) => {
    const currentUser = useContext(BpmContext)

    return (
        <div className='homepage'>
            <Branding />
            <p className='tag-line'>monitor your blood pressure</p>
            {currentUser ? (
                <>
                    <h3 className='homepage-greeting'>Hello, {currentUser.displayName}</h3>
                    <span className='homepage-option'
                        onClick={() => signUserOut()}>
                        SIGN OUT
                    </span>
                </>
            ) : (
                    <Link className='homepage-option' to='/signin'>
                        SIGN IN
                        </Link>
                )
            }

        </div>
    )
};

export default HomePage;