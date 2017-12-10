import axios from 'axios';

export default function setTokenHeader(token = null) {
	if(token) {
		axios.defaults.headers.common.authorization = `Bearer ${token}`;
	}else {
		delete axios.defaults.headers.common.authorization;
	}
}
