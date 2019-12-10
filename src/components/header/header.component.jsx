import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './header.styles.scss';

const Header = ({ currentUser }) => (
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
                <div className='option' onClick={() => auth.signOut()}>
                    <span className='fas fa-plus'></span>
                </div>
            ) : (
                    <Link className='option' to='/signin'>SIGN IN</Link>
                )
            }
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);