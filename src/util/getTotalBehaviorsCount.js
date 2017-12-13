function getTotalBehaviorsCount(behaviors) {
	let count = 0;
	for(let i = 0; i < behaviors.length; i += 1) {
		count += behaviors[i].behaviors.length;
	}
	return count;
}

export default getTotalBehaviorsCount;