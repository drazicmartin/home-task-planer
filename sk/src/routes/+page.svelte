<script lang="ts">
    import Grid, { GridItem } from 'svelte-grid-extended';
    import { getModalStore, type ModalComponent, type ModalSettings  } from '@skeletonlabs/skeleton';

    import ModalList from "$lib/ModalList.svelte";

    export let data;
			
    const modalStore = getModalStore();

    const modalComponent: ModalComponent = { ref: ModalList };

    const modal: ModalSettings = {
        type: 'component',
        title: "choose who did it !",
        component: modalComponent,
    };

    let items = data.items;

    const itemSize = {
        height: 35
    };
</script>

<div class=demo-container>
    <Grid {itemSize} cols={10} collision="none">
        {#each items as item}
            <GridItem x={item.x} y={item.y} w={item.w} h={item.h} class="grid-item">
                <button class="item btn-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" on:click={() => {modalStore.trigger(modal)}}>
                    <p class="h-full text-xl flex items-center justify-center overflow-hidden">
                        {item.text}
                    </p>
                </button>
            </GridItem>
        {/each}
    </Grid>
</div>

<style>
    .grid-item {
        /* display: flex;
        justify-content: center;
        align-items: center; */
    }

    .item {
        height: 100%;
        width: 100%;
    }

    .demo-widget {
        background: #f1f1f1;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>