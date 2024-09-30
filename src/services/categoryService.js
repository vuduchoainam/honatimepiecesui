import axios from "axios";

const fetchAllCategory = (pageSize, pageNumber) => {
	return axios.post(`https://localhost:7097/Category/SearchCategory`, {
		pageSize: pageSize,
		pageNumber: pageNumber,
	});
};

export { fetchAllCategory };
