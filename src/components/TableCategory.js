/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { fetchAllCategory } from "../services/categoryService";

const TableCategories = (props) => {
	const pageNumber = 1;
	const pageSize = 10;
	const [listCategories, setListCategories] = useState([]);

	useEffect(() => {
		//call api
		getCategories();
	}, []);

	const getCategories = async () => {
		let res = await fetchAllCategory();
		if (res && res.data && res.data.result.items) {
			setListCategories(res.data.result.items);
		}
	};
	console.log(listCategories);
	return (
		<>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
									>
										<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{index + 1}
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
		</>
	);
};

export default TableCategories;
