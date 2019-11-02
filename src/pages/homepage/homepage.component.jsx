import React from 'react';

import Branding from '../../components/branding/branding.component';

import './homepage.styles.scss';

const HomePage = () => (
    <div className='homepage'>
        <Branding />
        <p className='tag-line'>monitor your blood pressure</p>
    </div>
);

export default HomePage;