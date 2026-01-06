// %%
import { DOMParser } from 'jsr:@b-fuze/deno-dom';
import { stringify } from 'jsr:@std/csv';
import { fetchJson } from './fetch';

interface PolicySummary {
	id: number;
	title: string;
	ref_id: string;
	image_url: unknown;
	banner: null;
}

export interface Policy {
	id: number;
	title: string;
	description: string;
	image_url: unknown;
	ref_id: string;
	continuation_type: unknown;
	main_categories: unknown[];
	age_groups: unknown[];
	occupations: unknown[];
	sectors: unknown[];
	provinces: unknown[];
}

// %%
const policies = await fetchJson<{
	data: PolicySummary[];
}>('https://election.ptp.or.th/api/v1/policies');
const policyIds = policies.data.map((p) => p.id);

console.log(policyIds);

// %%
const output: {
	url: string;
	origin_text: string;
}[] = [];

for (const id of policyIds) {
	const policy = await fetchJson<{
		data: Policy;
	}>(`https://election.ptp.or.th/api/v1/policies/${id}`);

	output.push({
		url: `https://election.ptp.or.th/policy/${id}`,
		origin_text: (
			new DOMParser().parseFromString(
				policy.data.description
					.replaceAll('><', '>\n<')
					.replaceAll('<li>', '- ')
					.replaceAll('</li>', '')
					.replaceAll('- \n', '- '),
				'text/html',
			).textContent as string
		)
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line)
			.join('\n'),
	});
}

await Deno.writeTextFile(
	'phuethai-party.csv',
	stringify(output, { columns: Object.keys(output[0]) }),
);
