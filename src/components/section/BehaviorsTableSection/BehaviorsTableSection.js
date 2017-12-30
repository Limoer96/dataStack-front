import React from 'react';
import { Table, Card } from 'antd';

function openNewTab(url) {
	const win = window.open(url, '_blank');
	win.focus();
}

const columns = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: '学号',
		dataIndex: 'sId',
		key: 'sId',
		render: (text) => <a onClick={() => openNewTab(`http://localhost:8888/detail/student/${text}`)}>{text}</a>
	},
	{
		title: '实验编号',
		dataIndex: 'eId',
		key: 'eId',
		render: (text) => <a onClick={() => openNewTab(`http://localhost:8888/detail/experiments/${text}`)}>{text}</a>
	},
	{
		title: '开始时间',
		dataIndex: 'startTime',
		key: 'startTime',
		render: (text) => <span>{new Date(text).toLocaleTimeString()}</span>
	},
	{
		title: '结束时间',
		dataIndex: 'endTime',
		key: 'endTime',
		render: (text) => <span>{new Date(text).toLocaleTimeString()}</span>
	}
];

const BehaviorsTableSection = ({data}) => (
	<div>
		<Card title='学习行为搜索结果' style={{width: '90%', marginLeft: '5%', marginTop: '20px', backgroundColor: '#ECECEC'}}>
			<Table dataSource={data} columns={columns}/>
		</Card>
	</div>
)

export default BehaviorsTableSection;