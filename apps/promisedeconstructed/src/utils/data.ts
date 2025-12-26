import { MISSING_CATEGORY, SHEET_ID, SHEET_NAME } from '@/constants/sheet';
import {
	asString,
	Column,
	Object as SheethuahuaObject,
	Spreadsheet,
	StaticDecode,
} from 'sheethuahua';

const SheetSchema = SheethuahuaObject({
	party: Column('party', asString().optional(undefined)),
	url: Column('url', asString().optional(undefined)),
	originalText: Column('original_text', asString().optional(undefined)),
	problem: Column('problem', asString().optional(undefined)),
	action: Column('action', asString().optional(undefined)),
	outcomeIndicator: Column('outcome_indicator', asString().optional(undefined)),
	timeframe: Column('timeframe', asString().optional(undefined)),
	target: Column('target', asString().optional(undefined)),
	budget: Column('budget', asString().optional(undefined)),
	budgetSource: Column('budget_source', asString().optional(undefined)),
	problemSubcat: Column('problem_subcat', asString().optional(undefined)),
	problemCat: Column('problem_cat', asString().optional(undefined)),
	targetCat: Column('target_cat', asString().optional(undefined)),
});
export type SheetSchema = StaticDecode<typeof SheetSchema>;

export type Data = {
	data: SheetSchema[];
	parties: string[];
	subCategories: string[];
	dataByProblem: Record<string, Record<string, number[]>>;
	dataByTarget: Record<string, Record<string, number[]>>;
	dataBySubCategorySlug: Record<string, number[]>;
	slugSubCategoriesLookup: Record<string, string>;
};

export const getUnique = (array: string[]) =>
	Array.from(new Set(array)).filter((e) => e !== '');

export const slugifySubCategory = (subCategory: string) =>
	subCategory.replace(/\s/g, '-').replace(/\//g, '-').toLocaleLowerCase();

const createCategoryDataLookup = (
	array: SheetSchema[],
	group: keyof SheetSchema,
) =>
	array.reduce(
		(all, current, currentIndex) => {
			const category = current[group] || MISSING_CATEGORY;
			const subCategory = current.problemSubcat || MISSING_CATEGORY;
			all[category] = all[category] || {};
			all[category][subCategory] = all[category][subCategory] || [];
			all[category][subCategory].push(currentIndex);
			return all;
		},
		{} as Record<string, Record<string, number[]>>,
	);

const createSubCategorySlugIndexLookup = (array: SheetSchema[]) =>
	array.reduce(
		(all, current, currentIndex) => {
			const subCategory = current.problemSubcat || MISSING_CATEGORY;
			all[subCategory] = all[subCategory] || [];
			all[subCategory].push(currentIndex);
			return all;
		},
		{} as Record<string, number[]>,
	);

let cachedSheet: SheetSchema[] | undefined = undefined;

export const fetchSheet = async () => {
	if (cachedSheet) return cachedSheet;
	const sheets = Spreadsheet(SHEET_ID);
	const sheet = await sheets.get(SHEET_NAME, SheetSchema);
	cachedSheet = sheet;
	return cachedSheet;
};

let cachedData: Data | undefined = undefined;

export const fetchData = async () => {
	if (cachedData) return cachedData;
	const sheet = await fetchSheet();

	const subCategories = getUnique(
		sheet.map((item) => item.problemSubcat || ''),
	);

	cachedData = {
		data: sheet,
		parties: getUnique(sheet.map((item) => item.party || '')).sort((a, z) =>
			a.localeCompare(z),
		),
		subCategories,
		dataByProblem: createCategoryDataLookup(sheet, 'problemCat'),
		dataByTarget: createCategoryDataLookup(sheet, 'targetCat'),
		dataBySubCategorySlug: createSubCategorySlugIndexLookup(sheet),
		slugSubCategoriesLookup: Object.fromEntries(
			subCategories.map((subCategory) => [
				slugifySubCategory(subCategory),
				subCategory,
			]),
		),
	};
	return cachedData;
};
