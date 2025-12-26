'use client';

import { Select } from '@base-ui/react/select';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { PartyLogo } from './PartyLogo';

export const ALL_VALUE = 'all';

export interface PartySelectChoice {
	value: string;
	disabled?: boolean;
}

export interface PartySelectProps {
	className?: string;
	choices: PartySelectChoice[];
	allChoiceText: (count: number) => string;
}

export const PartySelect = ({
	className,
	choices,
	allChoiceText,
}: PartySelectProps) => {
	const [selectedValues, setSelectedValues] = useState<
		PartySelectChoice['value'][]
	>([ALL_VALUE]);

	const handleSelectChange = (values: PartySelectChoice['value'][]) => {
		if (values.includes(ALL_VALUE) && !selectedValues.includes(ALL_VALUE)) {
			// All was pressed
			setSelectedValues([ALL_VALUE]);
			return;
		}
		if (values.includes(ALL_VALUE) && values.length > 1) {
			// All was pressed and other values are selected
			setSelectedValues(values.filter((value) => value !== ALL_VALUE));
			return;
		}
		setSelectedValues(values);
	};

	const allChoiceLabel = useMemo(
		() => allChoiceText(choices.filter((choice) => !choice.disabled).length),
		[allChoiceText, choices],
	);

	const formatSelectValue = (selectedValues: PartySelectChoice['value'][]) =>
		selectedValues.length === 0 ? (
			<span className="text-gray-2">ยังไม่ได้เลือกพรรค</span>
		) : selectedValues.length === 1 && selectedValues[0] === ALL_VALUE ? (
			<span>{allChoiceLabel}</span>
		) : (
			<span className="flex items-center">
				{selectedValues.length === 1 && (
					<PartyLogo
						party={selectedValues[0]}
						size={24}
						className="mr-2 shrink-0 rounded-full border border-black"
					/>
				)}
				{choices.find((choice) => selectedValues.includes(choice.value))?.value}
				{selectedValues.length > 1 && `+${selectedValues.length - 1}`}
			</span>
		);

	return (
		<Select.Root
			value={selectedValues}
			onValueChange={handleSelectChange}
			multiple
		>
			<Select.Trigger
				className={`text-b4 hover:border-green-1 focus-visible:border-green-1 group/select-trigger flex h-11 min-w-65 items-center gap-2 rounded-full border-2 border-black bg-white pr-4 pl-6 font-bold outline-none ${className}`}
			>
				<Select.Value>{formatSelectValue}</Select.Value>
				<Select.Icon className="group-hover/select-trigger:text-green-1 group-focus-visible/select-trigger:text-green-1 ml-auto data-popup-open:rotate-180">
					<svg
						className="size-10"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 40 40"
					>
						<path
							fill="currentColor"
							d="M19.32 26.48c-.518.017-.941-.223-1.172-.41l-.609-.75-.293-.48-.293-.492a2.151 2.151 0 00-.422-.516l-.843-.75a2.917 2.917 0 00-.645-.434l-1.102-.539a3.082 3.082 0 01-1.488-1.57l-.469-1.078c-.018-.044-.039-.07-.105-.105l-.527-.294-.528-.28a3.3 3.3 0 01-1.418-1.489l-.492-1.055a1.42 1.42 0 00-.328-.445l-.422-.375-.422-.387a3.778 3.778 0 01-.504-.539 2.014 2.014 0 01-.258-.469 1.65 1.65 0 01-.035-1.043l.035-.14.082-.258.047-.047c.084-.252.205-.495.422-.68a1.497 1.497 0 012.11.176l.843.985-.199.28.317.282c.425.389.771.85 1.02 1.371l.491 1.055c.026.054.066.093.153.14l.527.294.527.28c.64.35 1.128.883 1.418 1.56l.469 1.078c.005.012.01.02.012.023 0 0 .017.014.058.035l.551.281.54.27c.476.236.921.52 1.312.867l.422.375.421.387c.399.354.736.76 1.008 1.218l.047.082.363-.433c.39-.45.861-.808 1.395-1.066l.562-.258.551-.27c.017-.008.032-.009.035-.012l.211-.562.211-.55a3.021 3.021 0 011.5-1.63l.551-.27.375-.175.059-.54.07-.667c.05-.44.206-.897.516-1.3.312-.408.72-.676 1.148-.833l.61-.223.562-.199c-.035.019-.024.017.023-.035.064-.072.162-.213.282-.457l.48-.996.082-.164.129-.14.059-.083a1.509 1.509 0 012.12-.176c.56.476.658 1.26.305 1.875l-.48.997c-.381.78-.972 1.618-1.922 1.968l-.61.223-.35.14-.048.41-.082.68-.14.645a2.56 2.56 0 01-1.313 1.465l-.55.27-.54.28-.035.012v.012l-.223.55-.21.552a3.016 3.016 0 01-1.524 1.628l-1.102.54a1.328 1.328 0 00-.433.316l-.375.434-.363.421c-.15.174-.313.346-.48.493a2.4 2.4 0 01-.704.433l-.211.094-.21.082-.552.105z"
						/>
					</svg>
				</Select.Icon>
			</Select.Trigger>
			<Select.Portal>
				<Select.Positioner
					alignItemWithTrigger={false}
					arrowPadding={0}
					sideOffset={8}
					collisionAvoidance={{
						side: 'flip',
						align: 'shift',
					}}
					collisionPadding={0}
				>
					<Select.Popup className="bg-bg-2 w-fit max-w-(--available-width) min-w-(--anchor-width) rounded-2xl border-2 border-black px-4">
						<Select.Item
							className="text-b4 group/select-item flex items-center gap-2 border-b border-b-black py-4 select-none last:border-b-0 data-disabled:opacity-30"
							value={ALL_VALUE}
						>
							<div className="size-5 rounded-sm border border-black p-px group-data-selected/select-item:bg-black">
								<Select.ItemIndicator>
									<Image
										src="/promisedeconstructed/images/check.svg"
										alt=""
										width={16}
										height={16}
										draggable={false}
									/>
								</Select.ItemIndicator>
							</div>
							<Select.ItemText>{allChoiceLabel}</Select.ItemText>
						</Select.Item>
						{choices.map((choice) => (
							<Select.Item
								key={choice.value}
								className="text-b4 group/select-item flex items-center gap-2 border-b border-b-black py-4 select-none last:border-b-0 data-disabled:opacity-30"
								value={choice.value}
								disabled={choice?.disabled}
							>
								<div className="size-5 rounded-sm border border-black p-px group-data-selected/select-item:bg-black">
									<Select.ItemIndicator>
										<Image
											src="/promisedeconstructed/images/check.svg"
											alt=""
											width={16}
											height={16}
											draggable={false}
										/>
									</Select.ItemIndicator>
								</div>
								<PartyLogo
									party={choice.value}
									size={24}
									className="shrink-0 rounded-full border border-black"
								/>
								<Select.ItemText>พรรค{choice.value}</Select.ItemText>
							</Select.Item>
						))}
					</Select.Popup>
				</Select.Positioner>
			</Select.Portal>
		</Select.Root>
	);
};
