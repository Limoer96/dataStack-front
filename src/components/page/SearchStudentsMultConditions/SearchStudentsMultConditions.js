import React, { Component } from 'react';
import { Card } from 'antd';
import MultSearchForm from '../../form/MultSearchForm/MultSearchForm';
import StudentListSection from '../../section/StudentListSection/StudentListSection';

class SearchStudentsMultConditions extends Component {
	state = {
		data: ''
	}
	saveData = (data) => {
		this.setState({
			data
		})
	}	
	render() {
		const { data } = this.state;
		return (
			<div>
				<Card title='多条件搜索' style={{width: '90%', marginLeft: '5%', marginTop: '20px'}}>
				 <MultSearchForm saveData={this.saveData}/>
				</Card>
				{ data && <StudentListSection data={data}/> }
			</div>
		)
	}
}

export default SearchStudentsMultConditions;