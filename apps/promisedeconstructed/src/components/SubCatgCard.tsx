import Link from 'next/link';
import { PartyLogo } from './PartyLogo';

export interface SubCatgCardProps {
	category: string;
	promiseCount: number;
	parties: string[];
	href: string;
}

export const SubCatgCard = ({
	href,
	category,
	promiseCount,
	parties,
}: SubCatgCardProps) => {
	return (
		<Link
			href={href}
			className="hover:bg-green-2 focus:bg-green-2 bg-green-3 flex h-[120px] w-40 flex-col overflow-hidden rounded-[10px] select-none md:h-[180px] md:w-[200px]"
		>
			<div className="text-b5 text-trim flex min-h-0 flex-1 items-center justify-center font-bold">
				<span className="text-box-cap">{category}</span>
			</div>
			<div className="text-gray-3 text-b6 flex items-center justify-center gap-1 bg-black p-2 pt-1">
				<span className="font-bold">{promiseCount}</span> สัญญา จาก{' '}
				<div className="relative z-0 flex -space-x-[3px]">
					{parties.map((party, i) => (
						<PartyLogo
							key={party}
							className="size-[13px] rounded-full border border-black md:size-[19px]"
							party={party}
							size={13}
							style={{ zIndex: parties.length - i }}
						/>
					))}
				</div>
			</div>
		</Link>
	);
};
