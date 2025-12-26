import Image from 'next/image';
import Link from 'next/link';

export const BackBar = ({ children }: React.PropsWithChildren) => {
	return (
		<nav>
			<Link href="/" className="text-b6 flex items-center gap-1 p-2.5 md:p-5">
				<Image
					src="/promisedeconstructed/images/back.svg"
					alt=""
					width={12}
					height={12}
					draggable={false}
				/>
				{children}
			</Link>
		</nav>
	);
};
