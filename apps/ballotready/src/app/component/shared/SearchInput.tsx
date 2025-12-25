'use client';

interface SearchInputProps {
	placeholder?: string;
	textInput: string;
	onFocus?: () => void;
	onChangeTextInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
	placeholder,
	textInput,
	onFocus = () => {},
	onChangeTextInput,
}: SearchInputProps) {
	return (
		<div className="relative flex w-full max-w-[720px]">
			<input
				className="w-full rounded-[100px] bg-white px-[24px] py-[17px] text-[16px] outline-[1px] focus:outline-[#0EA177]"
				type="text"
				placeholder={placeholder}
				id="autocomplete"
				value={textInput}
				onChange={onChangeTextInput}
				onFocus={onFocus}
			/>
			<img
				className="absolute top-1/2 right-[0px] mr-[8px] w-[40px] -translate-y-1/2"
				src="/ballotready/search-icon.svg"
				alt="search-icon"
			/>
		</div>
	);
}
