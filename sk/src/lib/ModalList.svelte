<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';

	import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	// Local
	let data = {
		usernames: [],
		score: 0
	};
	let initial_score: number;
	const modalStore = getModalStore();

	// Handle Form Submission
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(data);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';

	function handleAdd(value: number){
		data.score += value;
		data.score = Math.max(data.score, 0);
		data.score = Math.min(data.score, initial_score + 2);
	}

	onMount(() => {
		initial_score = $modalStore[0].meta.initial_score | 0;
		data.score = initial_score
	})
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<ListBox class="border border-surface-500 p-4 rounded-container-token" multiple={true}>
			<ListBoxItem bind:group={data.usernames} name="Drazic" value="Drazic">Drazic</ListBoxItem>
			<ListBoxItem bind:group={data.usernames} name="Delphine" value="Delphine">Delphine</ListBoxItem>
		</ListBox>
		<!-- prettier-ignore -->
        <footer class="flex justify-between items-center py-2">
			<div>
				<button class="btn-icon btn-icon-base variant-ghost-surface items-center px-2 text-xl font-semibold text-emerald-950"
					on:click={() => handleAdd(-1)}
				>
					-1
				 </button>
				<button class="btn-icon btn-icon-base variant-ghost-surface items-center px-2 text-xl font-semibold text-emerald-950">
					{data.score}
				 </button>
				 <button class="btn-icon btn-icon-base variant-ghost-surface items-center px-2 text-xl font-semibold text-emerald-950"
				 	on:click={() => handleAdd(1)}
				 >
					+1
				 </button>
			</div>
			<div>
				<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
				<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Select</button>
			</div>
        </footer>
	</div>
{/if}