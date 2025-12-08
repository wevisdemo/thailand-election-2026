import { Component, Prop, Host, h } from '@stencil/core';
import { twMerge } from 'tailwind-merge';

@Component({
	tag: 'election-button',
	styleUrl: '../styles/host.css',
	shadow: true,
})
export class ElectionButton {
	/**
	 * Disable button
	 */
	@Prop() disabled: boolean = false;

	/**
	 * Enable Compact size
	 * @default false
	 */
	@Prop() compact = false;

	/**
	 * Additional overwriting tailwind classes
	 */
	@Prop() class: string;

	render() {
		return (
			<Host>
				<button
					disabled={this.disabled}
					class={twMerge(
						'disabled:text-gray-2 not-disabled:hover:bg-purple-2 not-disabled:hover:border-purple-2 border-gray-2 not-disabled:hover:active:text-green-2 flex flex-row items-center justify-center gap-2 rounded-full border-2 border-solid transition-colors not-disabled:cursor-pointer not-disabled:hover:active:border-black not-disabled:hover:active:bg-black',
						this.compact ? 'px-4 py-2' : 'px-6 py-3',
						this.class,
					)}
				>
					<slot />
				</button>
			</Host>
		);
	}
}
