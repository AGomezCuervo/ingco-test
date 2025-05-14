import { Dialog, Button, Text, TextField, Flex } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import type { ApiUser } from '@/types/interfaces';
import styles from './Modal.module.css';

interface ModalProps {
	createUser: (user: ApiUser ) => void;
};

enum InputTypes {
	EMAIL,
	FIRSTNAME,
	LASTNAME,
}

function Modal({createUser}: ModalProps) {
	const [firstName, setFirstName] = useState<string>("")
	const [lastName, setLastName] = useState<string>("")
	const [email, setEmail] = useState<string>("")	

	// functions
	const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>, input: InputTypes) => {
		switch(input) {
			case InputTypes.EMAIL:
				setEmail(ev.target.value);
				break;
			case InputTypes.FIRSTNAME:
				setFirstName(ev.target.value);
				break;
			case InputTypes.LASTNAME:
				setLastName(ev.target.value);
				break;
		}
	};
	
	const validateForm = () => {
		if(!email || !firstName || !lastName) {
			return;
		}

		const user: ApiUser = {
			id: 0,
			email,
			firstName,
			lastName
		}

		createUser(user);
	}

	return (
		<>
			<Dialog.Root>
				<Dialog.Trigger>
					<Button className={styles.Button}>Create user</Button>
				</Dialog.Trigger>

				<Dialog.Content maxWidth="450px">
					<Dialog.Title>Create user</Dialog.Title>
					<Dialog.Description size="2" mb="4">
						Make changes to your profile.
					</Dialog.Description>

					<Flex direction="column" gap="3">
						<label>
							<Text as="div" size="2" mb="1" weight="bold">
								First name
							</Text>
							<TextField.Root
								id="firstName"
								onChange={(ev) => handleInputChange(ev, InputTypes.FIRSTNAME)}
								placeholder="Enter your first name"
							/>
						</label>
						<label>
							<Text as="div" size="2" mb="1" weight="bold">
								Last Name
							</Text>
							<TextField.Root
								id="lastName"
								onChange={(ev) => handleInputChange(ev, InputTypes.LASTNAME)}
								placeholder="Enter your last name"
							/>
						</label>
						<label>
							<Text as="div" size="2" mb="1" weight="bold">
								Email
							</Text>
							<TextField.Root
								id="email"
								onChange={(ev) => handleInputChange(ev, InputTypes.EMAIL)}
								placeholder="Enter your email"
							/>
						</label>
					</Flex>

					<Flex gap="3" mt="4" justify="end">
						<Dialog.Close>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</Dialog.Close>
						<Dialog.Close>
							<Button onClick={() => validateForm()}>Save</Button>
						</Dialog.Close>
					</Flex>
				</Dialog.Content>
			</Dialog.Root>
		</>
	)
}

export default Modal;
