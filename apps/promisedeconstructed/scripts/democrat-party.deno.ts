// %%
import { DOMParser } from 'jsr:@b-fuze/deno-dom';
import { stringify } from 'jsr:@std/csv';
import { fetchJson } from './fetch.ts';

interface Policy {
	link: string;
	title: {
		rendered: string;
	};
	content: {
		rendered: string;
	};
}

// %%
const policies = await fetchJson<Policy[]>(
	'https://www.democrat.or.th/wp-json/wp/v2/posts?_fields=title,link,content&per_page=100&categories=15',
);

console.log(policies.length);

// %%
const output = policies.map((p) => {
	const contentText = (
		new DOMParser().parseFromString(
			p.content.rendered.replaceAll('﻿', ''),
			'text/html',
		).textContent as string
	)
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line)
		.join('\n')
		.replaceAll('•', '-')
		.replaceAll('o ', '  - ');

	return {
		url: p.link,
		origin_text: [p.title.rendered, contentText].join('\n'),
	};
});

await Deno.writeTextFile(
	'democrat-party.csv',
	stringify(output, { columns: Object.keys(output[0]) }),
);
