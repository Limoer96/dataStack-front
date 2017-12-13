// 不分用户获取所有的行为信息
function genAllBehaviors(data) {
	const behaviors = [];
	for(const item of data) {
		if(item.behaviors) {
			behaviors.push(...item.behaviors)
		}
	}
	return behaviors;
}
// 获取所有你年月份并且排序
function getYearAndMonthSet(data) {
	const behaviors = genAllBehaviors(data);
	const yearAndMonth = new Set();
	for(const behavior of behaviors) {
		const date = new Date(behavior.start_time);
		const year = date.getFullYear();
		const month = (date.getMonth()+1) > 9 ? date.getMonth()+1 : `0${(date.getMonth()+1)}`;
		const yearAndMonthString = `${year}-${month}`;
		yearAndMonth.add(yearAndMonthString);
	}
	const yearAndMonthArr = [...yearAndMonth];
	return yearAndMonthArr.sort();
}
// 构建初始返回值
function initReturnData(dataFromServer) {
	const yearsAndMonthArr = getYearAndMonthSet(dataFromServer);
	const data = [];
	for(const yearAndMonthString of yearsAndMonthArr) {
		data.push({
			'date': yearAndMonthString,
			count: 0
		})
	}
	return data;
}
// 更新一条
function findAndUpdate(data, yearAndMonth) {
	for(const item of data) {
		if(item.date === yearAndMonth) {
			item.count += 1;
		}
	}
}
// 构造并且返回最终数据
function formatBehaviorsData(dataFromServer) {
	const data = initReturnData(dataFromServer);
	const behaviors = genAllBehaviors(dataFromServer);
	for(const behavior of behaviors) {
		const date = new Date(behavior.start_time);
		const year = date.getFullYear();
		const month = (date.getMonth()+1) > 9 ? date.getMonth()+1 : `0${(date.getMonth()+1)}`;
		const yearAndMonthString = `${year}-${month}`;
		findAndUpdate(data, yearAndMonthString);
	}
	return data;
}

export default formatBehaviorsData;