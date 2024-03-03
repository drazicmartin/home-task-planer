<script lang="ts">
    import Grid, { GridItem } from 'svelte-grid-extended';
    import { getModalStore, type ModalComponent, type ModalSettings  } from '@skeletonlabs/skeleton';

    import ModalList from "$lib/ModalList.svelte";

    export let data;
			
    const modalStore = getModalStore();

    const modalComponent: ModalComponent = { ref: ModalList };

    const default_modal: ModalSettings = {
        type: 'component',
        component: modalComponent,
    };

    let items = data.items;

    const itemSize = {
        height: 35
    };

    function showModal(task_name: string){
        const modal: ModalSettings = {
            ...default_modal,
            title: `Qui à fait : ${task_name}!`,
        };
        modalStore.trigger(modal);
    }
</script>

<div class=demo-container>
    <Grid {itemSize} cols={data.grid_max_col} collision="none">
        {#each items as item}
            <GridItem x={item.x} y={item.y} w={item.w} h={item.h} resizable={true} movable={item.movable} class="grid-item">
                <button class="item btn-lg  bg-gradient-to-r px-1 from-indigo-500 via-purple-500 to-pink-500" on:click={() => showModal(item.text)}>
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