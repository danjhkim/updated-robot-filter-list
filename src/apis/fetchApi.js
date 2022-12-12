import axios from 'axios';

export default axios.create({
	baseURL: 'https://api.hatchways.io/assessment/students',
});
