import axios from 'axios';

import type { WP_REST_API_Post, WP_REST_API_Attachment } from 'wp-types';

export interface Post {
	id: number;
	title: string;
	image: string;
	date: string;
	link: string;
}

type MediaSizes = {
	[size: string]: {
		file: string;
		width: number;
		height: number;
		mime_type: string;
		source_url: string;
	};
};

type URLParamaters = {
	[key: string]: string | number;
};

export interface SiteConfig {
	apiRoot: string;
	mediaTargetSize: string;
}

export interface PostsConfig {
	limit?: number;
	/**
	 * Tag Id can be retrieved from https://wevis.info/wp-json/wp/v2/tags?search=เลือกตั้ง&_fields=id,name
	 */
	tagId?: number;
	categoryId?: number;
}

export const createPostsFetcher =
	({ apiRoot, mediaTargetSize }: SiteConfig) =>
	async ({ limit = 6, tagId, categoryId }: PostsConfig = {}): Promise<
		Post[]
	> => {
		const fetchApi = async <T>(
			endpoint: string,
			params?: URLParamaters,
		): Promise<T> => {
			const res = await axios.get<T>(apiRoot + endpoint, { params });
			return await res.data;
		};

		const posts = await fetchApi<WP_REST_API_Post[]>('/posts', {
			tags: tagId ?? '',
			categories: categoryId ?? '',
			_embed: 'wp:featuredmedia',
			_fields:
				'id,title,link,date,tags,_links.wp:featuredmedia,_embedded.wp:featuredmedia',
			per_page: limit,
		});

		return posts.map<Post>(({ id, title, link, date, _embedded }) => {
			const [media] = _embedded?.[
				'wp:featuredmedia'
			] as WP_REST_API_Attachment[];

			return {
				id,
				title: title.rendered,
				link,
				date: new Date(date).toLocaleDateString('th-TH', {
					dateStyle: 'long',
				}),
				image: (media.media_details?.sizes as MediaSizes)[mediaTargetSize]
					.source_url,
			};
		});
	};
