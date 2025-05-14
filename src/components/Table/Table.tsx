import type { ApiUser } from '@/types/interfaces';
import { Table, Button, Tooltip } from '@radix-ui/themes';
import { useState} from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import Alert from '@/components/Alert/Alert';
import styles from './Table.module.css';

interface UsersTableProps {
	data: ApiUser[];
	removeUserById: (id: number) => void;
	sortData: (sortType: string) => void;
};

function UsersTable({sortData, data, removeUserById}: UsersTableProps) {
	// variables/states
	const [sortBy, setSortBy] = useState<string>("firstName");

	// functions
	const handleSort = (sortType: string) => {
		setSortBy(sortType);
		sortData(sortType);
	}

	return (
		<>
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>
							<Button onClick={() => handleSort("firstName")} className={styles.Button} color="white" variant="ghost">
								First Name
								{sortBy == "firstName" ?
								 <ArrowUpIcon/> :
								 <ArrowDownIcon />
								}
							</Button>
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>
							<Button onClick={() => handleSort("lastName")} className={styles.Button} color="white" variant="ghost">
								Last Name
								{sortBy == "lastName" ?
								 <ArrowUpIcon/> :
								 <ArrowDownIcon />
								}
							</Button>
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>
							<Button onClick={() => handleSort("email")} className={styles.Button} color="white" variant="ghost">
								Email
								{sortBy == "email" ?
								 <ArrowUpIcon/> :
								 <ArrowDownIcon />
								}
							</Button>
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{data.map((user, index) => (
						<Table.Row key={index}>
						<Table.RowHeaderCell>{user.firstName}</Table.RowHeaderCell>
						<Table.Cell>{user.lastName}</Table.Cell>
						<Table.Cell>{user.email}</Table.Cell>
						<Table.Cell>
						<Tooltip content="Delete user">
							<Alert removeUserById={removeUserById} userId={user.id} />
						</Tooltip>
						</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</>
	)
}
export default UsersTable;
