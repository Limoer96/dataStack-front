function filterExperimentsCount(arrs) {
	const result = [0, 0, 0, 0, 0];
	for(let i = 0; i < arrs.length; i+=1){
		const index = arrs[i] - 1;
		result[index] += 1;
	}
	return result;
}

function filterIsEnd(experiments) {
	const total = experiments.length;
	let endCount = 0;
	for(const experiment of experiments) {
		if(experiment.is_end) {
			endCount += 1;
		}
	}
	return { end: endCount, run: total-endCount }
}

function filterIsComplete(experiments) {
	const total = experiments.length;
	let complete = 0;
	for(const experiment of experiments) {
		if(experiment.is_complete) {
			complete += 1;
		}
	}
	return { yes: complete, no: total-complete }
}



export { filterExperimentsCount, filterIsEnd, filterIsComplete};