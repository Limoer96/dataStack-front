import React, { Component } from 'react';
import { Card, Progress } from 'antd';
import { 
	BarChart, 
	Bar, 
	XAxis, 
	YAxis, 
	CartesianGrid, 
	Tooltip, 
	Legend, 
	LineChart, 
	Line,
	Brush, 
	ReferenceLine,
} from 'recharts';
import api from '../../../api';
import getTotalBehaviorsCount from '../../../util/getTotalBehaviorsCount';
import formatExperimentData from '../../../util/formatExperimentData';
import formatUserData from '../../../util/formatUserData';
import formatBehaviorsData from '../../../util/formatBehaviorData';
import style from './style.css';

class DashbordPage extends Component {
	state = {
		experiments: '',
		users: [],
		behaviors: ''
	}
	componentDidMount() {
		const experimentPromise = api.data.getExperiments();
		const userPromise = api.data.getUsers();
		const behaviorPromise = api.data.getBehaviors();
		Promise.all([experimentPromise, userPromise, behaviorPromise]).then(([experiments, users, behaviors]) => {
			this.setState({
				experiments: experiments.global.data,
				users: users.global.data,
				behaviors: behaviors.global.data
			})
		})
	}
	render() {
		const { experiments, behaviors, users } = this.state;
		const behaviorsCount = getTotalBehaviorsCount(behaviors);
		const data = formatExperimentData(experiments);
		const userData = formatUserData(users);
		const behaviorData = formatBehaviorsData(behaviors);
		return (
			<div className={style.dashbordContainer}>
				<h1 className={style.title}>控制台数据总览</h1>
				<Card  title='数据综述' style={{width: '80%', marginLeft: '10%'}}>
					<Progress style={{marginRight: 10, marginLeft: 30}} type='circle' percent={experiments.length * 10} format={percent => `${percent/10}个`}/>
					<Progress style={{marginRight: 10}} type='circle' percent={users.length} format={percent => `${percent}人`}/>
					<Progress style={{marginRight: 10}} type='circle' percent={behaviors.length} format={percent => `${percent}个`}/>
					<Progress style={{marginRight: 10}} type='circle' percent={behaviorsCount} format={percent => `${percent}次`}/>
					<p className={style.description}>当前共开设了<span>{experiments.length}</span>个实验，包含<span>{users.length}</span>个注册学生用户，<span>{behaviors.length}</span>名学生参与到学习中，产生了<span>{behaviorsCount}</span>次学习行为。</p>
				</Card>
				<Card title='实验室开设实验统计' style={{width: '80%', marginLeft: '10%', marginTop: 20}}>
					<BarChart 
						width={600} 
						height={300} 
						data={data}
						margin={{top: 20, right: 30, left	:20, bottom: 5}}
					>
						<XAxis dataKey='name' />
						<YAxis />
						<CartesianGrid strokeDasharray="3 3" />
						<Tooltip/>
       			<Legend />
       			<Bar dataKey="underway" stackId="a" fill="#8884d8" />
       			<Bar dataKey="end" stackId="a" fill="#82ca9d" />
					</BarChart>
				</Card>
				<Card title='学生数按年级、性别统计' style={{width: '80%', marginLeft: '10%', marginTop: 20}}>
					<LineChart  
						width={600} 
						height={300} 
						data={userData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
           >
						<XAxis dataKey='year' />
						<YAxis />
						<CartesianGrid strokeDasharray="3 3"/>
       			<Tooltip/>
       			<Legend />
       			<Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{r: 5}}/>
       			<Line type="monotone" dataKey="male" stroke="#82ca9d" activeDot={{r: 5}}/>
       			<Line type="monotone" dataKey="female" stroke="#ffc658" activeDot={{r: 5}}/>
					</LineChart>
				</Card>
				<Card title='学习行为按年月统计' style={{width: '80%', marginLeft: '10%', marginTop: 20}}>
					<BarChart width={600} height={300} data={behaviorData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
						<XAxis dataKey="date"/>
		        <YAxis/>
		        <CartesianGrid strokeDasharray="3 3"/>
		        <Tooltip/>
		        <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
		        <ReferenceLine y={0} stroke='#000'/>
		        <Brush dataKey='name' height={30} stroke="#8884d8"/>
		        <Bar dataKey="count" fill="#8884d8" />
					</BarChart>
				</Card>
			</div>
		)
	}
}
export default DashbordPage;