// %%
import { DOMParser } from 'jsr:@b-fuze/deno-dom';
import { stringify } from 'jsr:@std/csv';
import { fetchJson } from './fetch';

interface Response {
	data: Policy[];
}

interface Policy {
	slug: string;
	content: string;
}

// %%

const res = await fetchJson<Response>(
	'https://election.bhumjaithai.com/api/cms/posts/public?categorySlug=policies&perPage=100',
);

console.log(res.data.length);

// %%
const output = res.data.map((p) => {
	const origin_text = (
		new DOMParser().parseFromString(
			p.content.replaceAll('><', '>\n<').replaceAll(' ', ''),
			'text/html',
		).textContent as string
	)
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line && line !== '.')
		.join('\n');

	return {
		url: `https://election.bhumjaithai.com/posts/${p.slug}`,
		origin_text,
	};
});

await Deno.writeTextFile(
	'bhumjaithai-party.csv',
	stringify(output, { columns: Object.keys(output[0]) }),
);
