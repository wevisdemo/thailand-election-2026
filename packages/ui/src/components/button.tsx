import { Component, Prop, Host, h } from '@stencil/core';

@Component({
	tag: 'election-button',
	styleUrl: '../styles/host.css',
	shadow: true,
})
export class ElectionButton {
	/**
	 * Disable button
	 */
	@Prop() disabled: boolean;

	render() {
		return (
			<Host>
				<button
					disabled={this.disabled}
					class="font-kondolar disabled:text-gray-2 not-disabled:hover:bg-purple-2 not-disabled:hover:border-purple-2 text-h9 border-gray-2 rounded-full border-2 border-solid px-6 py-2 font-bold not-disabled:cursor-pointer"
				>
					<slot />
				</button>
			</Host>
		);
	}
}
