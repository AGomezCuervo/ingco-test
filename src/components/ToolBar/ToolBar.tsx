import { TextField, Flex, Text } from '@radix-ui/themes';
import Modal from "@/components/Modal/Modal";
import styles from './ToolBar.module.css';
interface ToolBarProps {
	createUser: () => void;
}

function ToolBar({createUser}: ToolBarProps) {
	return (
		<Flex className={styles.container} gap="3">
			<div>
				<label>
					<Text as="div" size="2" mb="1" weight="bold">
						Filter first name
					</Text>
					<TextField.Root
						id="firstName"
						placeholder="Enter first name"
					/>
				</label>
			</div>
			<div>
				<label>
					<Text as="div" size="2" mb="1" weight="bold">
						Filter last name
					</Text>
					<TextField.Root
						id="lastName"
						placeholder="Enter last name"
					/>
				</label>
			</div>
			<Modal createUser={createUser} />
		</Flex>
	);
}
export default ToolBar;
