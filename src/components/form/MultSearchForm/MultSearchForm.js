import React, { Component } from 'react';
import { Select, Radio, Button } from 'antd';
import PropTypes from 'prop-types';
import api from '../../../api';
import style from './style.css';

const { Option, OptGroup } = Select;
const RadioGroup = Radio.Group;
class MultSearchForm extends Component {
	
	state = {
		profession: '',
		grade: '',
		sex: 0,
		loading: false
	}

	changeProfession = (value) => {
		this.setState({
			profession: value
		})
	}
	changeGrade = (value) => {
		this.setState({
			grade: value
		})
	}
	changeSex = (e) => {
		this.setState({
			sex: e.target.value
		})
	}
	reset = () => {
		this.setState({
			profession: '',
			grade: '',
			sex: 0
		})
	}
	search = (e) => {
		e.preventDefault();
		this.setState({
			loading: true
		})
		const { profession, grade, sex } = this.state;
		api.student.multSearch({profession, grade, sex}).then((json) => {
			this.setState({
				loading: false
			})
			this.props.saveData(json.global.data);
		}).catch(() => {
			this.setState({
				loading: false
			})
		})
	}
	render() {
		const { loading } = this.state;
		return (
			<div className={style.container}>
				<div className={style.item}>
					<p>选择学院专业</p>
					<Select 
						style={{width: '80%'}}
						defaultValue='哲学'
						onChange={this.changeProfession}
					>
						<OptGroup label='哲学与社会发展学院'>
							<Option value='哲学'>哲学</Option>
							<Option value='宗教学'>宗教学</Option>
							<Option value='社会学'>社会学</Option>
							<Option value='人类学'>人类学</Option>
						</OptGroup>
						<OptGroup label='经济学院'>
							<Option value='经济'>经济</Option>
							<Option value='经管'>经管</Option>
							<Option value='国际经济与贸易'>国际经济与贸易</Option>
						</OptGroup>	
						<OptGroup label='文学学院'>
							<Option value='文学'>文学</Option>
							<Option value='中国语言文学'>中国语言文学</Option>
						</OptGroup>
						<OptGroup label='历史文化学院'>
							<Option value='中国古代史'>中国古代史</Option>
						</OptGroup>
						<OptGroup label='数学院'>
							<Option value='应用数学'>应用数学</Option>
						</OptGroup>
						<OptGroup label='物理学院'>
							<Option value='基础物理'>基础物理</Option>
						</OptGroup>
						<OptGroup label='软件学院'>
							<Option value='软件工程'>软件工程</Option>
						</OptGroup>
					</Select>
				</div>
				<div className={style.item}>
					<p>选择性别</p>
					<RadioGroup onChange={this.changeSex} value={this.state.sex}>
		        <Radio value={0}>男</Radio>
		        <Radio value={1}>女</Radio>
		      </RadioGroup>
				</div>
				<div className={style.item}>
					<p>选择年级</p>
					<Select
						style={{width: '80%'}}
						defaultValue='2014'
						onChange={this.changeGrade}
					>
						<Option value='2009'>2009</Option>
						<Option value='2010'>2010</Option>
						<Option value='2011'>2011</Option>
						<Option value='2012'>2012</Option>
						<Option value='2013'>2013</Option>
						<Option value='2014'>2014</Option>
						<Option value='2015'>2015</Option>
						<Option value='2016'>2016</Option>
						<Option value='2017'>2017</Option>
					</Select>
				</div>
				<div className={style.btnGroup}>
					<Button loading={loading} className={style.btn} onClick={this.search} type='primary'>搜索</Button>
					<Button className={style.btn} onClick={this.reset}>重设</Button>
				</div>
			</div>
		)
	}
}

MultSearchForm.propTypes = {
	saveData: PropTypes.func.isRequired
}

export default MultSearchForm;