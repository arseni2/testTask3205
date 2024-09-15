import React from 'react';

type propsType = {
	email: string
	number: string
}
const User = ({ email, number }: propsType) => {
	return (
		<div className={"flex gap-2 items-center"}>
			<img className={"w-9 h-9 rounded-full"} src="https://flowbite.com/application-ui/demo/images/users/neil-sims.png" alt="avatar"/>

			<div className="flex flex-col">
				<h6 className={"font-medium"}>{ email }</h6>
				<p className={"text-sm text-gray-500"}>{ number }</p>
			</div>
		</div>
	);
};

export default User;