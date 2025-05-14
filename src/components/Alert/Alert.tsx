import { Table, IconButton, Button, Flex, AlertDialog } from '@radix-ui/themes';
import { TrashIcon } from "@radix-ui/react-icons";

interface AlertProps {
		removeUserById: (id: number) => void,
		userId: number,
};

function Alert({removeUserById, userId}: AlertProps) {
		return (
				<>
						<AlertDialog.Root>
								<AlertDialog.Trigger>
										<IconButton size="3">
												<TrashIcon width="1.5rem" height="1.5rem"  />
										</IconButton>	
								</AlertDialog.Trigger>
								<AlertDialog.Content maxWidth="450px">
										<AlertDialog.Title>Remove User</AlertDialog.Title>
										<AlertDialog.Description size="2">
												Are you sure? the user will be permanently deleted.
										</AlertDialog.Description>

										<Flex gap="3" mt="4" justify="end">
												<AlertDialog.Cancel>
														<Button variant="soft" color="gray">
																Cancel
														</Button>
												</AlertDialog.Cancel>
												<AlertDialog.Action>
														<Button onClick={() => removeUserById(userId)} variant="solid">
																Remove
														</Button>
												</AlertDialog.Action>
										</Flex>
								</AlertDialog.Content>
						</AlertDialog.Root>
				</>
		)
}

export default Alert;
