// %%
import { stringify } from 'jsr:@std/csv';

interface Person {
	id: string;
	name: string;
	memberships: {
		posts: {
			organizations: {
				term: number;
			}[];
		}[];
	}[];
}

const res = await fetch('https://politigraph.wevis.info/graphql', {
	method: 'POST',
	headers: { 'content-type': 'application/json' },
	body: JSON.stringify({
		query: `
      query People($membershipWhere: MembershipWhere, $peopleWhere: PersonWhere) {
        people(where: $peopleWhere) {
          id
          name
          memberships(where: $membershipWhere) {
            posts {
              organizations {
                term
              }
            }
          }
        }
      }
    `,
		variables: {
			membershipWhere: {
				posts_SOME: {
					organizations_SOME: {
						classification_EQ: 'HOUSE_OF_REPRESENTATIVE',
					},
				},
			},
			peopleWhere: {
				memberships_SOME: {
					posts_SOME: {
						organizations_SOME: {
							classification_EQ: 'HOUSE_OF_REPRESENTATIVE',
						},
					},
				},
			},
		},
	}),
});

if (!res.ok) {
	throw res.statusText;
}

const {
	data: { people },
} = (await res.json()) as { data: { people: Person[] } };

console.log(people.length);

// %%
const output = people
	.map(({ id, memberships, ...people }) => ({
		...people,
		representativeTerms: memberships
			.map((m) => m.posts[0].organizations[0].term)
			.sort((a, z) => a - z),
		url: `https://parliamentwatch.wevis.info/politicians/${id}`,
	}))
	.sort((a, z) => a.name.localeCompare(z.name));

await Deno.writeTextFile(
	'previous-reps.json',
	JSON.stringify(output, undefined, 2),
);

await Deno.writeTextFile(
	'previous-reps.csv',
	stringify(
		output.map((p) => ({
			...p,
			representativeTerms: p.representativeTerms.join(','),
		})),
		{ columns: Object.keys(output[0]) },
	),
);
