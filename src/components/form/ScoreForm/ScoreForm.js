import React, { Component } from 'react';
import { Input, Card, Select, InputNumber, Button, Alert } from 'antd';
import PropTypes from 'prop-types';
import api from '../../../api';
import style from './style.css';

const InputGroup = Input.Group;
const Option = Select.Option;
export default class ScoreForm extends Component {
	state = {
		sId: 0,
		eId: 0,
		stuTime: 0,
		totalTime: 0,
		everyTime: 0,
		totalDuration: 0,
		publishCondition: 0,
		error: ''
	}
	changeBaseInfo = (e) => {
		console.log('name:', e.target.name, 'value:', e.target.value);
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	changeConditions = (value) => {
		console.log('value', value);
		this.setState({
			publishCondition: value
		})
	}
	changeNumberConditions = (value) => {
		this.setState({
			publishCondition: value
		})
	}
	reset = () => {
		this.setState({
			sId: 0,
			eId: 0,
			stuTime: 0,
			totalTime: 0,
			everyTime: 0,
			totalDuration: 0,
			publishCondition: 0
		})
	}
	componentDidMount() {
		console.log(this.props.name);
	}
	score = (e) => {
		e.preventDefault();
		const { sId, eId, stuTime, totalTime, everyTime, totalDuration, publishCondition } = this.state; 
		const attendance = (stuTime/totalTime).toFixed(2);
		const timeRate = (everyTime/totalDuration).toFixed(2);
		api.dm.getScore({sId, eId, attendance, timeRate, publishCondition}).then((json) => {
			this.props.saveLoadData(json.global.data, { sId, eId, attendance, timeRate, publishCondition});
		}).catch(() => {
			this.setState({
				error: '评分失败，请再次提交'
			})
		})
	}
	render() {
		const { sId, eId, stuTime, totalTime, everyTime, totalDuration, publishCondition, error } = this.state;
		return (
			<div>
				<Card style={{width: '90%', marginLeft: '5%', marginTop: 20}} title='辅助打分系统'>
				<div className={style.baseInfo}>
					<p>学号</p>
					<Input value={sId} type='text' onChange={this.changeBaseInfo} name='sId'/>
				</div>
				<div className={style.baseInfo}>
					<p>实验编号</p>
					<Input type='text' value={eId} onChange={this.changeBaseInfo} name='eId'/>
				</div>
				<div className={style.baseInfo}>
					<p>输入出勤次数</p>
					<InputGroup compact>
	          <Input style={{ width: '30%' }} addonBefore='出勤次数' value={stuTime} name='stuTime' onChange={this.changeBaseInfo}/>
	          <Input style={{ width: '30%' }} addonAfter='总上课次数' value={totalTime} name='totalTime' onChange={this.changeBaseInfo}/>
	        </InputGroup>
	      </div>  
	      <div className={style.baseInfo}>
	      	<p>输入学习时间</p>
	      	<InputGroup compact>
	          <Input style={{ width: '30%' }} addonBefore='总学习时间' value={everyTime} name='everyTime' onChange={this.changeBaseInfo}/>
	          <Input style={{ width: '30%' }} addonAfter='课时数' value={totalDuration} name='totalDuration' onChange={this.changeBaseInfo}/>
	        </InputGroup>
	      </div>
	      <div className={style.baseInfo}>
	      	<p>实验平均提交时间情况</p>
	      	<Select value={publishCondition} onChange={this.changeConditions} style={{ width: '30%' }} >
	      		<Option value={1}>延后一天</Option>
	      		<Option value={3}>延后三天</Option>
	      		<Option value={0}>按时提交</Option>
	      		<Option value={-1}>提前一天</Option>
	      		<Option value={7}>无提交或超出一星期提交</Option>
	      	</Select>
	      	其它情况：<InputNumber min={-3} max={7} defaultValue={0} onChange={this.changeNumberConditions}/><span className={style.warning}>请使用数字代表提前或者延后天数，负数表示提前</span>
	      </div>
	      <div className={style.baseInfo}>
	      	<Button className={style.btn} type='primary'onClick={this.score}>评分！</Button>
	      	<Button className={style.btn} onClick={this.reset}>重设</Button>
	      </div>
	      {
	      	error && <div className={style.baseInfo}>
	      		<Alert type='error' message={error}/>
	      	</div>
	      }
			</Card>	
			</div>
		);
	}
}
ScoreForm.propTypes = {
	saveLoadData: PropTypes.func.isRequired
}


