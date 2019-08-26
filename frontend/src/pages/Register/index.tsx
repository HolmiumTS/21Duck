import React from 'react';
import { withRouter } from 'react-router-dom';

import RegisterForm from '../../components/RegisterForm';
import SuccessInfo from '../../components/SuccessInfo';
import { useUser } from '../../hooks';

import { RouteComponentProps } from 'react-router-dom';

import './Register.css';


export default withRouter((props: RouteComponentProps) => {
    const user = useUser();

    const userRegisterSuccess = () => {
        setTimeout(() => props.history.push('/explore'), 3000);
        return <SuccessInfo user={user} prefix='注册成功' />;
    };

    return (
        <div className='register-root'>
            {user.identity === 0 ?
                <RegisterForm /> : userRegisterSuccess()}
        </div>
    );
});
