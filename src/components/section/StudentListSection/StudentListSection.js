import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';


function openNewTab(url) {
	const win = window.open(url, '_blank');
	win.focus();
}

const StudentListSection = ({ data }) => (
	<div>
		<Card title='搜索结果如下' style={{width: '90%', marginLeft: '5%', marginTop: '20px', backgroundColor: '#ECECEC'}}>
			{
				data.map((result) => <Card key={Math.random()} title={result.name} bordered={false} style={{ width: '45%', float: 'left', marginRight: '5%', marginBottom: 20 }} extra={<a onClick={() => openNewTab(`http://localhost:8888/detail/student/${result.s_id}`)}>学生主页</a>}>
				<p>姓名：{result.name}</p>
				<p>性别：{result.sex === 0 ? '男':'女'}</p>
				<p>学号：{result.s_id}</p>
				<p>学院：{result.department}</p>
				<p>专业：{result.profession}</p>
				<p>班级：{result._class}</p>
			</Card>)
			}
		</Card>
	</div>
)

StudentListSection.propTypes = {
	data: PropTypes.array.isRequired
}

export default StudentListSection;