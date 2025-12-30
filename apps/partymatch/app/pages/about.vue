<script setup>
import {
	ElectionNavbar,
	ElectionButton,
	ElectionSharer,
	ElectionAboutActions,
	ElectionFooter,
} from '@election/ui/vue';
</script>

<template>
	<div class="flex flex-col gap-8">
		<ElectionNavbar />
		<h1 class="text-h3 font-kondolar text-center font-bold">
			เกี่ยวกับโครงการ
		</h1>

		<div class="section gap-2">
			<h2 class="text-h5 font-kondolar font-bold">เป้าหมาย</h2>
			<p>
				ตลอดระยะเวลา 3 ปี นับแต่การเลือกตั้งในปี 2566 สมาชิกสภาผู้แทนราษฎร (สส.)
				ในฐานะผู้แทนที่เราเลือกไปทำงานในรัฐสภา
				ได้ผลักดันร่างกฎหมายและนโยบายที่กระทบกับชีวิตของเราโดยตรง
				โดยผู้แทนเหล่านี้ตัดสินใจลงมติเหล่านั้นจาก ‘มติพรรค’ ที่ตัวเองสังกัด
				WeVis จึงได้รวบรวมข้อมูลการลงมติของสมาชิกรัฐสภาในโปรเจกต์
				<a href="https://parliamentwatch.wevis.info/">Parliament Watch</a>
				เพื่อให้ประชาชนได้ตรวจสอบการทำงานของ สส.
				และพรรคการเมืองที่เราเลือกว่าได้ทำอะไร
				และดำเนินนโยบายตามที่ได้สัญญาไว้กับประชาชนหรือไม่ ก่อนเข้าคูหาในสนาม
				#เลือกตั้ง69 WeVis ขอชวนประชาชนผู้มีสิทธิเลือกตั้ง
				ย้อนดูว่าพรรคที่คุณเคยเลือกให้ทำงานในสภาชุดก่อนหน้า ทำงานตรงใจคุณแค่ไหน
				? แม้ประเด็นที่เคัดเลือกมาให้โหวต
				อาจเป็นเพียงส่วนหนึ่งของประเด็นที่ถูกผลักดันในสภาตลอด 3 ปีที่ผ่านมา
				แต่ก็ชวนคิดว่าพรรคการเมืองที่เราเคยเลือก
				ได้ทำหน้าที่อย่างที่เราคาดหวังไว้หรือไม่ และการเลือกตั้งครั้งหน้า
				เราควรเลือก ‘ใคร’ หรือ ‘พรรคไหน’ ทำหน้าที่นี้
			</p>
			<br /><br />
			<h2 class="text-h5 font-kondolar font-bold">ที่มาของข้อมูล</h2>
			<ul class="source-list">
				<li>
					ข้อมูลการลงมติจาก
					<a class="underline" href="https://politigraph.wevis.info/"
						>ฐานข้อมูลการเมืองไทย</a
					>
					พัฒนาโดย <a class="underline" href="https://wevis.info/">WeVis</a
					> กลุ่มเทคโนโลยีเพื่อประชาสังคม ซึ่งเก็บรวบรวมและวิเคราะห์จาก<a
						class="underline"
						href="https://msbis.parliament.go.th/ewtadmin/ewt/parliament_report/main.php?filename=index"
						>ระบบฐานข้อมูลรายงานและบันทึกการประชุม</a
					>
					สำนักงานเลขาธิการสภาผู้แทนราษฎร
				</li>
				<li>
					รายละเอียดร่างกฎหมายจาก
					<a
						class="underline"
						href="https://lis.parliament.go.th/index/search_advance.php"
						>ระบบสารสนเทศด้านนิติบัญญัติ</a
					>
					สำนักงานเลขาธิการสภาผู้แทนราษฎร
				</li>
			</ul>
			<br />
			<h3 class="text-b4 font-bold">การคัดเลือกประเด็น</h3>
			<p>
				ใช้ 10
				ร่างกฎหมายที่อยู่ในความสนใจของสาธารณชนและประเด็นที่มีการถกเถียงในเวทีสาธารณะในช่วง
				3 ปีที่ผ่านมา โดยคัดมาจากข่าวสื่อกระแสหลักและรายงานจากภาคประชาสังคม
			</p>
			<br />
			<h3 class="text-b4 font-bold">ข้อจำกัดของกระบวนการ</h3>
			<p>
				มติของพรรคต่อร่างกฎหมาย 10
				ฉบับนี้ไม่สามารถแทนวิสัยทัศน์เชิงนโยบายทั้งหมดของพรรคการเมืองได้
				และข้อมูลท่าทีพรรคอาจเปลี่ยนแปลงตามสถานการณ์ทางการเมืองในอนาคต
			</p>
			<br /><br />
			<h2 class="text-h5 font-kondolar font-bold">นโยบายการนำข้อมูลไปใช้ต่อ</h2>
			<p>
				ทางทีมมีความตั้งใจที่พัฒนาทุกโปรเจกต์ให้เป็น Open Source
				และเปิดข้อมูลเป็น Open Data ภายใต้ข้อตกลงในการใช้งาน
				<a
					href="https://wevis.info/terms-of-use/"
					target="_blank"
					rel="noopener noreferrer"
					class="underline"
					>Term of Use</a
				>
				<br />
				หากมีข้อสงสัยต้องการสอบถามเพิ่มเติม
				ประสงค์แจ้งเปลี่ยนแปลงหรือเพิ่มเติมข้อมูลเพื่อความถูกต้อง
				หรือมีข้อเสนอแนะใดๆ สามารถติดต่อได้ที่ team@wevis.info
			</p>
			<br /><br />
			<h2 class="text-h5 font-kondolar font-bold">ทีมงานร่วมพัฒนา</h2>
			<div v-for="person in team" :key="person.role">
				<h3 class="text-b4 font-bold" style="margin-top: 1rem">
					{{ person.role }}
				</h3>
				<p>
					<a :href="person.link" target="_blank" rel="noopener noreferrer">
						{{ person.name }}
					</a>
				</p>
			</div>
			<br /><br />
			<h2 class="text-h5 font-kondolar font-bold">หมายเหตุ</h2>
			<p>
				<a
					href="https://punchup.world/"
					target="_blank"
					rel="noopener noreferrer"
					>Punch Up</a
				>
				และ
				<a href="https://wevis.info/" target="_blank" rel="noopener noreferrer"
					>WeVis</a
				>
				ได้รับการสนับสนุนทุนในการดำเนินงานจาก
				<a href="https://www.ned.org/" target="_blank" rel="noopener noreferrer"
					>National Endowment for Democracy (NED)</a
				>
				ซึ่งนำมาใช้เป็นต้นทุนในการรวมรวมข้อมูล ออกแบบ พัฒนาเว็บไซต์ ประสานงาน
				บริหารจัดการ ตลอดจนการจัด Meetup เพื่อดำเนินโครงการ
			</p>
		</div>
		<ElectionAboutActions
			dataUrl="https://docs.google.com/spreadsheets/d/1cg85RsWVrSTDgRsVMTsmbkABbDk8Y84kIU_SsRl_smQ/edit?usp=sharing"
		/>
		<ElectionSharer />
		<ElectionButton class="m-auto"
			><NuxtLink to="/">กลับ</NuxtLink></ElectionButton
		>
		<ElectionFooter />
	</div>
</template>

<script>
export default {
	data() {
		return {
			team: [
				{
					role: 'ออกแบบและพัฒนาเว็บไซต์',
					name: 'มนสิชา ศรีสวนแตง',
					link: 'https://monsicha.info/',
				},
				{
					role: 'ที่ปรึกษาพัฒนาเว็บไซต์',
					name: 'วิถี ภูษิตาสัย',
					link: 'https://github.com/Th1nkK1D',
				},
				{
					role: 'จัดการข้อมูล',
					name: 'ปฏิภาณ ศรีชัย',
					link: 'https://www.linkedin.com/in/patiphan-srichai-8b6916275/',
				},
				{
					role: 'สืบค้นและเรียบเรียงข้อมูล',
					name: 'อาลาวีย์ วาแม',
					link: 'https://www.linkedin.com/in/alawee-wamae/',
				},
				{
					role: 'บรรณาธิการ',
					name: 'ธนิสรา เรืองเดช',
					link: 'https://www.linkedin.com/in/thanisara-r/',
				},
				{
					role: '',
					name: 'น้ําใส ศุภวงศ์',
					link: 'https://www.instagram.com/namsaisupavong/',
				},
			],
		};
	},
};
</script>
