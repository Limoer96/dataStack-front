function filterExperimentsCount(arrs) {
	const result = [0, 0, 0, 0, 0];
	for(let i = 0; i < arrs.length; i+=1){
		const index = arrs[i] - 1;
		result[index] += 1;
	}
	return result;
}

export default filterExperimentsCount;