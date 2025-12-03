import { Component, Host, Prop, h } from '@stencil/core';

@Component({
	tag: 'election-navbar',
	styleUrl: '../styles/host.css',
	shadow: true,
})
export class MyComponent {
	/**
	 * The first name
	 */
	@Prop() first: string;

	/**
	 * The middle name
	 */
	@Prop() middle: string;

	/**
	 * The last name
	 */
	@Prop() last: string;

	private getText(): string {
		return [this.first, this.middle, this.last].join(' ');
	}

	render() {
		return (
			<Host>
				<div class="bg-purple-2 flex justify-center rounded-md p-6">
					<h1 class="font-sriracha text-h5 font-bold text-white">
						{this.getText()}
					</h1>
				</div>
			</Host>
		);
	}
}
