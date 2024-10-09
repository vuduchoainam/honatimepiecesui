import { useEffect, useState } from "react";
import { deleteCategory } from "../services/categoryService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons/faTrashCan";

const DeleteCategoryModal = ({ showDeleteModal, toggleDeleteModal, categoryData }) => {
	const [name, setName] = useState("");

	useEffect(() => {
		if (categoryData) {
			setName(categoryData.name); // Gán tên của category vào state
		}
	}, [categoryData]);

	const handleDeleteCategory = async () => {
		if (categoryData && categoryData.id) {
			let res = await deleteCategory(categoryData.id);
			console.log(">>>> check data: ", res);
			if (res.statusCode === 200) {
				toast.success("Xóa danh mục thành công!");
				setTimeout(() => {
					toggleDeleteModal(); // close modal
					window.location.reload();
				}, 1500);
			} else {
				toast.error("Có lỗi xảy ra khi xóa danh mục!");
			}
		} else {
			toast.error("Không thể xóa danh mục, ID không tồn tại.");
		}
	};

	if (!showDeleteModal) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
			<div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-lg dark:bg-gray-700">
				<div className="text-center">
					<div>
						<FontAwesomeIcon
							icon={faTrashCan}
							className="text-3xl text-gray-500 transition duration-300 cursor-pointer"
						/>
					</div>
					<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
						Are you sure you want to delete "{name}"?
					</h3>
					<button
						onClick={handleDeleteCategory}
						className="px-5 py-2.5 mr-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800"
					>
						Yes, Delete
					</button>
					<button
						onClick={toggleDeleteModal}
						className="px-5 py-2.5 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
					>
						No, Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteCategoryModal;
