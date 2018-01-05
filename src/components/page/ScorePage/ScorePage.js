import React, { Component } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import ScoreForm from '../../form/ScoreForm/ScoreForm';
import style from './style.css'

export class ScorePage extends Component {
	state = {
		result: '',
		others: ''
	}
	saveLoadData = (result, others) => {
		this.setState({result, others})
	}
	computeAverage = (data) => {
		const length = data.length;
		const total = data.reduce((prev, curr) => prev + curr);
		return Math.round((total/length));
	}

	render() {
		const { result, others } = this.state;
		return (
			<div>
				<ScoreForm saveLoadData={this.saveLoadData} />
				{
					result && <Card title='评分结果' style={{width: '90%', marginTop: 20, marginLeft: '5%'}}>
						<p className={style.content1}>根据学号为<Link to={`/detail/student/${others.sId}`}>{others.sId}</Link>的同学在实验编号为
						<Link to={`/detail/experiments/${others.eId}`}>{others.eId}</Link>的实验中的学习行为情况</p>
						<p className={style.content1}>其中出勤率为：<span className={style.deg}>{others.attendance * 100}%</span></p>
						<p className={style.content1}>出勤时间比率为：<span className={style.deg}>{others.timeRate * 100}%</span></p>
						<p className={style.content1}>系统对此的评级为
						<span className={style.deg}>{result.deg}</span>，推荐打分<span className={style.deg}>{this.computeAverage(result.score)}</span>
						</p>
						<p className={style.content1}>对学生的历史成绩和其它同学的成绩分析，给出的打分情况为<span className={style.deg}>{others.score}</span></p>
					</Card>
				}
			</div>
		);
	}
}

export default ScorePage;