// %%
import parties from '../src/app/data/parties.json' assert { type: 'json' };

export interface Person {
	Name: string;
	Number: number;
	Birthdate: null;
	Age: string;
	Education: string;
	ExOccupation: string;
	Party: string;
	Province: string;
	Zone: number;
	Image: string;
	PastMP: boolean;
	PastGovernment: boolean;
	PastOpposition: boolean;
	Invalid: boolean;
}

// %%
const output: Record<string, unknown[]> = {};

const OLD_DATA_DIR =
	'../../../../thailand-election-2023/apps/yourcandidates/data/electorals';

for await (const { name } of Deno.readDir(OLD_DATA_DIR)) {
	const data: { People: Person[] } = JSON.parse(
		await Deno.readTextFile(`${OLD_DATA_DIR}/${name}`),
	);

	output[name.replace('.json', '')] = data.People.filter((p) => !p.Invalid).map(
		(p) => {
			const party = parties.find((party) => party.name === p.Party);
			const partyPromiseUrl = party?.externalLinks.find(
				(l) => l.label === 'มีนโยบายอะไรบ้าง',
			)?.url;

			const externalLinks: { label: string; url: string }[] = [
				{ label: 'ส่องประวัติ', url: 'https://parliamentwatch.wevis.info' },
			];

			if (partyPromiseUrl) {
				externalLinks.push({
					label: 'ส่องนโยบายพรรคที่สังกัด',
					url: partyPromiseUrl,
				});
			}

			return {
				name: p.Name,
				number: p.Number,
				birthDate: p.Birthdate,
				education: p.Education,
				previousOccupation: p.ExOccupation,
				party: {
					name: p.Party,
					image: party?.image ?? null,
				},
				hasPreviousPosition: p.PastMP,
				externalLinks,
			};
		},
	);
}

console.log(Object.keys(output).length);

// %%
await Deno.writeTextFile(
	'../src/app/data/district_candidates.json',
	JSON.stringify(
		Object.fromEntries(
			Object.entries(output).sort(([a], [z]) => a.localeCompare(z)),
		),
		undefined,
		2,
	),
);
