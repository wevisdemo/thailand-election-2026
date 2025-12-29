// %%
type DateString = `${number}-${number}-${number}`;

export interface Party {
	Name: string;
	Number: number;
	Image: null | string;
	Candidate: Candidate[];
	PastGovernment: boolean;
	PastOpposition: boolean;
	Policy: string;
	Promise: null | string;
	Law: null | string;
	Others: null | string;
	Website: null | string;
	PartyList: PartyList[];
}

export interface Candidate {
	Name: string;
	Image: null | string;
}

export interface PartyList {
	Name: string;
	Number: number;
	PastMP: boolean;
}

const res = await fetch(
	'https://raw.githubusercontent.com/wevisdemo/thailand-election-2023/refs/heads/main/apps/yourcandidates/data/parties.json',
);

const oldParties: Party[] = Object.values(await res.json());

console.log(oldParties.length);

// %%
const newParties = oldParties
	.filter((p) => p.Number > 0)
	.map((p) => {
		const externalLinks: { label: string; url: string }[] = [];
		const previousPositions: {
			label: string;
			from: DateString;
			to: DateString;
		}[] = [];

		if (p.Promise) {
			externalLinks.push({
				label: 'มีนโยบายอะไรบ้าง',
				url: p.Promise,
			});
		}

		if (p.Law) {
			externalLinks.push({
				label: 'เคยเสนอร่างกฏหมายอะไรบ้าง',
				url: p.Law,
			});
		}

		if (p.Website) {
			externalLinks.push({
				label: 'เว็บไซต์',
				url: p.Website,
			});
		}

		if (p.PastGovernment) {
			previousPositions.push({
				label: 'พรรคร่วมรัฐบาล',
				from: '2023-09-01',
				to: '2024-08-14',
			});
		}

		if (p.PastOpposition) {
			previousPositions.push({
				label: 'พรรคร่วมฝ่ายค้าน',
				from: '2024-09-04',
				to: '2025-12-11',
			});
		}

		return {
			name: p.Name,
			number: p.Number,
			image: p.Image,
			pmCandidates: p.Candidate.map((c) => ({
				name: c.Name,
				image: c.Image,
			})),
			partyList: p.PartyList.map((l) => ({
				name: l.Name,
				number: l.Number,
				hasPreviousPosition: l.PastMP,
			})),
			previousPositions,
			externalLinks,
		};
	});

console.log(newParties[0]);
// %%

await Deno.writeTextFile(
	'../src/app/data/parties.json',
	JSON.stringify(newParties, undefined, 2),
);
