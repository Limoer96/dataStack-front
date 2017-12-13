import staticMaps from '../static/map';

// data = [{name: '', '正在进行', 已结束: ''}]


function initData() {
	const data = [];
	for(let i = 0; i < staticMaps.experiments.length; i +=1 ) {
		data.push({name: staticMaps.experiments[i], underway: 0, end: 0})
	}
	return data;
}

function formatExperimentData(experiments) {
	const data = initData();
	for(let index = 0; index < experiments.length; index += 1) {
		const key = experiments[index].place_id -1;
		if(experiments[index].is_end) {
			data[key].end += 1;
		}else {
			data[key].underway += 1;
		}
	}
	return data;
}

export default formatExperimentData;