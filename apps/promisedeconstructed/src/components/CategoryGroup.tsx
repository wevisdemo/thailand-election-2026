import { Carousel } from './Carousel';
import { SubCatgCard, SubCatgCardProps } from './SubCatgCard';

export interface CategoryGroupProps {
	name: string;
	subCategories: SubCatgCardProps[];
}

export const CategoryGroup = ({ name, subCategories }: CategoryGroupProps) => {
	return (
		<article className="flex flex-col gap-2.5">
			<header className="flex items-center justify-center gap-2">
				<h2 className="text-h6 font-kondolar font-bold">{name}</h2>
				<p className="text-body4 text-green-1">{subCategories.length} ปัญหา</p>
			</header>

			<Carousel
				ariaLabel={`${name} ${subCategories.length} ปัญหา`}
				slides={subCategories.map((subCategory, index) => (
					<SubCatgCard key={index} {...subCategory} />
				))}
			/>
		</article>
	);
};
