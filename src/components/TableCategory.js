import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchAllCategory } from "../services/categoryService";

const TableCategories = (props) => {
	const [listCategories, setListCategories] = useState([]);
	const [totalCategories, setTotalCategories] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		getCategories(0); //call api
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
		getCategories(event.selected);
	};

	return (
		<>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<span className="block p-4 text-lg font-semibold text-gray-700">
					Total of categories: {totalCategories}
				</span>
				<table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
						</tr>
					</thead>
					<tbody>
						{listCategories &&
							listCategories.length > 0 &&
							listCategories.map((item, index) => {
								return (
									<tr
										key={`category-${index}`}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
									>
										<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{item.id}
										</td>
										<td className="px-6 py-4">{item.name}</td>
										<td className="px-6 py-4">{item.description}</td>
										<td className="px-6 py-4">{item.createdAt}</td>
										<td className="px-6 py-4">{item.updatedAt}</td>
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
		</>
	);
};

export default TableCategories;
