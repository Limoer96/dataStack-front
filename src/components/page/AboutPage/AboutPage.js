import React, { Component } from 'react';
import { Card, Icon, Collapse, Input, Button, message, Alert, BackTop } from 'antd';
import { Link } from 'react-router-dom';
import api from '../../../api';
import style from './style.css';

const Panel = Collapse.Panel;
const { TextArea } = Input;
class AboutPage extends Component {
	state = {
		email: '',
		content: '',
		error: {}
	}
	updateEmail = (e) => {
		this.setState({ email: e.target.value })
	}
	updateContent = (e) => {
		this.setState({ content: e.target.value })
	}
	checkValidate = () => {
		const { email, content } = this.state;
		const error = {};
		if(email === '') {
			error.noEmail = '你还没输入E-mail呢~'
		}
		if(content === '') {
			error.noContent = '请至少输入一个字符用于反馈哦~'
		}
		this.setState({error});
		if(Object.keys(error).length === 0) {
			return true;
		}
		return false;
	}
	sendFeedback = () => {
		const { email, content } = this.state;
		if(this.checkValidate()) {
			api.feedback.addFeedback({email, content}).then(() => {
				message.success('谢谢你，反馈成功！');
			}).catch(() => {
				message.error('反馈失败，请重试！');
			})
		}
	}
	addStar = () => {
		api.feedback.addStar().then((json) => {
			message.success(`点赞成功，您是第${json.global.data.count}个哦~`);
		}).catch(() => {
			message.error('点赞不成功，请重试！');
		})
	}
	render() {
		const { email, content, error } = this.state;
		return (
			<div>
				<Card title='关于“关于...”' style={{width: '90%', marginLeft: '5%', marginTop: 20}}>
					<div>
						<p className={style.title1}>也许你想知道的</p>
						<p className={style.content1}>当前数据平台并没有对所有用户开放，
							如果你恰好有兴趣点开了本页面，那么我告诉你，其实这是完全开源的，请点击
							<a href='https://github.com/xiaomoer/dataStack-front'>这里</a>
							查看项目源码。
						</p>
						<p className={style.content1}>如果你只是想了解这个实验平台，那么当你点进这个平台的时候已经看到了，还可以点击<Link to='/'>这里</Link>回看哦！</p>
						<p className={style.content1}>如果你想了解更多的技术细节，那么请花一点时间，往<Icon type="arrow-down" />看!</p>
					</div>
				</Card>
				<Card title='技术栈'style={{width: '90%', marginLeft: '5%', marginTop: 20}}>
					<Collapse bordered={false} defaultActiveKey={['1', '2']}>
						<Panel header='前端' key='1'>
							<div>
								<p className={style.title1}>1. React</p>
								<p className={style.content1}>没什么好说的~嗯，的确没什么好说的。
								还是说一句吧：“A JavaScript library for building user interfaces” <span role='img' aria-label='smale'>😂</span></p>
							</div>
							<div>
								<p className={style.title1}>2. Antd</p>
								<p className={style.content1}>来自蚂蚁金服的基于React的开源组件库，使用简单，节时省力。在开发初期想过自己写样式或者使用semantic-ui react， 不过自己还是放弃了...</p>
							</div>
							<div>
								<p className={style.title1}>3. 其它</p>
								<p className={style.content1}>3.1 axios：比Fetch更好用的异步请求库</p>
								<p className={style.content1}>3.2 webpack：基本是最好的前端模块化解决方案</p>
								<p className={style.content1}>3.3 babel：请搭配ES6食用 </p>
							</div>
						</Panel>
						<Panel header='服务端' key='2'>
							<div>
								<p className={style.title1}>1. Express</p>
								<p className={style.content1}>和Koa比起啦我还是习惯使用的非常便捷的Node服务端框架</p>
							</div>
							<div>
								<p className={style.title1}>2. MongoDB</p>
								<p className={style.content1}>暂且把它归为服务端，其实这是一个非关系型数据库，使用非常便捷，推荐同时使用MongoDB Compass。虽然Redis也是很好的了...</p>
							</div>
							<div>
								<p className={style.title1}>3. Mongoose</p>
								<p className={style.content1}>MongoDB的ODM工具。</p>
							</div>
							<div>
								<p>4. jsonwebtoken</p>
								<p>5. 也许可以让你的API服务器变得有那么一点安全？？！</p>
							</div>
						</Panel>
						<Panel header='其它' key='3'>
							<div>
								<p className={style.title1}>1. eslint</p>
								<p className={style.content1}>代码规范工具，虽然配置比较麻烦，但是想想这可是能让你保持好的代码风格，并且如果是团队开发的话(hua)！</p>
							</div>
							<div>
								<p className={style.title1}>2. 并没有使用的Redux/Mobx</p>
								<p className={style.content1}>什么？为什么没有使用！只是因为...项目数据并没有和复杂。</p>
							</div>
						</Panel>
					</Collapse>
				</Card>
				<Card title='作者/反馈' style={{width: '90%', marginTop: 20, marginLeft: '5%'}}>
					<div className={style.authorContainer}>
						<h2 className={style.name}>@Limoer</h2>
						<p className={style.profile}>面向运气编程。</p>
						<ul className={style.concat}>
							<li><a href='https://github.com/xiaomoer'><Icon type="github" /></a></li>
							<li><a href='https://weibo.com/u/2994244652?topnav=1&wvr=6&topsug=1'><Icon type="weibo-circle" /></a></li>
							<li><a href='https://www.zhihu.com/people/limoer96/activities'>知(bi)乎</a></li>
						</ul>
					</div>
					<div className={style.feedbackContainer}>
						<p className={style.title1}>说点想说的话吧~</p>
						<p><span>*</span><Input placeholder='为了方便与您联系，请填写您的邮箱' onChange={this.updateEmail} value={email} prefix={<Icon type='user'/>}/></p>
						<p><span>*</span><TextArea placeholder='输入点什么吧' onChange={this.updateContent} value={content}/></p>
						<p className={style.btnGroup}><Button className={style.btn} type='primary' onClick={this.sendFeedback}>发送</Button> <Button className={style.btn} onClick={this.addStar}>点赞就好！</Button></p>
						{Object.keys(error).length > 0 && <Alert type='warning' message={Object.values(error).join('-')}/>}
					</div>
				</Card>
				<BackTop />
			</div>
		)
	}
}

export default AboutPage;