import { createPostsFetcher } from './post-fetcher';
import type { Post, SiteConfig } from './post-fetcher';

const weVisConfig: SiteConfig = {
	apiRoot: 'https://wevis.info/wp-json/wp/v2',
	electionTagId: 149, // https://wevis.info/wp-json/wp/v2/tags?search=เลือกตั้ง
	mediaTargetSize: 'small-thumb',
};

export type { Post };

export const fetchWeVisElectionPosts = createPostsFetcher(weVisConfig);
