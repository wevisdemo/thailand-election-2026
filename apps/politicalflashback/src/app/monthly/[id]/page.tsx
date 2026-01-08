import MonthlyDetailPage from '@/src/constants/MonthlyDetail';
import { readdirSync } from 'fs';
import { join } from 'path';

export async function generateStaticParams() {
	// Read all JSON files from the monthly-view-by-month directory
	const monthlyDir = join(process.cwd(), 'public', 'monthly-view-by-month');

	try {
		const files = readdirSync(monthlyDir);

		// Filter for JSON files and extract IDs (filename without .json extension)
		const params = files
			.filter((file) => file.endsWith('.json'))
			.map((file) => ({
				id: file.replace('.json', ''),
			}));

		return params;
	} catch (error) {
		console.error('Failed to read monthly-view-by-month directory:', error);
		return [];
	}
}

export default function MonthlyDetail() {
	return <MonthlyDetailPage />;
}
