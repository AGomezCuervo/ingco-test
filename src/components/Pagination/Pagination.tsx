import { Button } from '@radix-ui/themes';
import styles from './Pagination.module.css';

interface PaginationProps {
	totalPages: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
};

export function Pagination({ totalPages, currentPage, setCurrentPage }: PaginationProps) {
	return (
		<div className={styles.container}>
			<Button
				disabled = {currentPage <= 1}
				onClick={() => setCurrentPage(currentPage - 1 )}
				variant="soft"
				color="gray"
				size="3"
			>
				{'\u2190'}
			</Button>

			{Array.from({ length: totalPages }, (_, index) => {
				const isActive = currentPage === index + 1;

				return (
					<Button
						key={index}
								onClick={() => setCurrentPage(index + 1)}
								variant={isActive ? 'solid' : 'soft'}
								color={isActive ? 'crimson' : 'gray'}
								size="3"
					>
						{index + 1}
					</Button>
				);
			})}

			<Button
				disabled = {currentPage >= totalPages}
				onClick={() => setCurrentPage(currentPage + 1 )}
				variant="soft"
				color="gray"
				size="3"
			>
				{'\u2192'}
			</Button>
		</div>
  );
}

export default Pagination;
