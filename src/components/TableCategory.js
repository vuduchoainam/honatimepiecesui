import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchAllCategory, searchCategory } from "../services/categoryService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import CreateOrUpdateCategoryModal from "./CreateOrUpdateCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const TableCategories = () => {
	const [listCategories, setListCategories] = useState([]);
	const [totalCategories, setTotalCategories] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [modalType, setModalType] = useState("create");
	const [editCategory, setEditCategory] = useState(null);
	const [deleteCategory, setDeleteCategory] = useState(null);
	const [inputSearch, setInputSearch] = useState("");
	const [orderBy, setOrderBy] = useState("");
	const [orderByDirection, setOrderByDirection] = useState("");

	// Tạo hàm getCategories bằng useCallback để tránh tái tạo hàm không cần thiết
	const getCategories = useCallback(
		async (page = 0, sortField = orderBy, sortDirection = orderByDirection) => {
			let res = await fetchAllCategory(page, sortField, sortDirection);
			if (res && res.result && res.result.items) {
				setListCategories(res.result.items);
				setTotalCategories(res.result.totalCount);
				setTotalPages(res.result.totalPages);
			}
		},
		[orderBy, orderByDirection]
	);

	useEffect(() => {
		getCategories(0); // Gọi API khi component được load
	}, [getCategories]);

	const handleSort = (field) => {
		const newDirection = orderBy === field && orderByDirection === "DESC" ? "ASC" : "DESC";
		setOrderBy(field);
		setOrderByDirection(newDirection);
		getCategories(0, field, newDirection);
	};

	const handleSearchCategory = async (keyWord, page) => {
		let res = await searchCategory(keyWord, page);
		if (res && res.result && res.result.items) {
			setListCategories(res.result.items);
			setTotalCategories(res.result.totalCount);
			setTotalPages(res.result.totalPages);
		}
	};

	const handlePageClick = (event) => {
		getCategories(+event.selected); // Chuyển đổi string -> number
	};

	const toggleCreateOrUpdateModal = () => {
		setShowModal(!showModal);
	};

	const toggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal);
	};

	// Xử lý sự kiện khi nhấn nút edit
	const handleEditCategory = (category) => {
		setModalType("edit");
		setEditCategory(category);
		toggleCreateOrUpdateModal();
	};

	const handleDeleteCategory = (category) => {
		setDeleteCategory(category);
		toggleDeleteModal();
	};

	const handleInputSearchOnChange = (e) => {
		const inputSearchData = e.target.value;
		setInputSearch(inputSearchData);
		handleSearchCategory(inputSearchData);
	};

	return (
		<>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<div className="flex items-center justify-between p-4 bg-white shadow">
					<span className="text-lg font-semibold text-gray-700">
						Total of categories: {totalCategories}
					</span>
					<div className="w-3/4">
						<form className="max-w-md mx-auto">
							<label
								htmlFor="default-search"
								className="mb-2 text-sm font-medium text-gray-900 sr-only"
							>
								Search
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
									<svg
										className="w-4 h-4 text-gray-500"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 20 20"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
										/>
									</svg>
								</div>
								<input
									type="search"
									id="default-search"
									className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
									placeholder="search..."
									required
									value={inputSearch}
									onChange={handleInputSearchOnChange}
								/>
							</div>
						</form>
					</div>
					<button
						onClick={() => {
							setModalType("create");
							setEditCategory(null);
							toggleCreateOrUpdateModal();
						}}
						className="px-4 py-2 font-bold text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-700"
					>
						Add New
					</button>
				</div>
				<table className="min-w-full mt-2 text-sm text-left text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-100">
						<tr>
							<th
								scope="col"
								className="flex items-center px-6 py-3"
								onClick={() => handleSort("Id")}
							>
								<span>ID</span>
								<FontAwesomeIcon
									icon={faSort}
									className="pl-2 transition duration-300 cursor-pointer "
								/>
							</th>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Description
							</th>
							<th
								scope="col"
								className="px-6 py-3"
								onClick={() => handleSort("CreatedAt")}
							>
								Created At
								<FontAwesomeIcon
									icon={faSort}
									className="pl-2 transition duration-300 cursor-pointer "
								/>
							</th>
							<th
								scope="col"
								className="px-6 py-3"
								onClick={() => handleSort("UpdatedAt")}
							>
								Updated At
								<FontAwesomeIcon
									icon={faSort}
									className="pl-2 transition duration-300 cursor-pointer "
								/>
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{listCategories &&
							listCategories.length > 0 &&
							listCategories.map((item, index) => (
								<tr
									key={`category-${index}`}
									className="transition duration-200 bg-white border-b hover:bg-gray-50"
								>
									<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
										{item.id}
									</td>
									<td className="px-6 py-4">{item.name}</td>
									<td className="px-6 py-4">{item.description}</td>
									<td className="px-6 py-4">{item.createdAt}</td>
									<td className="px-6 py-4">{item.updatedAt}</td>
									<td className="px-6 py-4">
										<div className="flex items-center justify-center h-full space-x-2">
											<FontAwesomeIcon
												icon={faPenToSquare}
												className="text-blue-500 transition duration-300 cursor-pointer hover:text-blue-700"
												onClick={() => handleEditCategory(item)}
											/>
											<span className="text-gray-300">|</span>
											<FontAwesomeIcon
												icon={faTrashCan}
												className="text-red-500 transition duration-300 cursor-pointer hover:text-red-700"
												onClick={() => handleDeleteCategory(item)}
											/>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>

			<div className="flex items-center justify-center mt-6">
				<ReactPaginate
					breakLabel="..."
					nextLabel=">"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={totalPages}
					previousLabel="<"
					forcePage={0}
					containerclassName="flex justify-center space-x-2"
					pageclassName="inline-block"
					pageLinkclassName="px-3 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-md transition"
					previousclassName="inline-block"
					previousLinkclassName="px-3 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-md transition"
					nextclassName="inline-block"
					nextLinkclassName="px-3 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-md transition"
					breakclassName="inline-block"
					breakLinkclassName="px-3 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-md transition"
					activeclassName="bg-blue-600 text-white"
					activeLinkclassName="px-3 py-2 border border-gray-300 text-white bg-blue-600 rounded-md"
				/>
			</div>

			<CreateOrUpdateCategoryModal
				showModal={showModal}
				toggleModal={toggleCreateOrUpdateModal}
				modalType={modalType}
				categoryData={editCategory}
			/>

			<DeleteCategoryModal
				showDeleteModal={showDeleteModal}
				toggleDeleteModal={toggleDeleteModal}
				categoryData={deleteCategory}
			/>
		</>
	);
};

export default TableCategories;
