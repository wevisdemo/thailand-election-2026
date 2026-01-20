// %%
import { getPeopleWithPreviousPositionCount } from './politigraph.ts';
import { getPartyInfo } from './sheets.ts';
import zoneCandidates from '../src/app/data/zone_candidates.json' with { type: 'json' };
import parties from '../src/app/data/parties.json' with { type: 'json' };

console.log(parties.length);

// %%
const partyInfo = await getPartyInfo();

console.log(partyInfo.length);

// %%
const people = await getPeopleWithPreviousPositionCount();

console.log(people.length);

// %%
const candidates = zoneCandidates.zones
	.map((zone) => [
		`${zone.province_name}-${zone.zone_number}`,
		zone.candidates
			.filter((c) => c.Votable)
			.map((c) => {
				const name = `${c.FirstName} ${c.LastName}`;
				const politigraphPerson = people.find((p) => p.name === name);
				const partyPolicyUrl = partyInfo.find(
					(p) => p.name === c.PartyName,
				)?.policyUrl;

				return {
					name,
					number: +c.CandidateNo,
					image: c.has_local_image
						? `/ballotready/candidates/${c.local_image_filename.replace('.jpg', '.webp')}`
						: politigraphPerson?.image,
					age: c.Age ? +c.Age : null,
					education: c.HighestEducation,
					previousOccupation: c.Occupation,
					party: {
						name: c.PartyName,
						image: parties.find((p) => p.name === c.PartyName)?.image,
					},
					hasPreviousPosition:
						(politigraphPerson?.membershipsConnection &&
							politigraphPerson.membershipsConnection.totalCount > 0) ??
						false,
					externalLinks: [
						politigraphPerson
							? {
									label: 'ตรวจการบ้านใน ParliamentWatch',
									url: `https://parliamentwatch.wevis.info/politicians/${politigraphPerson.id}`,
								}
							: {
									label: 'ส่องประวัติใน Google',
									url: `https://www.google.com/search?q=${encodeURI(name)}`,
								},
						...(partyPolicyUrl
							? [
									{
										label: 'ส่องนโยบายพรรคที่สังกัด',
										url: partyPolicyUrl,
									},
								]
							: []),
					],
				};
			}),
	])
	.sort(([a], [z]) => a.localeCompare(z));

console.log(candidates.length);

// %%
await Deno.writeTextFile(
	'../src/app/data/district_candidates.json',
	JSON.stringify(Object.fromEntries(candidates), undefined, 2),
);
