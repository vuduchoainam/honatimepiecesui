import axios from "./customize-axios";

const fetchAllCategory = (page) => {
	return axios.post(`/Category/SearchCategory?pageNumber=${page}`);
};

const createCategory = (name, description) => {
	return axios.post("/Category/CreateCategory", { name, description });
};

const editCategory = (id, name, description) => {
	return axios.put(`/Category/EditCategory/${id}`, { name, description });
};

export { fetchAllCategory, createCategory, editCategory };
