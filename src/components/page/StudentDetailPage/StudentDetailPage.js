import React from 'react';
import { Card, Collapse, Table, BackTop } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import api from '../../../api';
import style from './style.css';
import { genBehaviorsData, genBehaviorsDataCount } from '../../../util/formatDataForShowTable';

const Panel = Collapse.Panel;

function openNewTab(url) {
	const win = window.open(url, '_blank');
	win.focus();
}

const map = ['实验预约', '实验学习', '成果提交'];

const columns = [
	{
		title: '实验编号',
		dataIndex: 'e_id',
		key: 'e_id',
		render: (text) => <a onClick={() => openNewTab(`http://localhost:8888/detail/experiments/${text}`)}>{text}</a>
	},
	{
		title: '学习类别',
		dataIndex: 'operating_category',
		key: 'operating_category',
		render: (text) => <span>{map[text-1]}</span>,
	},
	{
		title: '开始时间',
		dataIndex: 'start_time',
		key: 'start_time',
		render: (text) => <span>{new Date(text).toLocaleDateString() + new Date(text).toLocaleTimeString()}</span>
	},
	{
		title: '结束时间',
		dataIndex: 'end_time',
		key: 'end_time',
		render: (text) => <span>{new Date(text).toLocaleDateString() + new Date(text).toLocaleTimeString()}</span>
	}
];

class StudentDetailPage extends React.Component {
	state = {
		info: '',
		behaviors: ''
	}
	componentDidMount() {
		const { s_id } = this.props.match.params;
		const baseInfoPromise = api.data.getStudentBySid(s_id);
		const behaviorInfoPromise = api.data.getBehaviorInfoBySid(s_id);
		Promise.all([baseInfoPromise, behaviorInfoPromise]).then(([json1, json2]) => {
			this.setState({
				info: json1.global.data,
				behaviors: json2.global.data
			})
			console.log('base', json1.global.data);
			console.log('bahaviors', json2.global.data);
		})
	}
	render() {
		const { info, behaviors } = this.state;
		const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
		return (
			<div>
				 <Card title={`学生${info.name}基本信息`} style={{width: '90%', marginLeft: '5%', marginTop: '20px'}}>
						<Collapse defaultActiveKey={['1']}  bordered={false}>
							<Panel header='基本信息' key='1'>
								<p className={style.content}>姓名：<span>{info.name}</span></p>
								<p className={style.content}>性别：<span>{info.sex === 0 ? '男': '女'}</span></p>
								<p className={style.content}>民族：<span>{info.ethnic}</span></p>
								<p className={style.content}>出生日期：<span>{new Date(info.date_of_birth).toLocaleDateString()}</span></p>
								<p className={style.content}>籍贯：<span>{info.native_place}</span></p>
							</Panel>
							<Panel header='学籍信息' key='2'>
								<p className={style.content}>学号：<span>{info.s_id}</span></p>
								<p className={style.content}>入学时间：<span>{new Date(info.date_of_admission).toLocaleDateString()}</span></p>
								<p className={style.content}>学生类别：<span>{info.category}</span></p>
								<p className={style.content}>学院：<span>{info.department}</span></p>
								<p className={style.content}>学科类型：<span>{info.discipline_categories}</span></p>
								<p className={style.content}>专业：<span>{info.profession}</span></p>
								<p className={style.content}>班级：<span>{info._class}</span></p>
								<p className={style.content}>语种：<span>{info.category}</span></p>
								<p className={style.content}>政治面貌：<span>{info.political_status}</span></p>
							</Panel>
							<Panel header='其它信息' key='3'>
								<p className={style.content}>联系电话：<span>{info.contact_number}</span></p>
								<p className={style.content}>通讯地址：<span>{info.address ? info.address : '暂无'}</span></p>
							</Panel>
						</Collapse>			 		
				 </Card>
				 {
				 	behaviors &&  <Card title='学习行为记录' style={{width: '90%', marginLeft: '5%', marginTop: '20px'}}>
				 		<Table dataSource={genBehaviorsData(behaviors.behaviors)} columns={columns}/>
				 	</Card>
				 }
				 {
				 	behaviors && <Card title='学习行为分类统计' style={{width: '90%', marginLeft: '5%', marginTop: '20px'}}>
				 		<AreaChart width={600} height={300} data={genBehaviorsDataCount(behaviors.behaviors)}
            	margin={{top: 10, right: 30, left: 0, bottom: 0}}>
			        <XAxis dataKey="name"/>
			        <YAxis/>
			        <CartesianGrid strokeDasharray="3 3"/>
			        <Tooltip/>
			        <Area type='monotone' dataKey='value' stroke='#8884d8' fill='#8884d8' />
			      </AreaChart>
			      <ul className={style.contentList}>
			      	{genBehaviorsDataCount(behaviors.behaviors).map((item) => <li>{item.name}: {item.value}次</li>)}
			      </ul>
				 	</Card>
				 }
				 <BackTop />
			</div>
		)
	}
}

export default StudentDetailPage;