import React from 'react';
import { message } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import api from './api';
import Header from './components/Header/Header';
import LeftSideMenu from './components/menu/LeftSideMenu/LeftSideMenu';
import LoginPage from './components/page/LoginPage/LoginPage';
import IndexPage from './components/page/IndexPage/IndexPage';
import DashbordPage from './components/page/DashbordPage/DashbordPage';
import ExperimentPage from './components/page/ExperimentPage/ExperimentPage';
import ExperimentDetailPage from './components/page/ExperimentDetailPage/ExperimentDetailPage';
import StudentDetailPage from './components/page/StudentDetailPage/StudentDetailPage';
import FilterByDayDetailPage from './components/page/FilterByDayDetailPage/FilterByDayDetailPage';
import SearchStudentPage from './components/page/SearchStudentPage/SearchStudentPage';
import SearchStudentsMultConditions from './components/page/SearchStudentsMultConditions/SearchStudentsMultConditions';
import CombineSearchPage from './components/page/CombineSearchPage/CombineSearchPage';
import style from './style.css';

class App extends React.Component {
	state = {
		isLogin: false
	}
	changeLoginState = () => {
		this.setState({
			isLogin: true
		})
	}
	componentDidMount() {
		if(localStorage.getItem('token')) {
			api.user.comfirmToken({token: localStorage.getItem('token')}).then(() => {
				this.changeLoginState()
			}).catch(() => {
				localStorage.clear();
				message.info('token失效，请先登录');
			})
		}
	}
	render() {
		const { isLogin } = this.state;
		return (
			<Router>
				<Route render={({history, location}) => <div>
					<Header isLogin={isLogin}/>
					<LeftSideMenu disabled={!isLogin}/>
					<div className={style.contentWrapper}>
						<Switch>
							<Route exact path='/' component={IndexPage}/>
							<Route exact path='/dashbord' component={DashbordPage}/>
							<Route exact path='/login' render={() => <LoginPage 
								changeLoginState={this.changeLoginState}
								history={history}
							/>}
							/>
							<Route 
								exact 
								key={location.key} 
								path='/experiment/:id' 
								component={ExperimentPage}
							/>
							<Route
								exact
								key={location.key}
								path='/detail/experiments/:e_id'
								component={ExperimentDetailPage}
							/>
							<Route
								exact
								key={location.key}
								path='/detail/student/:s_id'
								component={StudentDetailPage}
							/>	
							<Route
								exact
								key={location.key}
								path='/day/:day'
								component={FilterByDayDetailPage}
							/>
							<Route
								exact
								path='/s_id'
								component={SearchStudentPage}
							/>	
							<Route exact path='/mult_search' component={SearchStudentsMultConditions} />
							<Route exacr path='/combine_search' component={CombineSearchPage} />
							<Route render={() => <p>this is default page</p>}/>
						</Switch>
					</div>	
				</div>}/>
			</Router>
		)
	}
}

export default App;