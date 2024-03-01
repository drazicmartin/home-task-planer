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

    let gapX = 10;
    let gapY = 10;

    const breakpoint = 1200
    const column = 6

    const itemSize = { height: 40 };
</script>

<div class=demo-container>
    <!-- <Grid bind:items={items} gap={[gapX, gapY]} rowHeight={100} let:item {cols}>
        <button class="demo-widget" on:click={() => {modalStore.trigger(modal);}}>
            <h1>
                {item.text}
            </h1>
        </button>
    </Grid>  -->
    <Grid {itemSize} cols={6} collision="none">
        {#each items as item}
            <GridItem x={item.x} y={item.y} w={item.w} h={item.h}>
                <div class="item">{item.text}</div>
            </GridItem>
        {/each}
    </Grid>
</div>

<style>
    :global(.svlt-grid-shadow) {
        /* Back shadow */
        background: rgb(47, 0, 255);
    }
    :global(.svlt-grid-resizer::after) {
        /* Resizer color */
        border-color: rgb(18, 62, 255) !important;
    }
    :global(.svlt-grid-item) {
        /* Resizer color */
        background: rgb(98, 194, 165) !important;
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