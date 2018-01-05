import axios from 'axios';

const URL = 'http://localhost:3000';
const api = {
	user: {
		auth: (data) => axios.post(`${URL}/users/auth`, {data}).then(res => res.data),
		comfirmToken: (data) => axios.post(`${URL}/users/comfirm_token`, { data }).then(res => res.data)
	},
	data: {
		getExperiments: () => axios.get(`${URL}/data/experiments`).then(res => res.data),
		getUsers: () => axios.get(`${URL}/data/users`).then(res => res.data),
		getBehaviors: () => axios.get(`${URL}/data/behaviors`).then(res => res.data),
		getExperimentsByPlaceId: (id) => axios.get(`${URL}/data/experiment?id=${id}`).then(res => res.data),
		getExperimentByEid: (eId) => axios.get(`${URL}/data/e?e_id=${eId}`).then(res => res.data),
		getStudentBySid: (sId) => axios.get(`${URL}/data/student?s_id=${sId}`).then(res => res.data),
		getBehaviorInfoBySid: (sId) => axios.get(`${URL}/data/s?s_id=${sId}`).then(res => res.data)
	},
	day: {
		getExperimentsFilterByDay: (day) => axios.get(`${URL}/data/experiments_by_day?day=${day}`).then(res => res.data),
		getBehaviorsNow: () => axios.get(`${URL}/data/behaviors/nowadays`).then(res => res.data)
	},
	student: {
		getAllStudentId: () => axios.get(`${URL}/data/students_id_all`).then(res => res.data),
		searchByStudentId: (sId) => axios.get(`${URL}/data/search_by_student_id?s_id=${sId}`).then(res => res.data),
		getInfoBySid: (sId) => axios.get(`${URL}/data/s/info?s_id=${sId}`).then(res => res.data),
		multSearch: (data) => axios.post(`${URL}/data/mult_search`, { data }).then(res => res.data)
	},
	experiments: {
		searchByTitle: (keywords) => axios.get(`${URL}/data/experiments/search?keywords=${keywords}`).then(res => res.data),
		multSearch: ({ duration, startWeek, endWeek, isEnd }) => axios.get(`${URL}/data/experiments/mult_search?d=${duration}&sw=${startWeek}&ew=${endWeek}&end=${isEnd}`).then(res => res.data)
	},
	behaviors: {
		multSearch: ({ typeString, date }) => axios.get(`${URL}/data/behaviors/mult_search?ts=${typeString}&d=${date}`).then(res => res.data)
	},
	feedback: {
		addStar: () => axios.get(`${URL}/feedback/add_star`).then(res => res.data),
		addFeedback: (data) => axios.post(`${URL}/feedback/add_feedback`, {data}).then(res => res.data)
	},
	dm: {
		getScore: (data) => axios.post(`${URL}/dm/get_score`, {data}).then(res => res.data),
		getScoreByRecent: (data) => axios.post(`${URL}/dm/get_by_recent_record`, {data}).then(res => res.data)
	}
}

export default api;