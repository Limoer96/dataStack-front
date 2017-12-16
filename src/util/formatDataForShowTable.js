function genExpeimentData (dataFromServer) {
	const returnData = [];
	for(const experiment of dataFromServer){
		returnData.push({
			e_id: experiment.e_id,
			title: experiment.title,
			place: experiment.place,
			time: experiment.time,
			capacity: experiment.capacity,
			is_end: experiment.is_end
		})
	}
	return returnData;
}

function initReturnData() {
	const data = [];
	const degrees = ['不及格', '及格', '一般', '良好', '优秀'];
	for(const degree of degrees) {
		data.push({
			degree,
			count: 0
		})
	}
	return data;
}

function genScore(menber) {
	const returnData = initReturnData();
	for(const one of menber) {
		const score = one.score;
		if(score < 60) {
			returnData[0].count += 1
		}else if(score >= 60 && score < 70) {
			returnData[1].count +=1
		}else if(score >= 70 && score < 80) {
			returnData[2].count += 1
		}else if(score>=80 && score < 90) {
			returnData[3].count += 1
		}else {
			returnData[4].count += 1
		}
	}
	return returnData;
}

function getAverage(data) {
	let reach = 0;
	let absence = 0;
	for(const item of data) {
		reach += item.reach;
		absence += item.absence;
	}
	return ((reach/(reach+absence)).toFixed(4));
}

function genAttendance(attendances, capacity) {
	const returnData = [];
	for(let i = 0; i< attendances.length; i += 1) {
		returnData.push({
			name: `第${i+1}次`,
			reach: attendances[i],
			absence: capacity - attendances[i],
			percentage: ((attendances[i]/capacity).toFixed(4))
		})
	}
	return returnData;
}

function genExperimentMenberData(menber) {
	const returnData = [];
	for(const one of menber) {
		returnData.push({
			name: one.name,
			s_id: one.s_id,
			score: one.score
		})
	}
	return returnData;
}

export { genExpeimentData, genExperimentMenberData, genAttendance, genScore, getAverage };