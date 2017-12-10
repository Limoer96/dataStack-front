import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LeftSideMenu = ({ disabled }) => (
	<div style={{width: 260}}>
		<Menu
			defaultSelectedKeys={['1']}
			defaultOpenKeys={['sub1', 'sub4', 'sub5']}
			mode='inline'
			theme='dark'
		>
			<Menu.Item key='1'>
				<Icon type="login" />
				<span><Link to='login' style={{color: 'rgba(255, 255, 255, .7)'}}>登录/登出</Link></span>
			</Menu.Item>
			<Menu.Item key='2'>
				<Icon type="info" />
				<span>总览</span>
			</Menu.Item>
			<SubMenu key='sub1' title={<span><Icon type="appstore" /><span>数据</span></span>}>
				<SubMenu key='sub2' title={<span>实验室</span>}>
					<Menu.Item disabled={disabled} key='3'><span>计算机系统与虚拟技术开发实验室</span></Menu.Item>
					<Menu.Item disabled={disabled} key='4'><span>计算机网络技术开放实验室</span></Menu.Item>
					<Menu.Item disabled={disabled} key='5'><span>大数据与云计算开放实验室</span></Menu.Item>
					<Menu.Item disabled={disabled} key='6'><span>“互联网+” 创新实验室</span></Menu.Item>
					<Menu.Item disabled={disabled} key='7'><span>信息技术与应用综合实验室</span></Menu.Item>
				</SubMenu>
				<SubMenu key='sub3' title={<span>时间</span>}>
					<Menu.Item disabled={disabled} key='8'><span>星期一</span></Menu.Item>
					<Menu.Item disabled={disabled} key='9'><span>星期二</span></Menu.Item>
					<Menu.Item disabled={disabled} key='10'><span>星期三</span></Menu.Item>
					<Menu.Item disabled={disabled} key='11'><span>星期四</span></Menu.Item>
					<Menu.Item disabled={disabled} key='12'><span>星期五</span></Menu.Item>
					<Menu.Item disabled={disabled} key='13'><span>星期六</span></Menu.Item>
				</SubMenu>
				<SubMenu key='sub4' title={<span>更多</span>}>
					<MenuItemGroup title='学生'>
						<Menu.Item disabled={disabled} key='14'><span>按学号</span></Menu.Item>
						<Menu.Item disabled={disabled} key='15'><span>更多条件</span></Menu.Item>
					</MenuItemGroup>
					<MenuItemGroup title='搜索'>
						<Menu.Item disabled={disabled} key='16'><span>综合搜错</span></Menu.Item>
						<Menu.Item disabled={disabled} key='17'><span>更多</span></Menu.Item>
					</MenuItemGroup>
				</SubMenu>
			</SubMenu>
			<SubMenu key='sub5' title={<span>数据挖掘</span>}>
				<Menu.Item disabled={disabled} key='18'><span>简介</span></Menu.Item>
				<Menu.Item disabled={disabled} key='19'><span>问题与问题解决</span></Menu.Item>
			</SubMenu>
			<Menu.Item key='20'>
				<span>关于</span>
			</Menu.Item>
		</Menu>
	</div>
)

export default LeftSideMenu;