import Image from 'next/image';

interface FireRatingProps {
	value: number;
	maxFires?: number;
	className?: string;
}

/**
 * FireRating component displays up to 5 fire icons based on a value
 * Direct mapping: value 1 = 1 fire, value 2 = 2 fires, value 3 = 3 fires, etc.
 * @param value - The number of fires to display (1-5, clamped to maxFires)
 * @param maxFires - Maximum number of fires to display (default: 5)
 * @param className - Optional additional CSS classes
 */
const FireRating = ({
	value,
	maxFires = 5,
	className = '',
}: FireRatingProps) => {
	// Direct 1:1 mapping: value 1 = fire 1, value 2 = fire 2, etc.
	const fireCount = Math.min(Math.max(1, value), maxFires);

	return (
		<div className={`flex items-center gap-0.5 ${className}`}>
			{Array.from({ length: maxFires }).map((_, index) => (
				<Image
					key={index}
					src="/politicalflashback/icon/fire.svg"
					alt="Fire"
					width={16}
					height={16}
					className={`${index < fireCount ? '' : 'opacity-20 brightness-0'}`}
				/>
			))}
		</div>
	);
};

export default FireRating;
