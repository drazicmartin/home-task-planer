<script lang="ts">
    import Grid, { GridItem } from 'svelte-grid-extended';
    import { getModalStore, type ModalComponent, type ModalSettings  } from '@skeletonlabs/skeleton';

    import ModalList from "$lib/ModalList.svelte";
    import type { CustomLayoutItem } from './+page.server.js';
    import { tick } from 'svelte';

    export let data;
			
    const modalStore = getModalStore();

    const modalComponent: ModalComponent = { ref: ModalList };

    let form: HTMLFormElement;
    const formData = {
		username: '',
		task_id: '',
	};
    let selected_item;

    const default_modal: ModalSettings = {
        type: 'component',
        component: modalComponent,
    };

    let items = data.items;

    const itemSize = {
        height: 35
    };

    function handleModal(item: CustomLayoutItem){
        const modal: ModalSettings = {
            ...default_modal,
            title: `Qui à fait : ${item.text}!`,
            response: async (username: string) => {
                formData.username = username;
                formData.task_id = item.id;
                await tick();
                form.requestSubmit();
            }
        };
        modalStore.trigger(modal);
    }
</script>

<div class=demo-container>
    <Grid {itemSize} cols={data.grid_max_col} collision="none">
        {#each items as item}
            <GridItem x={item.x} y={item.y} w={item.w} h={item.h} resizable={true} movable={item.movable} class="grid-item">
                <button class="item btn-lg  bg-gradient-to-r px-1 from-indigo-500 via-purple-500 to-pink-500" on:click={() => handleModal(item)}>
                    <div class="h-full flex flex-col justify-around overflow-hidden">
                        <div class="text-xl overflow-hidden">
                            {item.text}
                        </div>
                        <div class="text-2xl mt-1">
                            {item.score} pts
                        </div>
                    </div>
                </button>
            </GridItem>
        {/each}
    </Grid>
</div>

<form 
    bind:this={form} 
    method="POST" 
    hidden={true}
    action="?/task_done"
>
	<input name="username" bind:value={formData.username} type="text">
    <input name="task_id" bind:value={formData.task_id} type="text">
</form>

<style>
    .item {
        height: 100%;
        width: 100%;
    }
</style>