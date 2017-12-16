import React, { Component } from 'react';
import { Alert, Card, Table, BackTop } from 'antd';
import { 
	Line, 
	Bar, 
	XAxis, 
	YAxis, 
	CartesianGrid, 
	Tooltip, 
	Legend, 
	ComposedChart,
	Radar,
	RadarChart, 
	PolarGrid,
  PolarAngleAxis, 
  PolarRadiusAxis
} from 'recharts';
import { genExperimentMenberData, genAttendance, genScore, getAverage } from '../../../util/formatDataForShowTable';
import api from '../../../api';
import style from './style.css';

function openNewTab(url) {
	const win = window.open(url, '_blank');
	win.focus();
}

class ExperimentDetailPage extends Component {
	state = {
		data: '',
		error: '',
		filteredInfo: null,
		sortedInfo: null
	}
	componentDidMount() {
		const { e_id } = this.props.match.params;
		api.data.getExperimentByEid(e_id).then((json) => {
			this.setState({
				data: json.global.data
			})
		}).catch((err) => {
			this.setState({
				error: err.response.data.global.error
			})
		})
	}
	handleChange = (pagination, filter, sorter) => {
		this.setState({
			filteredInfo: filter,
			sortedInfo: sorter
		})
	}
	clearFilters = () => {
		this.setState({
			filteredInfo: null
		})
	}
	clearAll = () => {
		this.setState({
			filteredInfo: null,
			sortedInfo: null
		})
	}
	setScoreSort = () => {
		this.setState({
			sortedInfo: {
				order: 'descend',
				columnKey: 'score'
			}
		})
	}
	render() {
		const { data, error } = this.state;
		let { filteredInfo, sortedInfo } = this.state;
		sortedInfo = sortedInfo || {};
		filteredInfo = filteredInfo || {};
		const columns = [{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
			filters: [
				{
					text: '李', value: '李'
				},
				{
					text: '莫', value: '莫'
				}
			],
			filteredValue: filteredInfo.name || null,
			onFilter: (value, record) => record.name.includes(value),
			sorter: (a, b) => a.name.length - b.name.length,
			sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
		},
		{
			title: '学号',
			dataIndex: 's_id',
			key: 's_id',
			render: (text) => <a onClick={() => openNewTab(`http://localhost:8888/detail/student/${text}`)}>{text}</a>
		}, {
			title: '成绩',
			dataIndex: 'score',
			key: 'score',
			sorter: (a, b) => a.score - b.score,
			sortOrder: sortedInfo.columnKey === 'score' && sortedInfo.order
		}] 
		return (
			<div className={style.container}>
				<h1 className={style.title}>{data.title}</h1>
				{
					data ? <div>
						<Card title='实验基本信息' style={{width: '90%', marginLeft: '5%', marginTop: '20px'}}>
							<p className={style.content}>实验名：<span>{data.title}</span></p>
							<p className={style.content}>编号：<span>{data.e_id}</span></p>
							<p className={style.content}>实验内容：<span>{data.content}</span></p>
							<p className={style.content}>上课专业/课程：<span>{data.profession}</span></p>
							<p className={style.content}>上课地点：<span>{data.place}</span></p>
							<p className={style.content}>上课时间：<span>{data.time}</span></p>
							<p className={style.content}>开始周：<span>第{data.start_week}周</span></p>
							<p className={style.content}>结束周：<span>第{data.end_week}周</span></p>
							<p className={style.content}>选课人数：<span>{data.menber.length}</span></p>
							<p className={style.content}>已结课：<span>{data.is_end ? '是': '否'}</span></p>
						</Card> 
						<Card title='课堂成员信息' style={{width: '90%', marginLeft: '5%', marginTop: '20px'}}>
							<Table columns={columns} dataSource={genExperimentMenberData(data.menber)} onChange={this.handleChange}/>
						</Card>
						<Card title='签到情况' style={{width: '90%', marginLeft: '5%', marginTop: '20px'}}>
							{
								data.attendance.length > 0 ? <div>
									<ComposedChart width={600} height={300} data={genAttendance(data.attendance, data.menber.length)}>
										<XAxis dataKey='name' />
										<YAxis />
										<CartesianGrid strokeDasharray='3 3' />
										<Tooltip />
										<Legend />
										<Bar dataKey='reach' background={{ fill: '#eee' }} fill='#8884d8' />
										<Bar dataKey='absence' fill='#82ca9d' />
										<Line type='monotone' dataKey='reach' stroke='#ff7300'/>
										<Line type='monotone' dataKey='absence' stroke='#7FFFAA'/>
									</ComposedChart>
									<div>
										<ul className={style.percentageContainer}>
											{
												genAttendance(data.attendance, data.menber.length).map((item) => <li key={Math.random()}>{item.name}: {item.percentage}</li>)
											}
											<li>平均到课率: {getAverage(genAttendance(data.attendance, data.menber.length))}</li>
										</ul>
									</div>
								</div> : <span>暂无签到情况</span>
							}	
						</Card>
						<Card title='成绩分布' style={{width: '90%', marginLeft: '5%', marginTop: '20px'}}>
							{
								data.is_end ? <RadarChart cx={300} cy={150} outerRadius={120} width={600} height={300} data={genScore(data.menber)}>
									<PolarGrid />
         					<PolarAngleAxis dataKey="degree" />
          				<PolarRadiusAxis/>
          				<Tooltip />
                  <Radar name="成绩分布" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
								</RadarChart> : <span>当前实验未结课，无法得到成绩</span>
							}
							{
								data.is_end && <ul className={style.scoreContainer}>
									{
										genScore(data.menber).map((item) => <li key={Math.random()}><span className={style.degree}>{item.degree}</span> : <span className={style.count}>{item.count}</span></li>)
									}
								</ul>
							}
						</Card>
					</div>: <span>loading...</span>
				}
				{error && <Alert type='error' message={error}/>}
				<BackTop />
			</div>
		)
	}
}

export default ExperimentDetailPage;