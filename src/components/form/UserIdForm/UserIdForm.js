import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete, Button, Icon, Alert } from 'antd';
import api from '../../../api';
import style from './style.css';

class UserIdForm extends Component {
	state = {
		dataSource: [],
		sId: '',
		error: '',
		loading: false
	}
	componentDidMount() {
		// 准备自动完成的数据
		api.student.getAllStudentId().then((json) => {
			this.setState({
				dataSource: json.global.data
			})
		}).catch((err) => {
			// 如果无法加载的话
			console.log('error happend,', err.response.data.global.error);
		})
	}
	handleSearch = (value) => {
		this.setState({
			sId: value
		})
	}
	checkValidate = () => {
		const { sId } = this.state;
		let error = '';
		if(sId.length !== 12) {
			error = '错误的学号，请重新输入'
			return false;
		}
		this.setState({
			error
		})
		return true;
	}
	searchStudent = (e) => {
		e.preventDefault();
		const { sId } = this.state;
		const { saveStudentInfo } = this.props;
		this.setState({
			loading: true
		})
		api.student.searchByStudentId({sId}).then((json) => {
			saveStudentInfo(json.global.data);
			this.setState({
				loading: false
			})
		}).catch(() => {
			this.setState({
				loading: false,
				error: '无法取得数据，请重试'
			})
		})
	}
	render() {
		const { dataSource, error, loading } = this.state;
		return (
			<div className={style.inputContainer}>
				<h1 className={style.title}>按学号查询</h1>
				<AutoComplete 
					dataSource={dataSource}
					style={{width: '60%'}}
					onSearch={this.handleSearch}
					placeholder='输入正确的学号继续'
				/>
				<Button 
					className={style.btn}
					type='primary'
					loading={loading}
					onClick={this.searchStudent}
				><Icon type='search'/></Button>
				<Alert type='error' message={error} />
			</div>
		)
	}
}

UserIdForm.propTypes = {
	saveStudentInfo: PropTypes.func.isRequired
}

export default UserIdForm;