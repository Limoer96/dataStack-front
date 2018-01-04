import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import getNowWeek from '../../../util/getNowWeek';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LeftSideMenu = ({ disabled }) => (
	<div style={{width: 260, marginTop: 10}}>
		<Menu
			defaultOpenKeys={['sub1', 'sub4', 'sub5']}
			mode='inline'
		>
			<Menu.Item key='1'>
				<Icon type="login" />
				<span><Link to='/login'>登录/登出</Link></span>
			</Menu.Item>
			<Menu.Item key='2'>
				<Icon type="info" />
				<span><Link to='/dashbord'>总览</Link></span>
			</Menu.Item>
			<SubMenu key='sub1' title={<span><Icon type="appstore" /><span>数据</span></span>}>
				<SubMenu key='sub2' title={<span>实验室</span>}>
					<Menu.Item disabled={disabled} key='3'><Link to='/experiment/1'><span>计算机系统与虚拟技术开发实验室</span></Link></Menu.Item>
					<Menu.Item disabled={disabled} key='4'><Link to='/experiment/2'><span>计算机网络技术开放实验室</span></Link></Menu.Item>
					<Menu.Item disabled={disabled} key='5'><Link to='/experiment/3'><span>大数据与云计算开放实验室</span></Link></Menu.Item>
					<Menu.Item disabled={disabled} key='6'><Link to='/experiment/4'><span>“互联网+” 创新实验室</span></Link></Menu.Item>
					<Menu.Item disabled={disabled} key='7'><Link to='/experiment/5'><span>信息技术与应用综合实验室</span></Link></Menu.Item>
				</SubMenu>
				<SubMenu key='sub3' title={<span>本周(第{getNowWeek(2017, 8, 12)}周)</span>}>
					<Menu.Item disabled={disabled} key='8'><Link to='/day/1'><span>星期一</span></Link></Menu.Item>
					<Menu.Item disabled={disabled} key='9'><Link to='/day/2'><span>星期二</span></Link></Menu.Item>
					<Menu.Item disabled={disabled} key='10'><Link to='/day/3'><span>星期三</span></Link></Menu.Item>
					<Menu.Item disabled={disabled} key='11'><Link to='/day/4'><span>星期四</span></Link></Menu.Item>
					<Menu.Item disabled={disabled} key='12'><Link to='/day/5'><span>星期五</span></Link></Menu.Item>
					<Menu.Item disabled={disabled} key='13'><Link to='/day/6'><span>星期六</span></Link></Menu.Item>
				</SubMenu>
				<SubMenu key='sub4' title={<span>更多</span>}>
					<MenuItemGroup title='学生'>
						<Menu.Item disabled={disabled} key='14'><Link to='/s_id'><span>按学号</span></Link></Menu.Item>
						<Menu.Item disabled={disabled} key='15'><Link to='/mult_search'><span>更多条件</span></Link></Menu.Item>
					</MenuItemGroup>
					<MenuItemGroup title='搜索'>
						<Menu.Item disabled={disabled} key='16'><Link to='/combine_search'><span>综合搜索</span></Link></Menu.Item>
						<Menu.Item disabled={disabled} key='17'><span>更多</span></Menu.Item>
					</MenuItemGroup>
				</SubMenu>
			</SubMenu>
			<SubMenu key='sub5' title={<span>辅助评分</span>}>
				<Menu.Item disabled={disabled} key='18'><Link to='/score'><span>评分</span></Link></Menu.Item>
				<Menu.Item disabled={disabled} key='19'><span>简介</span></Menu.Item>
			</SubMenu>
			<Menu.Item key='20'>
				<Link to='/about'><span>关于</span></Link>
			</Menu.Item>
		</Menu>
	</div>
)

export default LeftSideMenu;