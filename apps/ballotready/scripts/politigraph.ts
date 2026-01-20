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

export async function getPeopleWithPreviousPositionCount() {
	const { people } = await query<{
		people: {
			id: string;
			image: string | null;
			name: string;
			membershipsConnection: {
				totalCount: number;
			};
		}[];
	}>(
		`query People($where: PersonMembershipsConnectionWhere) {
      people {
        id
        name
        image
        membershipsConnection(where: $where) {
          totalCount
        }
      }
    }`,
		{
			where: {
				node: {
					posts_SOME: {
						organizationsConnection_SOME: {
							node: {
								id_EQ: 'สภาผู้แทนราษฎร-26',
							},
						},
					},
				},
			},
		},
	);

	return people;
}
