import dayjs from 'dayjs';
import th from 'dayjs/locale/th';
dayjs.locale(th);
import React from 'react';
import Image from 'next/image';
import { Topic } from '@/src/stores/topicStore';

const ExportCard = ({ selectedTopics }: { selectedTopics: Topic[] }) => {
	return (
		<div className="bg-pattern flex w-[540px] flex-col items-center justify-center rounded-2xl px-6 py-14 text-center">
			<div className="flex w-full flex-col items-center justify-center gap-4">
				<div className="bg-white px-2 py-1">
					<p className="text-b5 font-kondolar">
						{dayjs().format('DD MMM YY HH:mm')}
					</p>
				</div>
				<div className="bg-green-3 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-black">
					<div className="flex flex-col items-center justify-center gap-2 py-10">
						<p className="text-h6 font-sriracha text-purple-1">
							Political Flashbacks
						</p>
						<p className="font-kondolar text-[40px] font-bold">
							ระลึกชาติ การเมืองไทย
						</p>
					</div>
					<div className="bg-purple-1 flex w-full items-center justify-center gap-2 border-t-2 border-b-2 border-black p-4">
						<Image
							src="/politicalflashback/icon/heart.svg"
							alt="Remove"
							width={28}
							height={28}
							className="brightness-0 invert"
						/>
						<p className="text-h7 font-sriracha text-white">
							Top 5 ประเด็นสุดพีคของฉัน
						</p>
					</div>
					<div className="flex w-full flex-col items-center justify-center rounded-b-2xl bg-white">
						{selectedTopics.map((topic, index) => (
							<div
								key={topic.id}
								className={`flex w-full items-center justify-start gap-2 border-black p-6 ${index === 0 ? 'border-t-0!' : 'border-t-2'}`}
							>
								<div className="bg-purple-3 flex h-12 w-12 items-center justify-center rounded-full">
									<p className="text-h6 font-kondolar font-bold text-black">
										{index + 1}
									</p>
								</div>
								<p
									className={`font-kondolar font-bold text-black ${index === 0 ? 'text-h5' : 'text-h6'}`}
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
						className="h-auto w-72"
					/>
				</div>
			</div>
		</div>
	);
};

export default ExportCard;
