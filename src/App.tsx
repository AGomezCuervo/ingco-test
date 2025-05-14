import { useState, useEffect, useMemo } from 'react';
import type { ApiUser, Sort } from '@/types/interfaces';
import { SortType } from '@/types/interfaces';
import Pagination from '@/components/Pagination/Pagination';
import ToolBar from '@/components/ToolBar/ToolBar';
import Table from '@/components/Table/Table';
import './App.css'

function App() {

	// variables/states
	const BASE_URL = "https://api.fake-rest.refine.dev";

	const itemsPerPage = 5;
	const [originalData, setOriginalData] = useState<ApiUser[]>([]);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [dataTable, setDataTable] = useState<ApiUser[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [firstName, setFirstName] = useState<string>();
	const [lastName, setLastName] = useState<string>();

	// Hooks
	useEffect(() => {

		if (firstName?.trim() == "" && lastName?.trim() == "") {
			setDataTable(originalData)
			return;
		}

		if (firstName?.trim()) {
			const sortedByName = originalData.filter((u) => {
				const regex = new RegExp(firstName.trim(), "i");
				return regex.test(u.firstName);
			});
			setDataTable(sortedByName)
		}

		if (lastName?.trim()) {
			const sortedByName = originalData.filter((u) => {
				const regex = new RegExp(lastName?.trim(), "i");
				return regex.test(u.lastName);
			});
			setDataTable(sortedByName)
		}

	}, [firstName, lastName])

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`${BASE_URL}/users`);

				if(!response.ok) {
					throw new Error(`Response status ${response.status}`);
				}

				let data: ApiUser[] = (await response.json()) as ApiUser[];
				if(Array.isArray(data)) {
					data = data.filter(user => user.status === true);
					setTotalPages(Math.ceil(data.length / itemsPerPage));
					sortData({name:"firstName", type: SortType.ASC}, data);
					setOriginalData(data);
				}

			} catch(err) {
				console.error(err.message);

			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const paginatedData = useMemo(() => {
		const lastItem = currentPage * itemsPerPage;
		const firstItem = lastItem - itemsPerPage;
		return dataTable.slice(firstItem, lastItem);
	}, [dataTable, currentPage, itemsPerPage]);

	// Functions
	const sortData = (sortObj: Sort, data?: ApiUser[]) => {
		const dataToSort = data || dataTable;
		let sorted: ApiUser[] = [];

		// Determine which sorting direction (ASC or DESC) to apply
		if (sortObj.type === SortType.ASC) {
			sorted = [...dataToSort].sort((a, b) => a[sortObj.name].localeCompare(b[sortObj.name]));
		} else if (sortObj.type === SortType.DESC) {
			sorted = [...dataToSort].sort((a, b) => b[sortObj.name].localeCompare(a[sortObj.name]));
		}

		setDataTable(sorted);
		return sorted;
	};

	const createUser = (user: ApiUser) => {
		const newId = dataTable[dataTable.length - 1].id + 1;
		user.id = newId;
		dataTable.push(user);
	}

	const removeUserById = (id: number) => {
		setDataTable(dataTable.filter(user => user.id !== id));
		setTotalPages(Math.ceil(dataTable.length / itemsPerPage));
	}

	return (
		<>
			<ToolBar createUser={createUser} setFirstName={setFirstName} setLastName={setLastName}/>
			<Table sortData={sortData} data={paginatedData} removeUserById={removeUserById} />
			<Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</>
	)
}

export default App
