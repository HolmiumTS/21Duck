import React from 'react';

import Banner from '../../components/Banner'

import './Explore.css'

export interface BannerProps {
    className: string;
}

export default () => (
    <div className = 'banner'>
        <Banner className = 'switch-banner'/>
    </div>
);