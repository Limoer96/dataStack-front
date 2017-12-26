import React, { Component } from 'react';
import { Card } from 'antd';
import UserIdForm from '../../form/UserIdForm/UserIdForm';
import StudentListSection from '../../section/StudentListSection/StudentListSection';

class SearchStudentPage extends Component {
	state = {
		result: ''
	}
	saveStudentInfo = (result) => {
		this.setState({
			result
		})
	}
	render() {
		const { result } = this.state;
		return (
			<div>
			<Card style={{width: '90%', marginLeft: '5%', marginTop: '20px'}}>
				<UserIdForm saveStudentInfo={this.saveStudentInfo}/>
			</Card>	
				{
					result && <StudentListSection data={result}/>
				}
			</div>
		)
	}
}

export default SearchStudentPage;