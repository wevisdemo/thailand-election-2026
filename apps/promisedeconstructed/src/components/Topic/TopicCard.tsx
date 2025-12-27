import { NO_PARTY } from '@/constants/sheet';
import { TOPICS } from '@/constants/topic';
import { TopicData } from '@/utils/data';
import Link from 'next/link';
import { PartyLogo } from '../PartyLogo';
import { Markdown } from './Markdown';
import { TopicCardSection } from './TopicCardSection';

export interface TopicCardProps {
	topicData: TopicData['data'][number];
}

export const TopicCard = ({ topicData }: TopicCardProps) => {
	return (
		<article className="bg-bg flex h-[90svh] w-[280px] flex-col overflow-hidden rounded-[10px] md:w-[320px]">
			<header className="text-h7 font-kondolar flex items-center justify-center gap-2.5 bg-black py-2.5 font-bold text-white">
				<PartyLogo
					className="rounded-full"
					size={45}
					party={topicData.party || NO_PARTY}
				/>
				<span className="text-box-cap">{topicData.party}</span>
			</header>
			<div
				className="text-b4 mx-5 flex min-h-0 flex-1 flex-col gap-5 overflow-x-hidden overflow-y-auto py-2.5"
				style={{ scrollbarWidth: 'none' }}
			>
				{TOPICS.map((topic) => {
					const content = topicData[topic]?.trim();
					return (
						<TopicCardSection key={topic} type={topic}>
							{content && <Markdown content={content} />}
						</TopicCardSection>
					);
				})}
			</div>
			<footer className="gap-5 p-5 pt-0">
				<div className="border-t-gray-3 flex flex-col items-end border-t pt-2.5">
					<Link
						className="text-b6 text-purple-1 flex items-center gap-[5px] py-1 underline"
						href={topicData.url || '#'}
						target="_blank"
						rel="nofollow noopener noreferrer"
					>
						<span className="text-box-cap">ดูข้อความต้นฉบับ</span>
						<svg
							className="size-5 shrink-0"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								fill="currentColor"
								d="M15.24 5.016a.757.757 0 00.448.216.757.757 0 00.228-.013c.08-.016.136-.046.153-.054a.666.666 0 00.07-.037l-.107.083-.182.14-.179.138c.007-.006-.018.018-.058.116l-.232.563a2.22 2.22 0 01-.476.725l-.195.203-.199.199a1.848 1.848 0 01-.861.48l-.63.166-.004-.004-.116.232-.141.257c-.085.159-.16.325-.236.493l-.249.547c-.164.36-.448.624-.812.77l-.282.117-.286.112a.253.253 0 00-.12.087l-.331.464c-.161.225-.356.418-.585.575l-.472.324a1.984 1.984 0 00-.31.269l-.39.406a3.38 3.38 0 01-.555.464l-.473.323c-.101.069-.189.15-.265.24l-.364.431c-.07.084-.13.185-.183.307l-.24.555c-.112.261-.265.503-.46.709l-.39.406c-.216.227-.53.425-.865.6l-.381.2a.745.745 0 01-1.04-.013.75.75 0 010-1.06l.153-.154.1-.05.476-.252c.297-.156.43-.263.472-.307l.39-.406a.884.884 0 00.161-.261l.24-.555c.107-.249.247-.48.419-.684l.365-.43c.166-.198.357-.37.571-.515l.473-.323c.114-.077.219-.165.31-.26l.39-.407c.165-.173.348-.327.547-.464l.236-.161.232-.166a.871.871 0 00.22-.211l.331-.465c.2-.28.467-.479.779-.604l.563-.232h.009l.248-.547c.09-.196.187-.39.286-.576l.274-.522.174-.257c.198-.231.462-.38.754-.456l.315-.083.319-.079a.35.35 0 00.165-.082l.2-.2.194-.202a.716.716 0 00.153-.236l.232-.564c.111-.271.28-.537.535-.733l.364-.282c.063-.048.116-.094.158-.124.018-.013.045-.032.074-.05.012-.007.052-.028.1-.05.02-.009.08-.037.161-.054a.754.754 0 01.684.203l.456.456-.373.522c-.023.032-.038.07-.066.1l-.07.07-.59-.497-.413.414z"
							/>
							<path
								fill="currentColor"
								d="M16.96 6.703l-.034.375a1.67 1.67 0 00-.006.258l.023.375c.013.208-.005.415-.058.615l-.053.188-.047.187c-.024.09-.043.178-.053.264l-.023.187-.018.17.047.574.012.1a.74.74 0 01-.44.727l-.07.082h-.386a.776.776 0 01-.616-.31.824.824 0 01-.158-.388c-.018-.145.005-.279.018-.345l.058-.305c.015-.078.035-.172.047-.281l.018-.188.023-.187a3.32 3.32 0 01.088-.487l.053-.187.047-.188a.427.427 0 00.017-.134l-.023-.375c-.01-.164-.01-.329.006-.492l.035-.375a.446.446 0 00-.006-.141l-.082-.375a7.386 7.386 0 01-.082-.422l-.03-.188-.005-.046c-.017-.008-.038-.015-.059-.024l-.375-.164a2.282 2.282 0 00-.281-.105l-.188-.053-.175-.059-.176.053-.188.047-.38.094-.375.093a1.456 1.456 0 01-.768-.017l-.188-.053-.129-.047-.146.059-.188.07c-.321.12-.664.09-.937.03l-.252-.065h-.07a.75.75 0 01-.686-.809.75.75 0 01.803-.691l.1.012h.052l.047.011.328.07a.924.924 0 00.13.024l.152-.058.187-.07c.272-.101.56-.113.844-.03l.187.053.182.058.176-.047.187-.046c.123-.03.247-.063.37-.094l.187-.047.187-.053c.257-.065.52-.056.774.018l.375.105c.158.047.315.108.469.176l.374.164c.12.053.27.126.381.205l.065.047.064.041.211.223c.05.074.086.144.106.193.043.109.067.22.082.31l.058.376c.018.11.04.223.065.334l.082.375c.043.198.054.4.035.603z"
							/>
						</svg>
					</Link>
				</div>
			</footer>
		</article>
	);
};
