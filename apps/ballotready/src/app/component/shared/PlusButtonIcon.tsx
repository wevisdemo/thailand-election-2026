import { useState } from 'react';

export default function PlusButtonIcon({
	color,
	className,
}: {
	color?: string;
	className?: string;
}) {
	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<circle
				cx="7.5"
				cy="7.5"
				r="7"
				fill="white"
				className="stroke-[#CEC2F5] group-hover:stroke-[#9C81F6]"
			/>
			<path
				d="M7.74512 4V11.5"
				strokeWidth="2"
				strokeLinecap="round"
				className="stroke-[#CEC2F5] group-hover:stroke-[#9C81F6]"
			/>
			<path
				d="M11.5 7.74512L4 7.74512"
				strokeWidth="2"
				strokeLinecap="round"
				className="stroke-[#CEC2F5] group-hover:stroke-[#9C81F6]"
			/>
		</svg>
	);
}
