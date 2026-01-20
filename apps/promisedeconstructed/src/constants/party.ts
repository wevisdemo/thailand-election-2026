export const ALL_PARTY_VALUE = 'all';

export type Party =
	| 'people'
	| 'pheuthai'
	| 'democrat'
	| 'thaipeople'
	| 'prachachart'
	| 'thaisangthai'
	| 'forthecountry'
	| 'economic'
	| 'okardmai'
	| 'rakchart'
	| 'bhumjaithai'
	| 'unitednation'
	| 'thaipakdee';

export const ENTH_PARTY_LOOKUP: Record<string, string | undefined> = {
	people: 'ประชาชน',
	pheuthai: 'เพื่อไทย',
	democrat: 'ประชาธิปัตย์',
	thaipeople: 'ปวงชนไทย',
	prachachart: 'ประชาชาติ',
	thaisangthai: 'ไทยสร้างไทย',
	forthecountry: 'เพื่อบ้านเมือง',
	economic: 'เศรษฐกิจ',
	okardmai: 'โอกาสใหม่',
	rakchart: 'รักชาติ',
	bhumjaithai: 'ภูมิใจไทย',
	unitednation: 'รวมไทยสร้างชาติ',
	thaipakdee: 'ไทยภักดี',
};
