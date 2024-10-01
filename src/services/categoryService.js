import axios from "./customize-axios";

const fetchAllCategory = (page) => {
	return axios.post(`/Category/SearchCategory?pageNumber=${page}`);
};

export { fetchAllCategory };
