export interface ApiUser {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	status: false;
}

export enum SortType {
			 ASC,
			 DESC
}

export interface Sort {
	name: string,
	type: SortType,
}