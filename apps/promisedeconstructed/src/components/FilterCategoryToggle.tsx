'use client';

import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { useState } from 'react';

export const FilterCategoryToggle = () => {
	const [value, setValue] = useState(['category']);

	return (
		<ToggleGroup
			className="flex w-full"
			value={value}
			onValueChange={(value) => {
				if (value.length === 1) setValue(value);
			}}
		>
			<Toggle
				value="category"
				className="disabled:text-gray-2 not-disabled:hover:bg-purple-2 not-disabled:hover:border-purple-2 not-disabled:hover:active:text-green-2 typo-h9 font-kondolar data-pressed:text-green-2 flex w-full flex-row items-center justify-center gap-2 rounded-l-full border-2 border-solid border-black px-6 py-3 font-bold transition-colors not-disabled:cursor-pointer not-disabled:hover:active:border-black not-disabled:hover:active:bg-black data-pressed:border-black data-pressed:bg-black data-pressed:hover:border-black data-pressed:hover:bg-black"
			>
				หมวดหมู่
			</Toggle>
			<Toggle
				value="beneficiary"
				className="disabled:text-gray-2 not-disabled:hover:bg-purple-2 not-disabled:hover:border-purple-2 not-disabled:hover:active:text-green-2 typo-h9 font-kondolar data-pressed:text-green-2 flex w-full flex-row items-center justify-center gap-2 rounded-r-full border-2 border-solid border-black px-6 py-3 font-bold transition-colors not-disabled:cursor-pointer not-disabled:hover:active:border-black not-disabled:hover:active:bg-black data-pressed:border-black data-pressed:bg-black data-pressed:hover:border-black data-pressed:hover:bg-black"
			>
				ผู้ได้ประโยชน์
			</Toggle>
		</ToggleGroup>
	);
};
