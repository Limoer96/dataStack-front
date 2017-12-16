import React, { Component } from 'react';
import { Alert, Table, Card } from 'antd';
import staticMaps from '../../../static/map';
import { genExpeimentData } from '../../../util/formatDataForShowTable';
import api from '../../../api';
import style from './style.css';

function openNewTab(url) {
	const win = window.open(url, '_blank');
	win.focus();
}
const columns = [
	{
		title: '编号',
		dataIndex: 'e_id',
		key: 'e_id',
		render: (text) => <a onClick={() => openNewTab(`http://localhost:8888/detail/experiments/${text}`)}>{text}</a>
	},
	{
		title: '标题',
		dataIndex: 'title',
		key: 'title'
	},
	{
		title: '上课地点',
		dataIndex: 'place',
		key: 'place'
	},
	{
		title: '上课时间',
		dataIndex: 'time',
		key: 'time'
	},
	{
		title: '课容量',
		dataIndex: 'capacity',
		key: 'capacity'
	},
	{
		title: '结束',
		dataIndex: 'is_end',
		key: 'is_end',
		render: text => text ? <span>是</span> : <span>否</span>
	}
];

class ExperimentPage extends Component {
	state = {
		data: '',
		error: ''
	}
	componentDidMount() {
		const { id } = this.props.match.params;
		api.data.getExperimentsByPlaceId(id).then(json => genExpeimentData(json.global.data)).then((data) => {
			this.setState({
				data
			})
		}).catch((err) => {
			this.setState({
				error: err.response.data.global.error
			})
		})
	}
	render() {
		const { data, error } = this.state;
		const id = Number(this.props.match.params.id) - 1;
		return (
			<div className={style.container}>
				<h1 className={style.title}>{staticMaps.experiments[id]}</h1>
				<Card style={{padding: 0}} title='实验一览'>{data && <Table dataSource={data} columns={columns} />}</Card>
				{error && <Alert type='error' message={error} />}
			</div>
		)
	}
}

export default ExperimentPage;