'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import { PartyLogo } from './PartyLogo';

const items = [
	{ label: 'พรรคภูมิใจไทย', value: 'ภูมิใจไทย' },
	{ label: 'พรรคประชาชน', value: 'ประชาชน' },
	{ label: 'พรรคเพื่อไทย', value: 'เพื่อไทย' },
	{ label: 'พรรคพลังประชารัฐ', value: 'พลังประชารัฐ', disabled: true },
];

export const Select = () => {
	return (
		<BaseSelect.Root multiple>
			<BaseSelect.Trigger className="text-b4 hover:border-green-1 focus-visible:border-green-1 group/select-trigger flex h-11 min-w-65 items-center gap-2 rounded-full border-2 border-black bg-white pr-4 pl-6 font-bold outline-none">
				<BaseSelect.Value>
					{(selectedValues: (typeof items)[number]['value'][]) => (
						<span>
							{selectedValues.length === 0
								? 'ยังไม่ได้เลือกพรรค'
								: selectedValues.join(', ')}
						</span>
					)}
				</BaseSelect.Value>
				<BaseSelect.Icon className="group-hover/select-trigger:text-green-1 group-focus-visible/select-trigger:text-green-1 ml-auto data-popup-open:rotate-180">
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
				</BaseSelect.Icon>
			</BaseSelect.Trigger>
			<BaseSelect.Portal>
				<BaseSelect.Positioner
					alignItemWithTrigger={false}
					arrowPadding={0}
					sideOffset={8}
					collisionAvoidance={{
						side: 'flip',
						align: 'shift',
					}}
					collisionPadding={0}
				>
					<BaseSelect.Popup className="bg-bg-2 w-fit max-w-(--available-width) min-w-(--anchor-width) rounded-2xl border-2 border-black px-4">
						{items.map((item) => (
							<BaseSelect.Item
								key={item.value}
								className="text-b4 group/select-item flex items-center gap-2 border-b border-b-black py-4 select-none last:border-b-0 data-disabled:opacity-30"
								value={item.value}
								disabled={item?.disabled}
							>
								<div className="size-5 rounded-sm border border-black p-px group-data-selected/select-item:bg-black">
									<BaseSelect.ItemIndicator>
										<svg
											className="text-bg size-4"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 16 16"
										>
											<path
												fill="currentColor"
												d="M12.293 2.66a.6.6 0 01.768-.218l.089.009.157.205.015.02a.608.608 0 01.05.661.835.835 0 01-.088.133 2.38 2.38 0 01-.159.174l-.161.164-.162.165c-.089.09-.17.184-.243.282l-.135.18-.135.182a1.06 1.06 0 00-.14.252l-.083.214-.083.214c-.07.178-.155.348-.257.509l-.242.379c-.08.124-.158.25-.236.375l-.237.382a3.782 3.782 0 01-.314.434l-.146.174-.146.174a.292.292 0 00-.062.14l-.09.475a1.29 1.29 0 01-.407.727l-.174.156-.174.156c-.123.111-.249.22-.379.325l-.183.15-.183.15a.643.643 0 00-.155.18l-.224.39a.48.48 0 00-.057.202l-.023.253-.021.252c-.03.33-.182.623-.457.826l-.388.287a.872.872 0 00-.194.194l-.263.366a3.27 3.27 0 01-.23.296l-.049.053-.05.052a.634.634 0 01-.531.198.681.681 0 01-.338-.138 1.146 1.146 0 01-.24-.266l-.256-.374a.221.221 0 00-.102-.077l-.226-.1-.227-.1a1.316 1.316 0 01-.618-.545l-.23-.397a.162.162 0 00-.078-.067l-.22-.106-.219-.107c-.34-.165-.55-.5-.69-.806l-.153-.336a.6.6 0 01.934-.75l.027.03.06.067.224.49c.05.108.092.175.121.212.009.012.016.018.02.022l.42.204c.246.12.45.302.59.544l.116.198.115.199c.008.014.021.03.066.05l.226.1.226.1c.204.09.383.22.526.39l.073-.1c.127-.178.28-.33.456-.461l.194-.143.17-.127.043-.487c.022-.244.089-.48.212-.694l.224-.391c.113-.197.26-.368.436-.512l.184-.15.183-.15a9.25 9.25 0 00.336-.287l.347-.313c.014-.013.024-.026.03-.06l.046-.238.046-.238a1.49 1.49 0 01.32-.684l.146-.174.146-.174c.079-.095.15-.194.214-.297l.238-.382c.08-.13.161-.259.243-.387l.242-.38c.059-.092.11-.191.15-.298l.167-.427a2.26 2.26 0 01.297-.537l.135-.18.135-.181c.106-.143.223-.279.35-.407l.131-.134.193-.303.021-.033z"
											/>
										</svg>
									</BaseSelect.ItemIndicator>
								</div>
								<PartyLogo
									party={item.value}
									size={24}
									className="shrink-0 rounded-full border border-black bg-white"
								/>
								<BaseSelect.ItemText>{item.label}</BaseSelect.ItemText>
							</BaseSelect.Item>
						))}
					</BaseSelect.Popup>
				</BaseSelect.Positioner>
			</BaseSelect.Portal>
		</BaseSelect.Root>
	);
};
