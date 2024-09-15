import axios from 'axios';
import { formDataType } from "../components/Form.tsx";

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/api',
	timeout: 10000,
});

export const searchUsers = async ({ number, email }: formDataType, cancelToken) => {
	// Передаем cancelToken в запрос
	const response = await axiosInstance.get<formDataType[]>(`?email=${email}&number=${number}`, {
		cancelToken: cancelToken.token, // Добавляем токен отмены
	});
	return response.data;
}
