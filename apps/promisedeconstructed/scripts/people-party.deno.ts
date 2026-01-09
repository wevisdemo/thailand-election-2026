// %%
import { DOMParser } from 'jsr:@b-fuze/deno-dom';
import { stringify } from 'jsr:@std/csv';
import { fetchJson } from './fetch.ts';

interface Response {
	policyLevel3All: PolicyLevelAll[];
	policyLevel4All: PolicyLevelAll[];
}

interface PolicyLevelAll {
	slug: string;
	title: string;
	summary: null | string;
	contentBlocks: ContentBlock[];
	parentLevel3?: unknown;
}

interface ContentBlock {
	title: string;
	content: string;
}

// %%

const data = await fetchJson<Response>(
	'https://election69.peoplesparty.or.th/data/policy.json',
);

console.log(data.policyLevel3All.length);
console.log(data.policyLevel4All.length);

// %%
const output = [...data.policyLevel3All, ...data.policyLevel4All].map((p) => {
	const origin_text = [
		p.title,
		p.summary,
		...p.contentBlocks.flatMap<string>((c) => [
			c.title,
			...new DOMParser()
				.parseFromString(c.content, 'text/html')
				.textContent.replaceAll(' ', '')
				.replaceAll('•', '-')
				.split('\n'),
		]),
	]
		.map((line) => line?.trim())
		.filter((line) => line)
		.join('\n');

	return {
		url: `https://election69.peoplesparty.or.th/policy/${'parentLevel3' in p ? 4 : 3}/${p.slug}`,
		origin_text,
	};
});

await Deno.writeTextFile(
	'people-party.csv',
	stringify(output, { columns: Object.keys(output[0]) }),
);
