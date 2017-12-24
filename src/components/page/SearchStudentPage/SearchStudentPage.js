import React, { Component } from 'react';
import { Card } from 'antd';
import UserIdForm from '../../form/UserIdForm/UserIdForm';

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
				{ !result && <UserIdForm saveStudentInfo={this.saveStudentInfo}/> }
				{
					result && <Card></Card>
				}
			</div>
		)
	}
}

export default SearchStudentPage;