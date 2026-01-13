// %%
import { DOMParser } from 'jsr:@b-fuze/deno-dom';
import { stringify } from 'jsr:@std/csv';
import { fetchJson } from './fetch.ts';

interface PolicySummary {
	link: string;
}

// %%
const policies = await fetchJson<PolicySummary[]>(
	'https://thaisangthai.org/wp-json/wp/v2/party-policy?per_page=100&_fields=link',
);

const policyUrls = policies.map((p) => p.link);

console.log(policyUrls.length);

// %%
const output: {
	url: string;
	origin_text: string;
}[] = [];

for (const url of policyUrls) {
	const policyHtml = await (await fetch(url)).text();

	const dom = new DOMParser().parseFromString(
		policyHtml.replaceAll('<li>', '<li> - ').replaceAll('​', ''),
		'text/html',
	);

	const title = dom.querySelector('h1').textContent.trim();
	const excerpt = dom
		.querySelector('div.elementor-widget-theme-post-excerpt > div')
		.textContent.trim();

	const descriptionDom = dom.querySelector(
		'div.elementor-element:nth-child(8)',
	);

	descriptionDom.querySelector('style').remove();

	const description = (descriptionDom.textContent as string)
		.trim()
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line)
		.join('\n');

	output.push({
		url,
		origin_text: [title, excerpt, description].join('\n'),
	});
}

await Deno.writeTextFile(
	'thaisangthai-party.csv',
	stringify(output, { columns: Object.keys(output[0]) }),
);
