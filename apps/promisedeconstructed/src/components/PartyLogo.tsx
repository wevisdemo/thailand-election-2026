import Image from 'next/image';

interface PartyLogoProps {
	party: string;
	size?: number;
	className?: string;
	alt?: string;
}

export const PartyLogo = ({
	party,
	alt = '',
	className,
	size = 100,
}: PartyLogoProps) => {
	return (
		<Image
			className={className}
			src={`https://politigraph.wevis.info/assets/organizations/political-parties/${party}.webp`}
			alt={alt}
			width={size}
			height={size}
		/>
	);
};
