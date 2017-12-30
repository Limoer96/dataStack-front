import React from 'react';
import { BackTop } from 'antd';
import CombineSearchForm from '../../form/CombineSearchForm/CombineSearchForm';
import ExperimentListSection from '../../section/ExperimentListSection/ExperimentListSection';
import BehaviorsTableSection from '../../section/BehaviorsTableSection/BehaviorsTableSection';


class CombineSearchPage extends React.Component {
	state = {
		searchData: '',
		experimentsData: '',
		behaviorsData: '',
	}
	saveSearchData = (searchData) => {
		this.setState({searchData});
	} 
	saveExperimentsData = (experimentsData) => {
		this.setState({experimentsData});
	}
	saveBehaviorsData = (behaviorsData) => {
		this.setState({behaviorsData});
	}
	render() {
		const { searchData, experimentsData, behaviorsData } = this.state;
		return (
			<div>
				<CombineSearchForm 
					saveSearchData={this.saveSearchData} 
					saveExperimentsData={this.saveExperimentsData}
					saveBehaviorsData={this.saveBehaviorsData}
				/>
				{
					searchData && <ExperimentListSection title='模糊查询结果' data={searchData}/>
				}
				{
					experimentsData && <ExperimentListSection title='多条件查询结果' data={experimentsData} />
				}
				{
					behaviorsData && <BehaviorsTableSection data={behaviorsData} />
				}
				<BackTop />
			</div>
		)
	}
}

export default CombineSearchPage;