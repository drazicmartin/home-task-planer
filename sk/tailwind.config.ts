
import { join } from 'path';
import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	safelist: [
		{
		  pattern: /col-span-\d/,
		},
		{
			pattern: /grid-cols-\d/
		}
	],
	theme: {
		extend: {},
	},
	plugins: [
    skeleton({
      themes: { preset: [ "crimson" ] }
    })
  ]
} satisfies Config;

export default config;
						