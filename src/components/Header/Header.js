import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../static/images/headerbg.jpg';
import style from './style.css';

const Header = ({ isLogin }) => (
	<div>
		<img src={img} alt='logo' className={style.header} />
		<p className={style.message}>(数据平台)</p>
		{
			isLogin ? <span className={style.user}>欢迎你！{ localStorage.getItem('userName') }</span> : <span className={style.user}>请先<Link to='/login'>登录</Link></span>
		}
	</div>
)

export default Header;