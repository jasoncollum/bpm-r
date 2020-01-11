import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../contexts/current-user.context';

import './header.styles.scss';

const Header = ({ signUserOut }) => {
    const currentUser = useContext(CurrentUserContext);

    return (
        <div className='header'>
            <div className='options'>
                <Link className='option' to='/'>
                    <span className='far fa-heart heart-outline'></span>
                </Link>
                <Link className='option' to='/entries'>ENTRIES</Link>
                <Link className='option' to='/entries'>7 DAYS</Link>
                <Link className='option' to='/entries'>30 DAYS</Link>
                <Link className='option' to='/months'>12 MONTHS</Link>
                {currentUser ? (
                    <div className='option' onClick={() => {
                        console.log("ADD A NEW ENTRY");
                    }}>
                        <span className='fas fa-plus' ></span>
                    </div>
                ) : (
                        <Link className='option' to='/signin'>SIGN IN</Link>
                    )
                }
            </div>
        </div>
    )
};

export default Header;