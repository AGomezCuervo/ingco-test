import { useState, useEffect, useMemo } from 'react';
import type { ApiUser } from '@/types/interfaces';
import Pagination from '@/components/Pagination/Pagination';
import ToolBar from '@/components/ToolBar/ToolBar';
import Table from '@/components/Table/Table';
import './App.css'

function App() {
	
	// variables/states
	const BASE_URL = "https://api.fake-rest.refine.dev";
	
	const itemsPerPage = 5; 
	const [totalPages, setTotalPages] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [dataTable, setDataTable] = useState<ApiUser[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);

	// Hooks
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
					sortData("firstName", data);
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
	const sortData = (sortType: string, data?: ApiUser[]) => {
		let sorted: ApiUser[] = [];

		if(data) {
			sorted = [...data].sort((a, b) => a[sortType].localeCompare(b[sortType]));
			setDataTable(sorted);
		} else {
			sorted = [...dataTable].sort((a, b) => a[sortType].localeCompare(b[sortType]));
			setDataTable(sorted);
		}

	}

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
			<ToolBar createUser={createUser} />
			<Table sortData={sortData} data={paginatedData} removeUserById={removeUserById} />
			<Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</>
	)
}

export default App
