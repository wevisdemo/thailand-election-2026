import ReactMarkdown from 'react-markdown';

export const Markdown = ({ content }: { content: string }) => {
	return (
		<ReactMarkdown
			remarkRehypeOptions={{
				handlers: {
					emphasis(state, node) {
						return {
							type: 'element',
							tagName: 'span',
							properties: { className: 'extendsion' },
							children: state.all(node),
						};
					},
				},
			}}
		>
			{content}
		</ReactMarkdown>
	);
};
