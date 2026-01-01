'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AutoCompleteProps {
	options: string[];
	onSelect: (value: string) => void;
	placeholder?: string;
}

export default function AutoComplete({
	options,
	onSelect,
	placeholder = 'Select an option',
}: AutoCompleteProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [textInput, setTextInput] = useState('');
	const [electoralSelected, setElectoralSelected] = useState('');
	const componentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				componentRef.current &&
				!componentRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [componentRef]);

	const handleSelect = (option: string) => {};

	const filterOptions = (input: string) => {
		return options.filter((option) =>
			option.toLowerCase().includes(input.toLowerCase()),
		);
	};

	const onChangeTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTextInput(e.target.value);
		if (e.target.value === '') {
			setIsOpen(false);
		} else {
			setIsOpen(true);
		}
	};

	const getHighlightedText = (text: string, highlight: string) => {
		const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
		return (
			<span>
				{parts.map((part, i) =>
					part.toLowerCase() === highlight.toLowerCase() ? (
						<span key={i} className="font-bold">
							{part}
						</span>
					) : (
						part
					),
				)}
			</span>
		);
	};

	const getElectoralDistrict = (name: string) => {};

	return (
		<div
			ref={componentRef}
			className="relative z-30 m-auto flex w-full max-w-[720px] justify-center"
		>
			<div className="relative flex w-full max-w-[720px]">
				<input
					className="w-full rounded-[100px] bg-white px-[24px] py-[17px] text-[16px] outline-[1px] focus:outline-[#0EA177]"
					type="text"
					placeholder={placeholder}
					id="autocomplete"
					value={textInput}
					onChange={onChangeTextInput}
					onFocus={() => {
						if (textInput !== '') {
							setIsOpen(true);
						}
					}}
				/>
				<img
					className="absolute top-1/2 right-[0px] mr-[8px] w-[40px] -translate-y-1/2"
					src="/ballotready/search-icon.svg"
					alt="search-icon"
				/>
			</div>
			{isOpen && filterOptions(textInput).length === 0 && (
				<div className="absolute top-[100%] left-0 w-full overflow-hidden rounded-[16px] bg-[#9A9A9A] px-[24px] py-[16px] text-left">
					ไม่มีชื่อเขต/อำเภอนี้
				</div>
			)}
			{isOpen && filterOptions(textInput).length > 0 && (
				<ul className="absolute top-[100%] left-0 max-h-[260px] w-full overflow-scroll rounded-[16px] border bg-white text-left">
					{filterOptions(textInput).map((option, index) => (
						<li
							key={index}
							className="hover:bg-gray1 relative border-b px-[24px] py-[16px] last:border-0 hover:cursor-pointer hover:bg-[#9A9A9A]"
							onClick={() => handleSelect(option)}
						>
							{getHighlightedText(option, textInput)}
							<img
								className="absolute top-1/2 right-[16px] -translate-y-1/2"
								src="/ballotready/right-arrow.svg"
								alt="right-arrow"
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
