import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

function openNewTab(url) {
	const win = window.open(url, '_blank');
	win.focus();
}

const ExperimentListSection = ({data, title}) => (
	<div>
		<Card title={title} style={{width: '90%', marginLeft: '5%', marginTop: '20px', backgroundColor: '#ECECEC'}}>
			{
				data.map((item) => <Card 
					key={Math.random()} 
					title={item.title} 
					bordered={false} 
					style={{ width: '45%', float: 'left', marginRight: '5%', marginBottom: 20 }} 
					extra={<a onClick={() => openNewTab(`http://localhost:8888/detail/student/${item.e_id}`)}>学生主页</a>}>
					<p>实验名：{item.title}</p>
					<p>编号：{item.e_id}</p>
					<p>专业：{item.profession}</p>
					<p>地点：{item.place}</p>
					<p>是否结课：{item.is_end ? '是': '否'}</p>
				</Card>)
			}
		</Card>
	</div>
)

ExperimentListSection.propTypes = {
	data: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired
}

export default ExperimentListSection;