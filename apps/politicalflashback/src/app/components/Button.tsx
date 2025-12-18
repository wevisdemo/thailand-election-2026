'use client';

import { twMerge } from 'tailwind-merge';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	compact?: boolean;
}

const Button = ({
	children,
	className,
	compact = false,
	...props
}: ButtonProps) => {
	return (
		<button
			className={twMerge(
				'disabled:text-gray-2 border-gray-2 hover:border-purple-2 hover:bg-purple-2 active:text-green-2 flex cursor-pointer flex-row items-center justify-center gap-2 rounded-full border-2 border-solid transition-colors active:border-black active:bg-black disabled:cursor-not-allowed',
				compact ? 'px-4 py-2' : 'px-6 py-3',
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
