import MembersPage from '.';

export async function generateStaticParams() {
	return [{ slug: '1' }];
}

export default function ElectoratePage(params: Promise<{ slug: string }>) {
	return <MembersPage></MembersPage>;
}
