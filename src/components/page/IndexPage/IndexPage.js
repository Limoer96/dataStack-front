import React from 'react';
import { Card, Steps, Icon, List } from 'antd';
import style from './style.css';

const Step = Steps.Step;

const data = [
	'1. 通过管理员账户登录到本平台，管理员账户暂不支持注册',
	'2. 点击左侧边栏的菜单项，结果将会出现在右侧操作区域',
	'3. 使用自定搜索功能可以更容易查看到你想要的数据',
	'4. 如您在公共电脑上操作，使用完平台后请务必点击左侧栏登录/登出进行账号注销'
];

const IndexPage = () => (
	<div className={style.container}>
		<Card title='数据平台简介' style={{width: '90%', marginLeft: '5%'}}>
			<p className={style.mainTitle}>“山东大学计算机通识教育与数字化创新开放实验平台”的数据平台(以下简称“数据平台”)，提供给系统管理员使用。“数据平台”主要功能包括数据展示和数据分析。</p>
			<div className={style.section}>
				<p>1. 数据展示</p>
				<p>数据展示通过使用直观的图表形式呈。包括实验室开课信息查看；学生基本信息、学习行为信息查看；综合搜索信息展示等。通过最简单直观的数据展示，管理员可以实时了解“平台”的运行状况。</p>
			</div>	
			<div className={style.section}>
				<p>2. 数据分析</p>
				<p>通过搜集学生在“平台”的学习行为数据，利用数据分析和数据挖掘技术对学生的学习行为进行建模和分析，由此进行例如“学生成绩和平台使用习惯”等的问题的讨论。</p>
			</div>
		</Card>
		<Card title='数据平台使用' style={{width: '90%', marginLeft: '5%', marginTop: '20px'}}>
			<p className={style.useTitle}>数据平台使用步骤一览</p>
			<Steps size='small'>
				<Step status='process' title='登录' icon={<Icon type='user'/>}/>
				<Step status='wait' title='数据平台数据查看' icon={<Icon type="area-chart" />}/>
				<Step status='wait' title='查看数据分析结果' icon={<Icon type="file-text" />}/>
				<Step status='wait' title='退出登录' icon={<Icon type="poweroff" />}/>
			</Steps>
			<div className={style.listContainer}>
				<List
		      size="small"
		      header={<div>“数据平台”使用须知</div>}
		      bordered
		      dataSource={data}
		      renderItem={item => (<List.Item>{item}</List.Item>)}
		    />
			</div>
		</Card>
	</div>
) 

export default IndexPage;