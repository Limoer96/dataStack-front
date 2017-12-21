import React from 'react';
import { Card, Collapse, Alert, Table, List } from 'antd';
import { genExpeimentFilterByThreeCondition, getExperimentsId, genBehaviorsDataFilterWidthEId } from '../../../util/formatDataForShowTable';
import api from '../../../api';

const Panel = Collapse.Panel;
function openNewTab(url) {
	const win = window.open(url, '_blank');
	win.focus();
}
const colunms = [
	{
		title: '编号',
		dataIndex: 'e_id',
		key: 'e_id',
		render: (text) => <a onClick={() => openNewTab(`http://localhost:8888/detail/experiments/${text}`)}>{text}</a>
	},
	{
		title: '实验名',
		dataIndex: 'title',
		key: 'title'
	},
	{
		title: '上机地点',
		dataIndex: 'place',
		key: 'place'
	},
	{
		title: '上机时间',
		dataIndex: 'time',
		key: 'time'
	},
	{
		title: '结束周',
		dataIndex: 'end_week',
		key: 'end_week',
		render: (text) => <span>第{text}周</span>
	}
];
class FilterByDayDetailPage extends React.Component {
	state = {
		data: [],
		behaviors: []
	}
	componentDidMount() {
		const { day } = this.props.match.params;
		const weekDay = new Date().getDay();
		if(day<weekDay) {
			const experimentPromise = api.day.getExperimentsFilterByDay(day);
			const behaviorPromise = api.day.getBehaviorsNow();
			Promise.all([experimentPromise, behaviorPromise]).then(([json1, json2]) => {
				this.setState({
					data: json1.global.data,
					behaviors: json2.global.data
				})
				console.log(getExperimentsId(json1.global.data));
			})
		}
	}
	render() {
		const weekDay = new Date().getDay();
		const { day } = this.props.match.params;
		const { data, behaviors } = this.state;
		const { run, end, endThisWeek } = genExpeimentFilterByThreeCondition(data);
		return (
			<div>
				{
					day <= weekDay ? <div>
						<Card title={`周${day}实验统计`} style={{width: '90%', marginLeft: '5%', marginTop: '20px'}}>
							{
								data && data.length > 0 ? <Collapse defaultActiveKey={['1']}>
									<Panel header='正在进行' key='1'>
										{
											run.length > 0 ? <Table dataSource={run} columns={colunms}/> : <Alert type='warning' message='当前无数据' />
										}
									</Panel>
									<Panel header='本周结束' key='2'>
										{
											end.length > 0 ? <Table dataSource={end} columns={colunms}/> : <Alert type='warning' message='当前无数据' />
										}
									</Panel>
									<Panel header='已结束' key='3'>
										{
											endThisWeek.length > 0 ? <Table dataSource={endThisWeek} columns={colunms}/> : <Alert type='warning' message='当前无数据' />
										}
									</Panel>
								</Collapse> : <Alert type='info' message='当前暂无实验' />
							}
						</Card>
						<Card style={{width: '90%', marginLeft: '5%', marginTop: '20px'}} title='当前学习行为列表'>
							{
								behaviors.length > 0 && <List bordered
      						dataSource={genBehaviorsDataFilterWidthEId(behaviors, getExperimentsId(data))}
      						renderItem={item => (<List.Item>{item}</List.Item>)}/>
							}
						</Card>
					</div> : <Card title={`周${day}实验统计`} style={{width: '90%', marginLeft: '5%', marginTop: '20px'}}><Alert type='info' message='无法访问未到日期'/></Card>
				}
			</div>
		)
	}
}

export default FilterByDayDetailPage;