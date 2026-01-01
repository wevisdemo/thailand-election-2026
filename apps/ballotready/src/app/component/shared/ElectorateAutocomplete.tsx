'use client';

import { ThailandDistrict } from '@/src/type/district';
import {
	ElectoralDistrict,
	ElectoralDistrictsMap,
} from '@/src/type/electoral_district';
import React, { useEffect, useRef, useState } from 'react';

interface ElectorateAutoCompleteProps {
	mapThaiDistrict: Map<string, ThailandDistrict>;
	mapElectoralDistrict: ElectoralDistrictsMap;
	placeholder?: string;
}

export default function ElectorateAutoComplete({
	mapThaiDistrict,
	mapElectoralDistrict,
	placeholder = 'Select an option',
}: ElectorateAutoCompleteProps) {
	const options = mapThaiDistrict.keys().toArray();
	const [isOpenDistrictOptions, setIsOpenDistrictOptions] = useState(false);
	const [textInput, setTextInput] = useState('');
	const [districtLabelSelected, setDistrictLabelSelected] = useState('');
	const [electorateSelected, setElectorateSelected] =
		useState<ElectoralDistrict | null>(null);
	const componentRef = useRef<HTMLDivElement | null>(null);

	const onClose = () => {
		setIsOpenDistrictOptions(false);
		setDistrictLabelSelected('');
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				componentRef.current &&
				!componentRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [componentRef]);

	const handleSelectDistrict = (option: string) => {
		setIsOpenDistrictOptions(false);
		setDistrictLabelSelected(option);
	};

	const getThaiDistrict = (label: string): ThailandDistrict | null => {
		return mapThaiDistrict.get(label) || null;
	};

	const getElectoralDistrict = (name: string): ElectoralDistrict | null => {
		if (!name) return null;
		return mapElectoralDistrict[name] || null;
	};

	const getElectoralDistrictsFromLabel = (
		label: string,
	): ElectoralDistrict[] => {
		const thaiDistrict = getThaiDistrict(label);
		if (!thaiDistrict) return [];
		return thaiDistrict.electoralFk.reduce((list, item) => {
			const electoralDistrict = getElectoralDistrict(item);
			if (electoralDistrict) {
				return [...list, electoralDistrict];
			}
			return list;
		}, [] as ElectoralDistrict[]);
	};

	const filterOptions = (input: string) => {
		return options.filter((option) =>
			option.toLowerCase().includes(input.toLowerCase()),
		);
	};

	const onChangeTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTextInput(e.target.value);
		if (e.target.value === '') {
			setIsOpenDistrictOptions(false);
		} else {
			setIsOpenDistrictOptions(true);
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
					id="Electorateautocomplete"
					value={textInput}
					onChange={onChangeTextInput}
					onFocus={() => {
						if (textInput !== '') {
							setIsOpenDistrictOptions(true);
							setDistrictLabelSelected('');
						}
					}}
				/>
				<img
					className="absolute top-1/2 right-[0px] mr-[8px] w-[40px] -translate-y-1/2"
					src="/ballotready/search-icon.svg"
					alt="search-icon"
				/>
			</div>
			{isOpenDistrictOptions && filterOptions(textInput).length === 0 && (
				<div className="absolute top-[100%] left-0 w-full overflow-hidden rounded-[16px] bg-[#9A9A9A] px-[24px] py-[16px] text-left">
					ไม่มีชื่อเขต/อำเภอนี้
				</div>
			)}
			{isOpenDistrictOptions && filterOptions(textInput).length > 0 && (
				<ul className="absolute top-[100%] left-0 max-h-[260px] w-full overflow-scroll rounded-[16px] border bg-white text-left">
					{filterOptions(textInput).map((option, index) => (
						<li
							key={index}
							className="hover:bg-gray1 relative border-b px-[24px] py-[16px] last:border-0 hover:cursor-pointer hover:bg-[#9A9A9A]"
							onClick={() => {
								handleSelectDistrict(option);
							}}
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
			{getElectoralDistrictsFromLabel(districtLabelSelected).length > 0 && (
				<ul className="absolute top-[100%] left-0 max-h-[260px] w-full overflow-scroll rounded-[16px] border bg-white text-left">
					{getElectoralDistrictsFromLabel(districtLabelSelected).map(
						(option, index) => (
							<li
								key={index}
								className="hover:bg-gray1 relative border-b px-[24px] py-[16px] last:border-0 hover:cursor-pointer hover:bg-[#9A9A9A]"
								onClick={() => {}}
							>
								<p className="font-bold">
									{option.province} เชตเลือกตั้งที่{' '}
									{option.electoralDistrictNumber}
								</p>
								<ul className="list-inside list-disc">
									{option.districts.map((d, index) => (
										<li className="ml-[8px]" key={`d-${index}`}>
											อำเภอ{d.name} ({d.subDistricts.length} ตำบล)
										</li>
									))}
								</ul>
							</li>
						),
					)}
				</ul>
			)}
		</div>
	);
}
