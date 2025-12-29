export async function query<T>(
	query: string,
	variables: Record<string, unknown> = {},
) {
	const res = await fetch('https://politigraph.wevis.info/graphql', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	if (!res.ok) {
		throw res.statusText;
	}

	return (await res.json()).data as T;
}
