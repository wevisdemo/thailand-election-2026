'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Image from 'next/image';
import { useCallback, useEffect, useId, useState } from 'react';

interface CarouselProps {
	ariaLabel: string;
	slides: React.ReactNode[];
	noDots?: boolean;
}

export const Carousel = ({ slides, noDots, ariaLabel }: CarouselProps) => {
	const carouselId = useId();
	const getSlideId = (index: number) => `${carouselId}-slide-${index}`;
	const slidesContainerId = `${carouselId}-slides`;

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ align: 'start', inViewThreshold: 0.1 },
		[WheelGesturesPlugin()],
	);
	const [shownSlides, setShownSlides] = useState<number[]>([]);
	const [isAllSlideShown, setIsAllSlideShown] = useState<boolean>(false);

	const onResize = useCallback(() => {
		if (!emblaApi) return;
		setIsAllSlideShown(!emblaApi.canScrollNext() && !emblaApi.canScrollPrev());
	}, [emblaApi]);

	const onSlidesInView = useCallback(() => {
		if (!emblaApi) return;
		setShownSlides(emblaApi.slidesInView());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;

		onResize();
		onSlidesInView();

		const { clear } = emblaApi
			.on('reInit', onResize)
			.on('reInit', onSlidesInView)
			.on('resize', onResize)
			.on('slidesInView', onSlidesInView);

		return clear;
	}, [emblaApi, onResize, onSlidesInView, slides.length]);

	return (
		<section
			className="relative flex flex-col gap-2.5"
			aria-roledescription="carousel"
			aria-label={ariaLabel}
		>
			<div
				className="mx-auto w-auto max-w-[calc(100%-56.26px)] overflow-hidden md:max-w-[calc(100%-64px)]"
				ref={emblaRef}
			>
				<div
					id={slidesContainerId}
					className="-ml-2.5 flex touch-pan-y touch-pinch-zoom"
					aria-live="off"
				>
					{slides.map((slide, index) => (
						<div
							key={index}
							id={getSlideId(index)}
							className="max-w-full min-w-0 flex-none transform-gpu pl-2.5"
							role="tabpanel"
							aria-roledescription="slide"
							aria-label={`${index + 1} of ${slides.length}`}
						>
							{slide}
						</div>
					))}
				</div>
			</div>

			<button
				className={`absolute left-0 -translate-y-1/2 ${noDots ? 'top-1/2' : 'top-[calc(50%-9px)]'} ${isAllSlideShown ? 'hidden' : ''}`}
				type="button"
				onClick={() => emblaApi?.scrollPrev()}
				aria-label="ก่อนหน้า"
				aria-controls={slidesContainerId}
			>
				<Image
					className="h-8 w-[22px] md:h-[38px] md:w-[25px]"
					src="/promisedeconstructed/images/previous-btn.svg"
					alt="ก่อนหน้า"
					width={22}
					height={32}
					draggable={false}
				/>
			</button>
			<button
				className={`absolute right-0 -translate-y-1/2 ${noDots ? 'top-1/2' : 'top-[calc(50%-9px)]'} ${isAllSlideShown ? 'hidden' : ''}`}
				type="button"
				onClick={() => emblaApi?.scrollNext()}
				aria-label="ถัดไป"
				aria-controls={slidesContainerId}
			>
				<Image
					className="h-8 w-[22px] md:h-[38px] md:w-[25px]"
					src="/promisedeconstructed/images/next-btn.svg"
					alt="ถัดไป"
					width={22}
					height={32}
					draggable={false}
				/>
			</button>

			{!noDots && (
				<div
					className="flex gap-0.5 self-center py-0.5"
					role="tablist"
					aria-label="Slides"
				>
					{slides.map((_, index) => (
						<button
							key={index}
							type="button"
							onClick={() => emblaApi?.scrollTo(index)}
							className="bg-green-3 data-active:bg-green-1 h-1 w-2 rounded-full"
							data-active={shownSlides.includes(index) || undefined}
							role="tab"
							aria-label={`Slide ${index + 1}`}
							aria-selected={shownSlides.includes(index) || undefined}
							tabIndex={shownSlides.includes(index) ? undefined : -1}
							aria-controls={getSlideId(index)}
						/>
					))}
				</div>
			)}
		</section>
	);
};
