import React from 'react';
import User from "./User.tsx";
import {formDataType} from "./Form.tsx";
import EmptyUsersList from "./EmptyUsersList.tsx";

type propsType = {
	users: formDataType[]
}
const UsersList = (props: propsType) => {
	return (
		<div className={"flex flex-col gap-4 p-2"}>
			{props.users && props.users.map((user) => {
				return <User email={user.email} number={user.number} />
			})}

			{props.users.length === 0 && <EmptyUsersList />}
		</div>
	);
};

export default UsersList;