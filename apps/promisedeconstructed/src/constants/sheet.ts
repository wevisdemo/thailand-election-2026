import { Party } from './party';

export const SHEET_ID = '1FPVal2vdz6vtjzpJxZJh80ir-ZBuhWnQlTjyTjHdCwA';
export const SHEETS: Record<Party, string> & { category: string } = {
	category: 'category',
	people: 'people_party',
	pheuthai: 'Pheuthai',
	democrat: 'Democrat',
	thaipeople: 'thaipeople',
	prachachart: 'prachachart',
	thaisangthai: 'thaisangthai',
	forthecountry: 'forthecountry',
	economic: 'economic',
	okardmai: 'okardmai',
	rakchart: 'rakchart',
	bhumjaithai: 'Bhumjaithai',
	unitednation: 'Unitednation',
	thaipakdee: 'Thaipakdee',
};
export type Sheets = keyof typeof SHEETS;

export const MISSING_CATEGORY = 'ไม่มีหมวดหมู่';
export const NO_PARTY = 'ไม่ทราบพรรค';
