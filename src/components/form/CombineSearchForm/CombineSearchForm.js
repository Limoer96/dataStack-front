import React, { Component } from 'react';
import { Card, Input, Select, Collapse, Slider, Radio, DatePicker, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';
import api from '../../../api';
import style from './style.css';

const Search = Input.Search;
const Option = Select.Option;
const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const typeOptions = [
	{ label: '实验预约', value: 1 },
	{ label: '实验学习', value: 2 },
	{ label: '成果提交', value: 3 }
]

export default class CombineSearchForm extends Component {
	state = {
		duration: '2',
		startWeek: 1,
		endWeek: 8,
		isEnd: false,
		behaviorsDate: '',
		type: [1, 2, 3]

	}
	handleSearch = (value) => {
		api.experiments.searchByTitle(value).then((json) => {
			this.props.saveSearchData(json.global.data);
		})
	}
	handleResetMultConditions = () => {
		this.setState({
			duration: 2,
			startWeek: 1,
			endWeek: 8,
			isEnd: false
		})
	}
	handleResetBehaviorConditions = () => {
		this.setState({
			type: [1, 2, 3]
		})
	}
	handleSearchWithMultConditions = () => {
		const { duration, startWeek, endWeek, isEnd } = this.state;
		api.experiments.multSearch({duration, startWeek, endWeek, isEnd}).then((json) => {
			this.props.saveExperimentsData(json.global.data);
		})

	}
	handleBehaviorSearch = () => {
		const { type, behaviorsDate } = this.state;
		const typeString = type.join('-');
		api.behaviors.multSearch({typeString, date: behaviorsDate}).then((json) => {
			this.props.saveBehaviorsData(json.global.data);
		})
	}
	changeDate = (date, dateString) => {
		this.setState({ behaviorsDate: dateString })
	}
	changeDuration = (value) => {
		this.setState({ duration: value })
	}
	changeWeeks = (value) => {
		this.setState({
			startWeek: value[0],
			endWeek: value[1]
		})
	}
	changeOptionEnd = (e) => {
		this.setState({ isEnd: e.target.value });
	}
	changeType = (value) => {
		this.setState({ type: value })
	}
	render() {
		const { duration, startWeek, endWeek, isEnd, type, behaviorsDate } = this.state;
		return (
			<div>
				<Card title='搜索实验' style={{width: '90%', marginLeft: '5%', marginTop: 20}}>
					<Collapse bordered={false} defaultActiveKey={['1']}>
						<Panel header='模糊查询' key='1'>
							<div className={style.experimentWrapper}>
								<Search 
									placeholder='输入实验名，可模糊匹配'
									enterButton
									onSearch={this.handleSearch}
								/>
							</div>
						</Panel>
						<Panel header='多条件查询' key='2'>
							<div className={style.multSearchContainer}>
								<p>选择单次课时</p>
								<Select value={duration} style={{width: '50%'}} onChange={this.changeDuration}> 
									<Option value={1}>1课时</Option>
									<Option value={2}>2课时</Option>
									<Option value={3}>3课时</Option>
									<Option value={4}>4课时</Option>
									<Option value={5}>5课时</Option>
									<Option value={6}>6课时</Option>
								</Select>
							</div>
							<div className={style.multSearchContainer}>
								<p>选择上课周次</p>
								<Slider 
									range
									value={[startWeek, endWeek]}
									min={1}
									max={18}
									onChange={this.changeWeeks}
								/>
							</div>
							<div className={style.multSearchContainer}>
								<p>选择是否结课</p>
								<RadioGroup value={isEnd} onChange={this.changeOptionEnd}>
									<Radio value={true}>是</Radio>
									<Radio value={false}>否</Radio>
								</RadioGroup>
							</div>
							<div className={style.btnContainer}>
								<Button onClick={this.handleSearchWithMultConditions} type='primary' style={{width: '30%', marginRight: '10%'}}>搜索</Button>
								<Button onClick={this.handleResetMultConditions} style={{width: '30%'}}>重设</Button>
							</div>
						</Panel>	
					</Collapse>
				</Card>
				<Card title='搜索行为' style={{marginLeft: '5%', width: '90%', marginTop: 20}}>
					<div className={style.multSearchContainer}>
						<p>选择日期</p>
						<DatePicker style={{width: '50%'}} vaule={behaviorsDate} onChange={this.changeDate}/>
					</div>
					<div className={style.multSearchContainer}>
						<p>选择学习行为类型</p>
						<CheckboxGroup options={typeOptions} value={type} onChange={this.changeType} />
					</div>
					<div className={style.btnContainer}>
						<Button onClick={this.handleBehaviorSearch} type='primary' style={{width: '30%', marginRight: '10%'}}>搜索</Button>
						<Button onClick={this.handleResetBehaviorConditions} style={{width: '30%'}}>重设</Button>
					</div>
				</Card>
			</div>
		);
	}
}

CombineSearchForm.propTypes = {
	saveSearchData: PropTypes.func.isRequired,
	saveExperimentsData: PropTypes.func.isRequired,
	saveBehaviorsData: PropTypes.func.isRequired
}



