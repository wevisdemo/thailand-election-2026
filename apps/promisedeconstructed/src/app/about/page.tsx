import { ShareBlock } from '@/components/ShareBlock';
import { ElectionAboutActions } from '@election/ui/react';

export default function AboutPage() {
	return (
		<main>
			<h1 className="text-h3 font-kondolar flex h-[200px] items-center justify-center font-bold">
				เกี่ยวกับโครงการ
			</h1>
			<div className="mx-auto flex max-w-[722px] flex-col gap-12.5 px-9 md:gap-25">
				<section className="text-b4 flex flex-col gap-3.75 md:gap-7.5">
					<h2 className="text-h5 font-kondolar font-bold">เป้าหมาย</h2>
					<p>
						dummy text of the printing and typesetting industry. Lorem Ipsum has
						been the industry&apos;s standard dummy text ever since the 1500s,
						when an unknown printer took a galley of type and scrambled it to
						make a type specimen book. It has survived not only five centuries,
						but also the leap into electronic typesetting, remaining essentially
						unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently
						with desktop publishing software like Aldus PageMaker including
						versions of Lorem Ipsum link.
					</p>
				</section>
				<section className="text-b4 flex flex-col gap-3.75 md:gap-7.5">
					<h2 className="text-h5 font-kondolar font-bold">
						ที่มาของข้อมูล & ข้อจำกัด
					</h2>
					<p>
						dummy text of the printing and typesetting industry. Lorem Ipsum has
						been the industry&apos;s standard dummy text ever since the 1500s,
						when an unknown printer took a galley of type and scrambled it to
						make a type specimen book. It has survived not only five centuries,
						but also the leap into electronic typesetting, remaining essentially
						unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently
						with desktop publishing software like Aldus PageMaker including
						versions of Lorem Ipsum link.
					</p>
				</section>
				<section className="text-b4 flex flex-col gap-3.75 md:gap-7.5">
					<h2 className="text-h5 font-kondolar font-bold">
						อาสาสมัครร่วมพัฒนา
					</h2>
					<article className="flex flex-col gap-1.25 md:gap-2.5">
						<h3 className="font-bold">เขียนโปรแกรม</h3>
						<p>
							dummy text of the printing and typesetting industry. Lorem Ipsum
							has been the industry&apos;s standard dummy text ever since the
							1500s, when an unknown printer took a galley
						</p>
					</article>
					<article className="flex flex-col gap-1.25 md:gap-2.5">
						<h3 className="font-bold">ออกแบบ</h3>
						<p>
							dummy text of the printing and typesetting industry. Lorem Ipsum
							has been the industry&apos;s standard dummy text ever since the
							1500s, when an unknown printer took a galley
						</p>
					</article>
					<article className="flex flex-col gap-1.25 md:gap-2.5">
						<h3 className="font-bold">สืบค้นและรวบรวมข้อมูล</h3>
						<p>
							dummy text of the printing and typesetting industry. Lorem Ipsum
							has been the industry&apos;s standard dummy text ever since the
							1500s, when an unknown printer took a galley
						</p>
					</article>
					<article className="flex flex-col gap-1.25 md:gap-2.5">
						<h3 className="font-bold">บรรณาธิการ</h3>
						<p>
							dummy text of the printing and typesetting industry. Lorem Ipsum
							has been the industry&apos;s standard dummy text ever since the
							1500s, when an unknown printer took a galley
						</p>
					</article>
					<article className="flex flex-col gap-1.25 md:gap-2.5">
						<h3 className="font-bold">ประสานงานและจัดการอื่นๆ</h3>
						<p>
							dummy text of the printing and typesetting industry. Lorem Ipsum
							has been the industry&apos;s standard dummy text ever since the
							1500s, when an unknown printer took a galley
						</p>
					</article>
				</section>
			</div>
			<div className="py-5 md:py-12.5">
				<ElectionAboutActions dataUrl="#" />
			</div>
			<ShareBlock showAboutButton={false} />
		</main>
	);
}
