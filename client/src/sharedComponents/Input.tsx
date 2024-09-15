import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';
import { ControllerRenderProps } from "react-hook-form";
import {formDataType} from "../components/Form.tsx";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
	field?: ControllerRenderProps<formDataType, "number" | "email">;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ field, ...props }, ref) => {
		return (
			<input
				ref={ref}
				className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				{...field}
				{...props}
			/>
		);
	}
);

export default Input;
