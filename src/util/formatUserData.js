 


function getYearSet(users) {
	const years = new Set();
 	for(let i = 0; i < users.length; i += 1) {
 		years.add(new Date(users[i].date_of_admission).getFullYear());
 	}
 	const yearsArr = [...years];
 	return yearsArr.sort();
}

function initReturnData(users) {
	const years = getYearSet(users);
	const data = [];
	for(const year of years) {
		data.push({
			year,
			count: 0,
			male: 0,
			female: 0
		})
	}
	return data;
}

function findAndUpdateCount(data, year, sex) {
	for(const item of data) {
		if(item.year === year) {
			item.count += 1;
			if(sex === 0) {
				item.male += 1
			}else {
				item.female += 1
			}
		}
	}
}

function formatUserData(users) {
	const data = initReturnData(users);
	for(const user of users) {
		const year = new Date(user.date_of_admission).getFullYear();
		const sex = user.sex;
		findAndUpdateCount(data, year, sex);
	}
	return data;
}

export default formatUserData;