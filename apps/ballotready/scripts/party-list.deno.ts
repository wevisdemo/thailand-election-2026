// %%
import { getPeopleWithPreviousPositionCount } from './politigraph.ts';
import { getPartyInfo } from './sheets.ts';
import partylists from '../src/app/data/partylist_candidates.json' with { type: 'json' };
import pmCandidates from '../src/app/data/pm_candidates.json' with { type: 'json' };

// %%
const partyInfo = await getPartyInfo();

console.log(partyInfo.length);

// %%
const people = await getPeopleWithPreviousPositionCount();

console.log(people.length);

// %%
const parties = partylists.parties
	.map((p) => {
		const number = +p.candidates[0].local_image_filename.split('_')[0];
		const info = partyInfo.find((info) => info.name === p.party_name);

		const externalLinks: { label: string; url: string }[] = [];

		if (info?.policyUrl) {
			externalLinks.push({
				label: 'มีนโยบายอะไรบ้าง',
				url: info.policyUrl,
			});
		}

		if (info?.billUrl) {
			externalLinks.push({
				label: 'เคยเสนอร่างกฏหมายอะไรบ้าง',
				url: info.billUrl,
			});
		}

		if (info?.websiteUrl) {
			externalLinks.push({
				label: 'เว็บไซต์',
				url: info.websiteUrl,
			});
		}

		const partyList = p.candidates
			.map((c) => {
				const name = `${c.FirstName} ${c.LastName}`;
				const politigraphPerson = people.find((person) => person.name === name);

				return {
					name,
					number: +c.CandidateNo,
					image: c.has_local_image
						? `/ballotready/candidates/partylist/${c.local_image_filename.replace('.jpg', '.webp')}`
						: politigraphPerson?.image,
					hasPreviousPosition:
						(politigraphPerson?.membershipsConnection &&
							politigraphPerson.membershipsConnection.totalCount > 0) ??
						false,
					externalLink: politigraphPerson
						? `https://parliamentwatch.wevis.info/politicians/${politigraphPerson.id}`
						: `https://www.google.com/search?q=${encodeURI(name)}`,
				};
			})
			.sort((a, z) => a.number - z.number);

		return {
			name: p.party_name,
			number,
			image: `/ballotready/parties/${number}.webp`,
			pmCandidates:
				pmCandidates.parties
					.find(({ partyName }) => partyName === p.party_name)
					?.candidates.map(({ name }) => ({
						name,
						image:
							partyList.find((person) => name.endsWith(person.name))?.image ??
							people.find((person) => name.endsWith(person.name))?.image ??
							null,
					})) ?? [],
			partyList,
			pastGovernmentPeriods: info?.pastGovernmentPeriods ?? [],
			pastOppositionPeriods: info?.pastOppositionPeriods ?? [],
			externalLinks,
		};
	})
	.sort((a, z) => a.number - z.number);

console.log(parties.length);

// %%
await Deno.writeTextFile(
	'../src/app/data/parties.json',
	JSON.stringify(parties, undefined, 2),
);
