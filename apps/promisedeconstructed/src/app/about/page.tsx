import { BackBar } from '@/components/BackBar';
import { ShareBlock } from '@/components/ShareBlock';
import { ElectionAboutActions } from '@election/ui/react';

export default function AboutPage() {
	return (
		<main>
			<BackBar>กลับไปหน้าแรก</BackBar>
			<h1 className="text-h3 font-kondolar flex h-[200px] items-center justify-center font-bold">
				เกี่ยวกับโครงการ
			</h1>
			<div className="about-content mx-auto flex max-w-[722px] flex-col gap-22.5 px-9 md:gap-25">
				<section className="text-b4 flex flex-col gap-3.75 md:gap-7.5">
					<h2
						id="target"
						className="text-h5 font-kondolar scroll-mt-8 font-bold md:scroll-mt-14"
					>
						เป้าหมาย
					</h2>
					<p>
						เพราะนโยบายหาเสียง เป็นเหมือน ‘คำสัญญา’
						ที่พรรคการเมืองให้ไว้กับประชาชน แน่นอนว่าสัญญาอะไรไว้
						ประชาชนก็คาดหวังให้พรรคทำได้จริง ว่าแต่ก่อนถึงวันเข้าคูหา
						อะไรที่จะทำให้เรา ‘มั่นใจ’ ในคำสัญญานั้นได้เบื้องต้นบ้าง ?
					</p>
					<p>
						ในสมัยรัฐบาลที่ผ่านมา WeVis
						เคยพยายามติดตามสถานะของคำสัญญาที่พรรคการเมืองใช้หาเสียง
						โดยหวังให้ประชาชนสามารถชื่นชมหรือทวงสัญญาจากผู้มีอำนาจได้ง่าย ๆ
						แต่ก็มีอันต้องยุติไป เมื่อพบว่าคำสัญญาจำนวนมาก{' '}
						<strong>
							มีเนื้อหาคลุมเครือ
							หรือระบุรายละเอียดกว้างเกินกว่าที่จะติดตามหรือประเมินสถานะได้อย่างไร้ข้อกังขา
						</strong>
					</p>
					<p>
						การเลือกตั้งครั้งนี้
						เราจึงอยากชวนผู้มีสิทธิออกเสียงทุกคนหันมาให้ความสนใจกับแง่มุมนี้ของคำสัญญากันมากขึ้น
						ผ่านการ <strong>ถอดโครงสร้าง</strong> คำสัญญาในการเลือกตั้งปี 2569
						ของ <strong>13 พรรคการเมือง</strong> ซึ่งจะช่วยให้{' '}
						<strong>เห็นภาพที่ ‘รอบด้าน’ ก่อนตัดสินใจ</strong> และในขณะเดียวกัน
						ก็เป็น{' '}
						<strong>
							การกระตุ้นให้พรรคการเมืองต่าง ๆ ระบุรายละเอียดของคำสัญญาให้ครบถ้วน
							เป็นรูปธรรม
						</strong>
					</p>
					<p>
						แน่นอนว่า ‘การมีอยู่’ ของรายละเอียด
						ไม่ได้สะท้อนคุณภาพของคำสัญญาได้ทั้งหมด แต่อย่างน้อย
						ข้อมูลนี้จะเป็นจุดตั้งต้นในการคิดต่อได้ว่า...
					</p>
					<ul className="ml-[2ch] flex list-outside list-disc flex-col gap-2">
						<li>
							<strong>ปัญหา:</strong> พรรคมองเห็นปัญหาอะไรบ้าง
							จับจุดได้ตรงกับสิ่งที่เราเผชิญมากน้อยแค่ไหน
						</li>
						<li>
							<strong>วิธีแก้:</strong> พรรคเสนอวิธีแก้อย่างไร เป็นรูปธรรมแค่ไหน
							เป็นวิธีคิดใหม่ หรือวิถีเดิมๆ
						</li>
						<li>
							<strong>ผลลัพธ์:</strong> ความสำเร็จมีหน้าตาแบบไหน วัดผลได้หรือไม่
						</li>
						<li>
							<strong>กรอบเวลา:</strong> สิ่งที่จะทำ เริ่มเมื่อไหร่
							ผลลัพธ์ที่จะได้เห็น ต้องรออีกนานมั้ย
						</li>
						<li>
							<strong>กลุ่มเป้าหมาย:</strong> ใครได้ประโยชน์จากคำสัญญานี้
						</li>
						<li>
							<strong>งบประมาณ:</strong> ใช้เงินเท่าไหร่
							เป็นไปได้จริงกับพื้นที่งบประมาณประเทศที่เหลืออยู่หรือไม่
						</li>
						<li>
							<strong>แหล่งงบประมาณ:</strong> เงินมาจากไหน ใช้งบของหน่วยงานใด
							ต้องกู้อีกหรือไม่
						</li>
					</ul>
					<p>
						และเมื่อการเลือกตั้งจบลง{' '}
						<strong>
							เราหวังว่าจะสามารถติดตาม ตรวจสอบ
							ทวงถามคำสัญญาเหล่านี้ได้อย่างเต็มปาก
						</strong>{' '}
						ในฐานะ Voter ผู้เลือกผู้แทนเหล่านี้ เข้าไปปฏิบัติหน้าที่ในสภา
					</p>
					<p>
						WeVis ขอขอบคุณ{' '}
						<a
							href="https://101pub.org/"
							target="_blank"
							rel="nofollow noopener noreferrer"
						>
							The101pub
						</a>{' '}
						และ{' '}
						<a
							href="https://theactive.thaipbs.or.th/"
							target="_blank"
							rel="nofollow noopener noreferrer"
						>
							The Active
						</a>{' '}
						สำหรับการให้คำปรึกษาเกี่ยวกับวิธีการจัดการข้อมูลของโครงการนี้
						ตลอดจนแนวทางสำหรับนำไปใช้ต่อ ไว้ ณ ที่นี้
					</p>
				</section>
				<section className="text-b4 flex flex-col gap-3.75 md:gap-7.5">
					<h2
						id="sources-and-limitations"
						className="text-h5 font-kondolar scroll-mt-8 font-bold md:scroll-mt-14"
					>
						ที่มาของข้อมูล & ข้อจำกัด
					</h2>
					<p>
						ข้อมูลนโยบายหาเสียงทั้งหมดสำหรับนำมาถอดโครงสร้าง นำมาจาก{' '}
						<strong>เว็บไซต์ทางการ</strong> ของแต่ละพรรคการเมือง
						ตามวันที่ที่สืบค้นข้อมูลต่อไปนี้
					</p>
					<ul className="ml-[2ch] flex list-outside list-disc flex-col gap-2">
						<li>
							5 มกราคม 2569
							<ul className="ml-[2ch] flex list-outside list-[circle] flex-col gap-1">
								<li>
									<a
										href="https://election69.peoplesparty.or.th/policy"
										target="_blank"
										rel="nofollow noopener noreferrer"
									>
										พรรคประชาชน
									</a>
								</li>
								<li>
									<a
										href="https://election.ptp.or.th/home"
										target="_blank"
										rel="nofollow noopener noreferrer"
									>
										พรรคเพื่อไทย
									</a>
								</li>
								<li>
									<a
										href="https://election.bhumjaithai.com/policies"
										target="_blank"
										rel="nofollow noopener noreferrer"
									>
										พรรคภูมิใจไทย
									</a>
								</li>
							</ul>
						</li>
						<li>
							6 มกราคม 2569
							<ul className="ml-[2ch] flex list-outside list-[circle] flex-col gap-1">
								<li>
									<a
										href="https://www.unitedthaination.or.th/policy"
										target="_blank"
										rel="nofollow noopener noreferrer"
									>
										พรรครวมไทยสร้างชาติ
									</a>
								</li>
								<li>
									<a
										href="https://www.thaipakdee.org/post/motto-politics"
										target="_blank"
										rel="nofollow noopener noreferrer"
									>
										พรรคไทยภักดี
									</a>
								</li>
							</ul>
						</li>
						<li>
							12 มกราคม 2569
							<ul className="ml-[2ch] flex list-outside list-[circle] flex-col gap-1">
								<li>
									<a
										href="https://thaipowerparty.com/policy-create-people/"
										target="_blank"
										rel="nofollow noopener noreferrer"
									>
										พรรคปวงชนไทย
									</a>
								</li>
								<li>
									<a
										href="https://prachachat.org/%e0%b8%99%e0%b9%82%e0%b8%a2%e0%b8%9a%e0%b8%b2%e0%b8%a2%e0%b8%9e%e0%b8%a3%e0%b8%a3%e0%b8%84%e0%b8%9b%e0%b8%a3%e0%b8%b0%e0%b8%8a%e0%b8%b2%e0%b8%8a%e0%b8%b2%e0%b8%95%e0%b8%b4/"
										target="_blank"
										rel="nofollow noopener noreferrer"
									>
										พรรคประชาชาติ
									</a>
								</li>
								<li>
									<a
										href="https://thaisangthai.org/party-policies/"
										target="_blank"
										rel="nofollow noopener noreferrer"
									>
										พรรคไทยสร้างไทย
									</a>
								</li>
								<li>
									<a
										href="https://www.pfc.or.th/policy/social"
										target="_blank"
										rel="nofollow noopener noreferrer"
									>
										พรรคเพื่อบ้านเมือง
									</a>
								</li>
								<li>
									<a
										href="https://www.economicparty.org/"
										target="_blank"
										rel="nofollow noopener noreferrer"
									>
										พรรคเศรษฐกิจ
									</a>
								</li>
								<li>
									<a
										href="https://okardmai.or.th/policy"
										target="_blank"
										rel="nofollow noopener noreferrer"
									>
										พรรคโอกาสใหม่
									</a>
								</li>
								<li>
									<a
										href="https://www.rakchart.or.th/"
										target="_blank"
										rel="nofollow noopener noreferrer"
									>
										พรรครักชาติ
									</a>
								</li>
							</ul>
						</li>
						<li>
							13 มกราคม 2569
							<ul className="ml-[2ch] flex list-outside list-[circle] flex-col gap-1">
								<li>
									<a
										href="https://www.democrat.or.th/%e0%b8%99%e0%b9%82%e0%b8%a2%e0%b8%9a%e0%b8%b2%e0%b8%a2/"
										target="_blank"
										rel="nofollow noopener noreferrer"
									>
										พรรคประชาธิปัตย์
									</a>
								</li>
							</ul>
						</li>
					</ul>
					<h3 className="text-h7 font-kondolar scroll-mt-8 font-bold md:scroll-mt-14">
						กระบวนการเรียบเรียงข้อมูล
					</h3>
					<ol className="ml-[2ch] flex list-outside list-decimal flex-col gap-2">
						<li>
							ถอดโครงสร้างนโยบายหาเสียงด้วย{' '}
							<strong>
								เทคโนโลยีปัญญาประดิษฐ์ (AI) โมเดล gemini-2.5-flash
							</strong>{' '}
							โดยใช้คำสั่งดังนี้
							<ul className="ml-[2ch] flex list-outside list-disc flex-col gap-2">
								<li>คุณคือผู้ช่วยวิเคราะห์นโยบายหาเสียง</li>
								<li>
									<strong>Goal:</strong> วิเคราะห์ original text
									ของนโยบายหาเสียงให้อยู่ในรูปแบบ JSON Object เดี่ยว (Single
									Object) ที่รวมทุกประเด็นไว้ใน 7 คอลัมน์
								</li>
								<li>
									<strong>Rules:</strong>{' '}
									<ol className="ml-[2ch] flex list-outside list-decimal flex-col gap-1">
										<li>
											ใช้เฉพาะข้อความที่ปรากฏจริง ห้ามแต่งเพิ่มหรือสรุปเอง
										</li>
										<li>
											หากต้องเพิ่มคำเพื่อความเข้าใจ ให้ใส่{' '}
											<em>italic markdown</em> รอบคำ/วลีที่เพิ่ม เช่น{' '}
											<em>เกษตรกร</em> มีรายได้สูงขึ้น 3 เท่า
										</li>
										<li>
											หากในช่องเดียวมีหลายข้อความที่ตรงตามคำสั่ง (เช่น หลาย
											Action) ให้ใช้ bullet list (markdown list: - Item)
										</li>
										<li>
											หากคอลัมน์ไม่มีข้อความที่ตรงตามคำสั่งใน original text
											ให้เว้นว่าง (empty string)
										</li>
									</ol>
								</li>
							</ul>
						</li>
						<li>
							ตรวจสอบข้อมูลโดยมนุษย์ และแก้ไขกรณีที่ AI ถอดโครงสร้างมาไม่ตรงตาม
							‘หัวข้อ’ และกรณีปรากฎข้อความซ้ำซ้อน
						</li>
						<li>
							ใช้ AI Gemini ช่วยจัดกลุ่มนโยบายเป็นหัวข้อใหญ่-หัวข้อย่อย
							และตรวจสอบอีกครั้งโดยมนุษย์ ก่อนนำขึ้นแสดงผลในเว็บไซต์
						</li>
					</ol>
					<h3 className="text-h7 font-kondolar scroll-mt-8 font-bold md:scroll-mt-14">
						การคัดเลือกพรรคการเมือง
					</h3>
					<p>
						13 พรรคการเมืองที่คัดเลือกมาถอดโครงสร้างเพื่อแสดงผลในเว็บไซต์นี้
						คัดเลือกจากเกณฑ์ต่อไปนี้
					</p>
					<ol className="ml-[2ch] flex list-outside list-decimal flex-col gap-2">
						<li>
							เป็นพรรคที่เข้าข่ายต่อไปนี้ <em>อย่างน้อย 1 ข้อ</em>{' '}
							<ol className="ml-[2ch] flex list-outside list-[lower-alpha] flex-col gap-1">
								<li>พรรคการเมืองที่เป็นที่จับตามองในหน้าสื่อ</li>
								<li>พรรคการเมืองที่มีผู้สมัครแบบบัญชีรายชื่อมากกว่า 30 คน</li>
								<li>พรรคการเมืองที่ก่อตั้งใหม่ในการเลือกตั้งปี 2569</li>
							</ol>
						</li>
						<li>
							เป็นพรรคการเมืองที่มีเว็บไซต์ทางการ
							และประกาศนโยบายลงในเว็บไซต์ทางการนั้น
						</li>
					</ol>
					<h3 className="text-h7 font-kondolar scroll-mt-8 font-bold md:scroll-mt-14">
						ข้อจำกัดของกระบวนการ
					</h3>
					<p>
						เนื้อหาทั้งหมดในเว็บไซต์นี้ถูกถอดโครงสร้างด้วย AI
						ซึ่งตรวจสอบโดยมนุษย์แล้ว อย่างไรก็ตาม
						ขอแนะนำให้อ่านควบคู่กับนโยบายในแหล่งข้อมูลต้นทาง
						เพื่อความแม่นยำสูงสุด
					</p>
				</section>
				<section className="text-b4 flex flex-col gap-3.75 md:gap-7.5">
					<h2
						id="policy"
						className="text-h5 font-kondolar scroll-mt-8 font-bold md:scroll-mt-14"
					>
						นโยบายการนำข้อมูลไปใช้ต่อ
					</h2>
					<p>
						ทางทีมมีความตั้งใจที่พัฒนาทุกโปรเจกต์ให้เป็น Open Source
						และเปิดข้อมูลเป็น Open Data ภายใต้ข้อตกลงในการใช้งาน{' '}
						<a
							href="https://wevis.info/terms-of-use/"
							target="_blank"
							rel="nofollow noopener noreferrer"
						>
							Term of Use
						</a>
					</p>
				</section>
				<section className="text-b4 flex flex-col gap-3.75 md:gap-7.5">
					<h2
						id="volunteers"
						className="text-h5 font-kondolar scroll-mt-8 font-bold md:scroll-mt-14"
					>
						ทีมงานร่วมพัฒนา
					</h2>
					<article className="flex flex-col gap-2.25 md:gap-2.5">
						<h3 className="font-bold">พัฒนาเว็บไซต์</h3>
						<ul>
							<li>
								<a
									href="https://rootenginear.github.io/"
									target="_blank"
									rel="nofollow noopener noreferrer"
								>
									สุเทพ จันทร์ชูผล
								</a>
							</li>
						</ul>
					</article>
					<article className="flex flex-col gap-2.25 md:gap-2.5">
						<h3 className="font-bold">ที่ปรึกษาพัฒนาเว็บไซต์</h3>
						<ul>
							<li>
								<a
									href="https://github.com/Th1nkK1D"
									target="_blank"
									rel="nofollow noopener noreferrer"
								>
									วิถี ภูษิตาสัย
								</a>
							</li>
						</ul>
					</article>
					<article className="flex flex-col gap-2.25 md:gap-2.5">
						<h3 className="font-bold">ออกแบบเว็บไซต์</h3>
						<ul>
							<li>
								<a
									href="https://www.instagram.com/namsaisupavong/"
									target="_blank"
									rel="nofollow noopener noreferrer"
								>
									น้ำใส ศุภวงศ์
								</a>
							</li>
						</ul>
					</article>
					<article className="flex flex-col gap-2.25 md:gap-2.5">
						<h3 className="font-bold">สืบค้นและเรียบเรียงข้อมูล</h3>
						<ul>
							<li>
								<a
									href="https://www.instagram.com/namsaisupavong/"
									target="_blank"
									rel="nofollow noopener noreferrer"
								>
									น้ำใส ศุภวงศ์
								</a>
							</li>
							<li>ณภัทร แต้เถา</li>
							<li>วรุตม์ อุดมรัตน์</li>
							<li>อาลาวีร์ วาแม</li>
							<li>กรกมล ศรีวัฒน์</li>
							<li>ธีธัช ธารีเวทย์</li>
						</ul>
					</article>
					<article className="flex flex-col gap-2.25 md:gap-2.5">
						<h3 className="font-bold">บรรณาธิการ</h3>
						<ul>
							<li>
								<a
									href="https://www.linkedin.com/in/thanisara-r/"
									target="_blank"
									rel="nofollow noopener noreferrer"
								>
									ธนิสรา เรืองเดช
								</a>
							</li>
							<li>
								<a
									href="https://www.instagram.com/namsaisupavong/"
									target="_blank"
									rel="nofollow noopener noreferrer"
								>
									น้ำใส ศุภวงศ์
								</a>
							</li>
						</ul>
					</article>
				</section>
				<section className="text-b4 flex flex-col gap-3.75 md:gap-7.5">
					<h2
						id="notes"
						className="text-h5 font-kondolar scroll-mt-8 font-bold md:scroll-mt-14"
					>
						หมายเหตุ
					</h2>
					<p>
						<a
							href="https://wevis.info/"
							target="_blank"
							rel="nofollow noopener noreferrer"
						>
							WeVis
						</a>{' '}
						ได้รับการสนับสนุนทุนในการดำเนินงานจาก{' '}
						<a
							href="https://www.ned.org/"
							target="_blank"
							rel="nofollow noopener noreferrer"
						>
							National Endowment for Democracy (NED)
						</a>{' '}
						และ{' '}
						<a
							href="https://www.iri.org/"
							target="_blank"
							rel="nofollow noopener noreferrer"
						>
							International Republican Institute
						</a>{' '}
						ซึ่งนำมาใช้เป็นต้นทุนในการรวมรวมข้อมูล ออกแบบ พัฒนาเว็บไซต์
						ประสานงาน บริหารจัดการ ตลอดจนการจัดประชุมเพื่อดำเนินโครงการ
					</p>
					<p>
						หากมีข้อสงสัยต้องการสอบถามเพิ่มเติม
						ประสงค์แจ้งเปลี่ยนแปลงหรือเพิ่มเติมข้อมูลเพื่อความถูกต้อง
						หรือมีข้อเสนอแนะใดๆ สามารถติดต่อได้ที่{' '}
						<strong>team@wevis.info</strong>
					</p>
				</section>
			</div>
			<div className="py-5 md:py-12.5">
				<ElectionAboutActions dataUrl="https://docs.google.com/spreadsheets/d/1FPVal2vdz6vtjzpJxZJh80ir-ZBuhWnQlTjyTjHdCwA/edit?gid=1067348450#gid=1067348450" />
			</div>
			<ShareBlock showAboutButton={false} />
		</main>
	);
}
