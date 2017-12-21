function getNowWeek(year, month, day){
	const startDay = new Date(year, month, day);
	const now = new Date();
	const offset = now.getTime() - startDay.getTime();
	const offsetWeek = Math.ceil(offset/(1000*60*60*24*7));
	return offsetWeek;
}

export default getNowWeek;