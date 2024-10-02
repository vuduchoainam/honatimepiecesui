import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchAllCategory } from "../services/categoryService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import CreateOrUpdateCategoryModal from "./CreateOrUpdateCategoryModal";

const TableCategories = (props) => {
	const [listCategories, setListCategories] = useState([]);
	const [totalCategories, setTotalCategories] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [showModal, setShowModal] = useState(false); // to open/close modal
	const [modalType, setModalType] = useState("create"); // "create" or "edit"
	const [editCategory, setEditCategory] = useState(null); // State lưu trữ category cần chỉnh sửa

	useEffect(() => {
		getCategories(0); // Gọi API khi component được load
	}, []);

	const getCategories = async (page) => {
		let res = await fetchAllCategory(page); // Gọi API với page number
		if (res && res.result && res.result.items) {
			setListCategories(res.result.items);
			setTotalCategories(res.result.totalCount);
			setTotalPages(res.result.totalPages);
		}
	};

	const handlePageClick = (event) => {
		getCategories(+event.selected); // Chuyển đổi string -> number
	};

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	// Xử lý sự kiện khi nhấn nút edit
	const handleEditCategory = (category) => {
		setModalType("edit"); // Đặt modalType thành "edit"
		setEditCategory(category); // Lưu category cần chỉnh sửa
		toggleModal(); // Mở modal
	};

	return (
		<>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<div className="flex items-center justify-between p-4 bg-white shadow">
					<span className="text-lg font-semibold text-gray-700">
						Total of categories: {totalCategories}
					</span>
					<button
						onClick={() => {
							setModalType("create"); // Đặt modalType thành "create"
							setEditCategory(null); // Xóa dữ liệu category cũ
							toggleModal(); // Mở modal
						}}
						className="px-4 py-2 font-bold text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-700"
					>
						Add New
					</button>
				</div>
				<table className="min-w-full mt-2 text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								ID
							</th>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Description
							</th>
							<th scope="col" className="px-6 py-3">
								Created At
							</th>
							<th scope="col" className="px-6 py-3">
								Updated At
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{listCategories &&
							listCategories.length > 0 &&
							listCategories.map((item, index) => {
								return (
									<tr
										key={`category-${index}`}
										className="transition duration-200 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
									>
										<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
													onClick={() => handleEditCategory(item)} // Gán sự kiện click để edit
												/>
												<span className="text-gray-300">|</span>
												<FontAwesomeIcon
													icon={faTrashCan}
													className="text-red-500 transition duration-300 cursor-pointer hover:text-red-700"
												/>
											</div>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-center mt-6">
				<ReactPaginate
					breakLabel="..."
					nextLabel=">"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={totalPages}
					previousLabel="<"
					forcePage={0}
					containerClassName="flex justify-center space-x-2"
					pageClassName="inline-block"
					pageLinkClassName="px-3 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-md transition"
					previousClassName="inline-block"
					previousLinkClassName="px-3 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-md transition"
					nextClassName="inline-block"
					nextLinkClassName="px-3 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-md transition"
					breakClassName="inline-block"
					breakLinkClassName="px-3 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-md transition"
					activeClassName="bg-blue-600 text-white"
					activeLinkClassName="px-3 py-2 border border-gray-300 text-white bg-blue-600 rounded-md"
				/>
			</div>

			{/* Render modal */}
			<CreateOrUpdateCategoryModal
				showModal={showModal}
				toggleModal={toggleModal}
				modalType={modalType}
				categoryData={editCategory} // Truyền dữ liệu category khi edit
			/>
		</>
	);
};

export default TableCategories;
