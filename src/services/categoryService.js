import axios from "./customize-axios";

const fetchAllCategory = (page, orderBy = "Id", orderByDirection = "ASC") => {
	return axios.post(
		`/Category/SearchCategory?pageNumber=${page}&orderBy=${orderBy}&orderByDirection=${orderByDirection}`
	);
};

const createCategory = (name, description) => {
	return axios.post("/Category/CreateCategory", { name, description });
};

const editCategory = (id, name, description) => {
	return axios.put(`/Category/EditCategory/${id}`, { name, description });
};

const deleteCategory = (id) => {
	return axios.delete(`/Category/DeleteCategory/${id}`);
};

const searchCategory = (keyWord, page) => {
	return axios.post(`/Category/SearchCategory?keyWord=${keyWord}&page=${page}`);
};

export { fetchAllCategory, createCategory, editCategory, deleteCategory, searchCategory };
