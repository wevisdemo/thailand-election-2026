import { ENTH_PARTY_LOOKUP, Party } from '@/constants/party';
import { SHEET_ID, SHEETS, Sheets } from '@/constants/sheet';
import {
	asString,
	Column,
	createTransformer,
	Object as SheethuahuaObject,
	Spreadsheet,
	StaticDecode,
} from 'sheethuahua';

const asArrayFix = createTransformer(
	(str) =>
		str
			.split(',')
			.map((s) => s.trim())
			.filter((s) => s),
	(arr) => arr.join(', '),
);

/**
 * ------------------------------
 * SHEET
 * ------------------------------
 */

const CategorySheetSchema = SheethuahuaObject({
	problemCat: Column('problem_cat', asString().optional(undefined)),
	problemSubcat: Column('problem_subcat', asArrayFix.optional(undefined)),
});
export type CategorySheetSchema = StaticDecode<typeof CategorySheetSchema>;

const PartySheetSchema = SheethuahuaObject({
	url: Column('url', asString().optional(undefined)),
	originalText: Column('origin_text', asString().optional(undefined)),
	problem: Column('problem', asString().optional(undefined)),
	action: Column('action', asString().optional(undefined)),
	outcomeIndicator: Column('outcome', asString().optional(undefined)),
	timeframe: Column('timeframe', asString().optional(undefined)),
	target: Column('target', asString().optional(undefined)),
	budget: Column('budget', asString().optional(undefined)),
	budgetSource: Column('budget_source', asString().optional(undefined)),
	problemSubcat: Column('problem_subcat', asArrayFix.optional(undefined)),
});
export type PartySheetSchema = StaticDecode<typeof PartySheetSchema>;

let cachedCategorySheet: CategorySheetSchema[];
let cachedPartySheets: Record<Sheets, PartySheetSchema[]>;
export const fetchSheets = async (): Promise<{
	categorySheet: CategorySheetSchema[];
	partySheets: Record<Sheets, PartySheetSchema[]>;
}> => {
	if (cachedCategorySheet && cachedPartySheets)
		return {
			categorySheet: cachedCategorySheet,
			partySheets: cachedPartySheets,
		};

	const sheets = Spreadsheet(SHEET_ID);
	cachedPartySheets = {} as unknown as Record<Sheets, PartySheetSchema[]>;

	await Promise.all(
		(Object.keys(SHEETS) as Sheets[]).map(async (sheetKey) => {
			if (sheetKey === 'category') {
				const categorySheet = await sheets.get(
					SHEETS[sheetKey],
					CategorySheetSchema,
				);
				cachedCategorySheet = categorySheet.filter(
					(c) => c.problemCat && c.problemSubcat,
				);
			} else {
				const partySheet = await sheets.get(SHEETS[sheetKey], PartySheetSchema);
				cachedPartySheets[sheetKey] = partySheet;
			}
		}),
	);

	return {
		categorySheet: cachedCategorySheet,
		partySheets: cachedPartySheets,
	};
};

/**
 * ------------------------------
 * DATA
 * ------------------------------
 */

export type Data = {
	partyData: Record<Party, PartySheetSchema[]>;
	categoryData: CategorySheetSchema[];
	allParties: string[];
	allSubCategories: string[];
	// dataByProblem: Record<string, Record<string, number[]>>;
	// dataByTarget: Record<string, Record<string, number[]>>;
	// dataBySubCategorySlug: Record<string, number[]>;
	// slugSubCategoriesLookup: Record<string, string>;
};

export const getUnique = (array: string[]) =>
	Array.from(new Set(array)).filter((e) => e !== '');

export const slugifySubCategory = (subCategory: string) =>
	subCategory.replace(/\s/g, '-').replace(/\//g, '-').toLocaleLowerCase();

// const createCategoryDataLookup = (
// 	array: PartySheetSchema[],
// 	group: 'problemCat' | 'targetCat',
// ) =>
// 	array.reduce(
// 		(all, current, currentIndex) => {
// 			const categories = current[group] || [MISSING_CATEGORY];
// 			const subCategory = current.problemSubcat || MISSING_CATEGORY;
// 			categories.forEach((category) => {
// 				all[category] = all[category] || {};
// 				all[category][subCategory] = all[category][subCategory] || [];
// 				all[category][subCategory].push(currentIndex);
// 			});
// 			return all;
// 		},
// 		{} as Record<string, Record<string, number[]>>,
// 	);

// const createSubCategorySlugIndexLookup = (array: PartySheetSchema[]) =>
// 	array.reduce(
// 		(all, current, currentIndex) => {
// 			const subCategory = slugifySubCategory(
// 				current.problemSubcat || MISSING_CATEGORY,
// 			);
// 			all[subCategory] = all[subCategory] || [];
// 			all[subCategory].push(currentIndex);
// 			return all;
// 		},
// 		{} as Record<string, number[]>,
// 	);

let cachedData: Data | undefined = undefined;
export const getData = async (): Promise<Data> => {
	if (cachedData) return cachedData;
	const sheets = await fetchSheets();

	const allParties = getUnique(
		Object.values(ENTH_PARTY_LOOKUP).filter((p) => p !== undefined),
	).sort((a, z) => a.localeCompare(z));
	const allSubCategories = getUnique(
		sheets.categorySheet
			.map((i) => i.problemSubcat)
			.flat()
			.filter((i) => i !== undefined),
	).sort((a, z) => a.localeCompare(z));

	cachedData = {
		partyData: sheets.partySheets,
		categoryData: sheets.categorySheet,
		allParties,
		allSubCategories,
		// dataByProblem: createCategoryDataLookup(sheet, 'problemCat'),
		// dataByTarget: createCategoryDataLookup(sheet, 'targetCat'),
		// dataBySubCategorySlug: createSubCategorySlugIndexLookup(sheet),
		// slugSubCategoriesLookup: Object.fromEntries(
		// 	subCategories.map((subCategory) => [
		// 		slugifySubCategory(subCategory),
		// 		subCategory,
		// 	]),
		// ),
	};
	return cachedData;
};

/**
 * ------------------------------
 * HOME DATA
 * ------------------------------
 */

export type HomeData = Pick<Data, 'allParties'> & {
	categoryData: {
		name: string;
		subCategories: {
			category: string;
			promiseCountByParty: Record<string, number>;
		}[];
	}[];
};

let cachedHomeData: HomeData | undefined = undefined;
export const getHomeData = async (): Promise<HomeData> => {
	if (cachedHomeData) return cachedHomeData;
	const data = await getData();

	const subCategoriesData = Object.fromEntries(
		data.allSubCategories.map((subCategory) => [
			subCategory,
			{
				category: subCategory,
				promiseCountByParty: {} as Record<string, number>,
			},
		]),
	);

	for (const party in data.partyData) {
		for (const promise of data.partyData[party as Party]) {
			if (!promise.problemSubcat) continue;
			for (const subcat of promise.problemSubcat) {
				const thaiParty = ENTH_PARTY_LOOKUP[party];
				if (!thaiParty) continue;
				// subCategoriesData[subcat] = {
				// 	...subCategoriesData[subcat],
				// 	// promiseCount: subCategoriesData[subcat].promiseCount + 1,
				// 	// parties: thaiParty
				// 	// 	? [...subCategoriesData[subcat].parties, thaiParty]
				// 	// 	: subCategoriesData[subcat].parties,
				// 	promiseCountByParty: {
				// 		...subCategoriesData[subcat].promiseCountByParty,
				// 		[thaiParty]: subCategoriesData[subcat].promiseCountByParty[
				// 			thaiParty
				// 		]
				// 			? subCategoriesData[subcat].promiseCountByParty[
				// 					thaiParty
				// 			  ] + 1
				// 			: 1,
				// 	}
				// };
				subCategoriesData[subcat].promiseCountByParty[thaiParty] =
					(subCategoriesData[subcat].promiseCountByParty[thaiParty] || 0) + 1;
			}
		}
	}

	cachedHomeData = {
		allParties: data.allParties,
		categoryData: data.categoryData.map((c) => ({
			name: c.problemCat!,
			subCategories: c.problemSubcat!.map((e) => subCategoriesData[e]),
		})),
	};
	return cachedHomeData;
};

/**
 * ------------------------------
 * TOPIC SUBCATEGORIES
 * ------------------------------
 */

// export interface TopicSubCategoryData {
// 	subCategories: string[];
// }

// let cachedTopicSubCategoryData: TopicSubCategoryData | undefined = undefined;
// export const getTopicSubCategoryData =
// 	async (): Promise<TopicSubCategoryData> => {
// 		if (cachedTopicSubCategoryData) return cachedTopicSubCategoryData;
// 		const data = await getData();

// 		cachedTopicSubCategoryData = {
// 			subCategories: data.subCategories,
// 		};
// 		return cachedTopicSubCategoryData;
// 	};

/**
 * ------------------------------
 * TOPIC DATA
 * ------------------------------
 */

// export type TopicData = Pick<Data, 'parties'> & {
// 	data: Pick<PartySheetSchema, 'party' | 'url' | Topic>[];
// 	subCategoryName: string;
// };

// const cachedTopicData: Record<string, TopicData | undefined> = {};
// export const getTopicData = async (
// 	slugSubCategory: string,
// ): Promise<TopicData> => {
// 	if (cachedTopicData[slugSubCategory]) return cachedTopicData[slugSubCategory];
// 	const data = await getData();

// 	cachedTopicData[slugSubCategory] = {
// 		subCategoryName: data.slugSubCategoriesLookup[slugSubCategory],
// 		data: data.dataBySubCategorySlug[slugSubCategory].map((index) => {
// 			// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 			const { originalText, problemSubcat, problemCat, targetCat, ...pick } =
// 				data.data[index];
// 			return pick;
// 		}),
// 		parties: data.parties,
// 	};
// 	return cachedTopicData[slugSubCategory];
// };
