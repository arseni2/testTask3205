import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from "../sharedComponents/Input.tsx";
import Button from "../sharedComponents/Button.tsx";
import { useMask } from "@react-input/mask";
import { searchUsers } from "../api";
import axios, { CancelToken } from 'axios';

const validationSchema = yup.object().shape({
	email: yup.string().email('Неправильный формат email').required('Email обязателен'),
	number: yup.string()
		.required('Номер обязателен')
});

export type formDataType = {
	email: string;
	number: string;
};

type propsType = {
	setUsers: (data: formDataType[]) => void
}
const Form = (props: propsType) => {
	const [isLoading, setIsLoading] = useState(false);
	const [cancelRequest, setCancelRequest] = useState(null);
	const inputRef = useMask({ mask: '__-__-__', replacement: { _: /\d/ }, showMask: true });


	const { control, handleSubmit, formState: { errors } } = useForm<formDataType>({
		defaultValues: {
			email: '',
			number: '',
		},
		resolver: yupResolver(validationSchema),
		mode: 'onBlur'
	});


	const onSubmit = (data: formDataType) => {
		setIsLoading(true);

		if (cancelRequest) {
			cancelRequest('Запрос отменен перед повторной отправкой');
		}

		data.number = data.number.replace(/_/g, '').replace(/-/g, '').trim();

		const source = CancelToken.source();
		setCancelRequest(() => source.cancel);

		searchUsers(data, source).then(users => {
			props.setUsers(users);
			setIsLoading(false);
		}).catch(error => {
			if (axios.isCancel(error)) {
				console.log('Запрос отменен:', error.message);
				setIsLoading(true);
			} else {
				console.error('Ошибка запроса:', error);
			}
		})
	};


	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto pt-2">
			<div className="mb-5">
				<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<Input {...field} type="email" id="email" placeholder="name@flowbite.com" required />
					)}
				/>
				{errors.email && <p className="text-red-500">{errors.email.message}</p>}
			</div>
			<div className="mb-5">
				<label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900">Number</label>
				<Controller
					name="number"
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							ref={inputRef}
							type="text"
							id="number"
						/>
					)}
				/>
				{errors.number && <p className="text-red-500">{errors.number.message}</p>}
			</div>

			<Button type={"submit"}>Submit</Button>
			{isLoading && <p>loading...</p>}
		</form>
	);
};

export default Form;
