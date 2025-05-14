import { Table, Button, Tooltip } from '@radix-ui/themes';
import type { ApiUser } from '@/types/interfaces';
import Alert from '@/components/Alert/Alert';

interface UsersTableProps {
		data: ApiUser[];
		removeUserById: (id: number) => void;
};

function UsersTable({data, removeUserById}: UsersTableProps) {
		return (
				<>
						<Table.Root variant="surface">
								<Table.Header>
										<Table.Row>
												<Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
												<Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
												<Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
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
