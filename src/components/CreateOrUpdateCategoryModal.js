import { useState, useEffect } from "react";
import { createCategory, editCategory } from "../services/categoryService";
import { toast } from "react-toastify";

const CreateOrUpdateCategoryModal = ({ showModal, toggleModal, modalType, categoryData }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	// Cập nhật dữ liệu khi modalType là edit
	useEffect(() => {
		if (modalType === "edit" && categoryData) {
			console.log(">>check data: ", categoryData);
			setName(categoryData.name);
			setDescription(categoryData.description);
		} else {
			// Reset dữ liệu khi là create
			setName("");
			setDescription("");
		}
	}, [modalType, categoryData]);

	const handleCreateOrUpdateCategory = async (event) => {
		event.preventDefault(); // Ngăn chặn hành vi submit mặc định

		if (modalType === "create") {
			// Gọi API tạo mới danh mục
			let resCreate = await createCategory(name, description);
			if (resCreate && resCreate.result.id) {
				toast.success("Tạo danh mục thành công!");
				setTimeout(() => {
					window.location.reload(); // Reload trang sau khi hiển thị toast
				}, 1500);
			} else {
				toast.error("Có lỗi xảy ra khi tạo danh mục!");
			}
		} else if (modalType === "edit") {
			// Gọi API chỉnh sửa danh mục
			let resEdit = await editCategory(categoryData.id, name, description);
			if (resEdit && resEdit.result) {
				toast.success("Cập nhật danh mục thành công!");
				setTimeout(() => {
					window.location.reload(); // Reload trang sau khi hiển thị toast
				}, 1500);
			} else {
				toast.error("Có lỗi xảy ra khi chỉnh sửa danh mục!");
			}
		} else {
			toast.error("Có lỗi xảy ra!");
		}
	};

	if (!showModal) return null;

	return (
		<div
			tabIndex="-1"
			aria-hidden="true"
			className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
		>
			<div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-lg dark:bg-gray-700">
				{/* Modal header */}
				<div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						{modalType === "create" ? "Create New Category" : "Edit Category"}
					</h3>
					<button
						type="button"
						onClick={toggleModal} // Đóng modal
						className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
					>
						<svg
							className="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 14"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
						<span className="sr-only">Close modal</span>
					</button>
				</div>
				{/* Create or Update Form */}
				<form className="p-4 md:p-5" onSubmit={handleCreateOrUpdateCategory}>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div className="col-span-2">
							<label
								htmlFor="name"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Name
							</label>
							<input
								type="text"
								name="name"
								id="name"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Type category name"
								required=""
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
						</div>
						<div className="col-span-2">
							<label
								htmlFor="description"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Description
							</label>
							<textarea
								id="description"
								rows="3"
								className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Write category description here"
								value={description}
								onChange={(event) => setDescription(event.target.value)}
							></textarea>
						</div>
					</div>
					<button
						type="submit"
						className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						<svg
							className="w-5 h-5 me-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
								clipRule="evenodd"
							></path>
						</svg>
						{modalType === "create" ? "Submit" : "Update"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateOrUpdateCategoryModal;
