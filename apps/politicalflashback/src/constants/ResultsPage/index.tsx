'use client';
import React, { useRef } from 'react';
import { useTopicStore } from '@/src/stores/topicStore';
import dayjs from 'dayjs';
import th from 'dayjs/locale/th';
import Image from 'next/image';
import Button from '@/src/components/Button';

import { toPng } from 'html-to-image';
dayjs.locale(th);

const ResultsPage = () => {
	const { selectedTopics } = useTopicStore();

	const visibleCardRef = useRef<HTMLDivElement>(null);

	const handleExport = async (
		cardRef: React.RefObject<HTMLDivElement | null>,
	) => {
		if (!cardRef.current) return;

		await document.fonts.ready;

		// Wait for all images to load
		const images = cardRef.current.querySelectorAll('img');
		await Promise.all(
			Array.from(images).map(
				(img) =>
					new Promise((resolve) => {
						if (img.complete) {
							resolve(true);
						} else {
							img.onload = () => resolve(true);
							img.onerror = () => resolve(true);
						}
					}),
			),
		);

		// Small delay to ensure rendering is complete
		await new Promise((resolve) => setTimeout(resolve, 100));

		const node = cardRef.current;
		const rect = node.getBoundingClientRect();

		// Suppress console errors for CORS issues with external fonts
		const originalError = console.error;
		console.error = (...args: unknown[]) => {
			if (
				typeof args[0] === 'string' &&
				(args[0].includes('cssRules') ||
					args[0].includes('SecurityError') ||
					args[0].includes('Cannot access rules'))
			) {
				return; // Suppress CORS font errors
			}
			originalError.apply(console, args);
		};

		try {
			const dataUrl = await toPng(node, {
				width: 500,
				height: rect.height,
				backgroundColor: '#FBF8F4',
				pixelRatio: 2,
				cacheBust: true,
				filter: (node) => {
					if ((node as HTMLElement).tagName === 'LINK') return false;
					return true;
				},
			});

			const link = document.createElement('a');
			link.download = `political-flashback-${dayjs().format('YYYY-MM-DD-HHmm')}.png`;
			link.href = dataUrl;
			link.click();
		} finally {
			// Restore original console.error
			console.error = originalError;
		}
	};

	return (
		<div className="bg-green-3 flex h-full min-h-screen flex-col justify-between">
			<div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center gap-6 px-4 py-10">
				<div className="flex flex-col items-center justify-center text-center">
					<p className="text-b4 font-ibmplex">สรุปผล</p>
					<p className="text-h4 font-kondolar font-black">
						ประเด็นสุดพีคของฉัน
					</p>
					<p className="text-h8 font-sriracha text-purple-1">
						เลื่อนต่อไปเพื่อดูประเด็นร้อนจากคนอื่นๆ
					</p>
				</div>
				<div className="w-full max-w-[540px] rounded-2xl border-2 border-black">
					<div
						ref={visibleCardRef}
						className="bg-pattern flex flex-col items-center justify-center rounded-2xl px-6 py-14 text-center"
					>
						<div className="flex w-full flex-col items-center justify-center gap-4">
							<div className="bg-white px-2 py-1">
								<p className="text-b5 font-kondolar">
									{dayjs().format('DD MMM YY HH:mm')}
								</p>
							</div>
							<div className="bg-green-3 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-black">
								<div className="flex flex-col items-center justify-center gap-2 py-10">
									<p className="text-h9 font-sriracha text-purple-1">
										Political Flashbacks
									</p>
									<p className="font-kondolar text-h5 font-bold">
										ระลึกชาติ การเมืองไทย
									</p>
								</div>
								<div className="bg-purple-1 flex w-full items-center justify-center gap-2 border-t-2 border-b-2 border-black p-4">
									<Image
										src="/politicalflashback/icon/heart.svg"
										alt="Remove"
										width={14}
										height={14}
										className="brightness-0 invert"
									/>
									<p className="text-h11 font-sriracha text-white">
										Top 5 ประเด็นสุดพีคของฉัน
									</p>
								</div>
								<div className="flex w-full flex-col items-center justify-center rounded-b-2xl bg-white">
									{selectedTopics.slice(0, 5).map((topic, index) => (
										<div
											key={topic.id}
											className={`flex w-full items-center justify-start gap-2 border-black p-6 ${index === 0 ? 'border-t-0!' : 'border-t-2'}`}
										>
											<div className="bg-purple-3 flex h-8 w-8 items-center justify-center rounded-full">
												<p className="text-h11 font-kondolar font-bold text-black">
													{index + 1}
												</p>
											</div>
											<p
												className={`font-kondolar font-bold text-black ${index === 0 ? 'text-h7' : 'text-h9'}`}
											>
												#{topic.label}
											</p>
										</div>
									))}
								</div>
							</div>
							<div className="bg-[#FBF8F4] px-2 py-1">
								<Image
									src="/politicalflashback/img/export-logo.svg"
									alt="Remove"
									width={28}
									height={28}
									className="h-auto w-40"
								/>
							</div>
						</div>
					</div>
				</div>

				<Button
					onClick={() => handleExport(visibleCardRef)}
					className="typo-h9 font-kondolar bg-purple-1 border-purple-1 flex items-center justify-between gap-2 rounded-full font-bold text-white"
				>
					<Image
						src="/politicalflashback/icon/arrow-right.svg"
						alt="arrow-right"
						width={31}
						height={20}
						className=""
					/>
					<p className="">บันทึกรูป</p>
				</Button>
			</div>
		</div>
	);
};

export default ResultsPage;
