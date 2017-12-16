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
		getExperimentByEid: (eId) => axios.get(`${URL}/data/e?e_id=${eId}`).then(res => res.data)
	}
}

export default api;