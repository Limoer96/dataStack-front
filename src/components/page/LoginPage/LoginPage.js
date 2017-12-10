import React from 'react';
import LoginForm from '../../form/LoginForm/LoginForm';
import style from './style.css';

const LoginPage = ({ changeLoginState, history }) => (
	<div className={style.pageWrapper}>
		<p className={style.title}>请登录/登出</p>
		<LoginForm changeLoginState={changeLoginState} history={history}/>
	</div>
)
export default LoginPage;