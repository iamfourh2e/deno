import DB from '../routers/DBinit.ts';
export default interface UserModel {
	_id ?: number,
	name: string,
	email: string,
	password: string
}

export const users = DB.collection('users');
