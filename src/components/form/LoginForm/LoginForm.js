import React, { Component } from 'react';
import { Input, Icon, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';
import setTokenHeader from '../../../util/setTokenHeader';
import api from '../../../api';
import style from './style.css';

class LoginForm extends Component {
	state = {
		userName: '',
		password: '',
		error: {},
		loading: false,
		hasLogin: false
	}
	handleChange = (e) => {
		this.setState({
			error: {},
			[e.target.name]: e.target.value
		})
	}
	clearInput = (e) => {
		const { id, name } = e.target.dataset;
		this[id].focus();
		this.setState({
			[name]: ''
		})
	}
	checkValidate = () => {
		const { userName, password } = this.state;
		const errors = {};
		if(userName === '') {
			errors.userName = '用户名不为空'
		}
		if(password === '') {
			errors.password = '密码不为空'
		}
		this.setState({
			error: errors
		})
		if(Object.keys(errors).length === 0) {
			return true
		}
		return false;
	}
	login = () => {
		const { userName, password } = this.state;
		if(this.checkValidate()){
			this.setState({
				loading: true
			})
			localStorage.clear(); // 先清除token
			setTokenHeader(); // 清除请求头携带的token
			api.user.auth({userName, password}).then((json) => {
				const { token } = json.global.data;
				localStorage.setItem('token', token);
				localStorage.setItem('userName', userName);
				this.setState({loading: false, hasLogin: true})
				setTokenHeader(token);
				this.props.changeLoginState();
			}).catch((err) => {
				this.setState({
					error: { authError: err.response.data.global.error},
					loading: false
				})
			})
		}
	}
	logout = () => {
		localStorage.clear();
		this.props.history.push('/');
		document.location.reload(); // 再刷新页面, 有缓存的情况下
	}
	reset = () => {
		this.setState({
			userName: '',
			password: ''
		})
		this.userNameInput.focus();
	}
	render() {
		const { userName, password, error, loading, hasLogin } = this.state;
		const userNameSuffix = userName ? <Icon type='close-circle' onClick={this.clearInput} data-name='userName' data-id='userNameInput'/> : null;
		const userPasswordSuffix = password ? <Icon type='close-circle' onClick={this.clearInput} data-name='password' data-id='userPasswordInput'/> : null;
		return (
			<div className={style.wrapper}>
				{
					!localStorage.getItem('token') &&  !hasLogin ? <div className={style.inputWrapper}>
						<Input 
							placeholder='管理员账户'
							perfix={<Icon type='user' style={{color: 'rgba(0, 0, 0, .25)'}}/>}
							suffix={userNameSuffix}
							value={userName}
							onChange={this.handleChange}
							name='userName'
							ref={(node) => this.userNameInput = node}
						/>
						<br />
						<br />
						<Input 
							type='password'
							placeholder='密码'
							perfix={<Icon type='password' style={{color: 'rgba(0, 0, 0, .25)'}}/>}
							suffix={userPasswordSuffix}
							value={password}
							onChange={this.handleChange}
							name='password'
							ref={(node) => this.userPasswordInput = node}
						/>
						<div className={style.btnWrapper}>
							<Button className={style.btn} loading={loading} type='primary' onClick={this.login}>登录</Button>
							<Button className={style.btn} onClick={this.reset}>重设</Button>
						</div>
					</div> : <div>
						<p style={{fontSize: 14}}>欢迎你{userName}！ 你现在可以<Link to='/dashbord'>转到数据平台</Link> or <a onClick={this.logout} >注销账户</a></p>
					</div>
				}	
				{
					Object.keys(error).length > 0 && <div className={style.errorWrapper}>
						<Alert 
							type='error'
							message={Object.values(error).join(' and ')} 
						/>
					</div>
				}
			</div>
		)
	}
} 

export default LoginForm;