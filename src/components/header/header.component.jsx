import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../contexts/current-user.context';

import './header.styles.scss';

const Header = () => {
    const currentUser = useContext(CurrentUserContext);
    return (
        <div className='header'>
            <div className='options'>
                <Link className='option' to='/'>
                    <span className='far fa-heart heart-outline'></span>
                </Link>
                <Link className='option' to='/entries'>ENTRIES</Link>
                <Link className='option'
                    to={{ pathname: '/days', state: { sevenDays: true } }}>7 DAYS</Link>
                <Link className='option'
                    to={{ pathname: '/days', state: { sevenDays: false } }}>30 DAYS</Link>
                {currentUser ? (
                    <Link className='option' to='/newentryform'>
                        <span className='fas fa-plus' ></span>
                    </Link>
                ) : (
                        <Link className='option' to='/signin'>SIGN IN</Link>
                    )
                }
            </div>
        </div >
    )
};

export default Header;