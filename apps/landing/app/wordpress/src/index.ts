import { createPostsFetcher } from './post-fetcher';
import type { Post, SiteConfig } from './post-fetcher';

const weVisConfig: SiteConfig = {
	apiRoot: 'https://wevis.info/wp-json/wp/v2',
	mediaTargetSize: 'small-thumb',
};

export type { Post };

export const fetchWeVisPosts = createPostsFetcher(weVisConfig);
