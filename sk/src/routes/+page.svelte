<script lang="ts">
    import { getModalStore, type ModalComponent, type ModalSettings, type ToastSettings  } from '@skeletonlabs/skeleton';
    import ModalList from "$lib/ModalList.svelte";
    import { onMount, tick } from 'svelte';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import type { ActionData } from './$types.js';
    import type { ItemLayout } from '$lib/types.js';
    import { floorBasedOnMultipleOf5 } from '$lib/utils.js';

    export let data;
    export let form: ActionData;
    
    const modalStore = getModalStore();
    const toastStore = getToastStore();

    const modalComponent: ModalComponent = { ref: ModalList };

    let task_done_form: HTMLFormElement;
    const formData = {
		username: '',
		task_id: '',
        task_score: 0,
	};

    const default_modal: ModalSettings = {
        type: 'component',
        component: modalComponent,
    };

    let items = data.items;

    const itemSize = {
        height: 35
    };

    function handleModal(item: ItemLayout){
        const modal: ModalSettings = {
            ...default_modal,
            title: `Qui à fait : ${item.text}!`,
            response: async (r: string) => {
                if (r){
                    let username = r;
                    formData.username = username;
                    formData.task_id = item.id; 
                    formData.task_score = item.score;
                    await tick();
                    task_done_form.requestSubmit();
                }
            }
        };
        modalStore.trigger(modal);
    }

    onMount(async () => {
        if (form != null){
            let background: string;
            if (form.success) {
                background = "variant-filled-success";
            } else {
                background = "variant-filled-error";
            }

            const t: ToastSettings = {
                message: form.message,
                background: background,
            };

            toastStore.trigger(t);
        }
	});

    function getGradient(item: ItemLayout): string{
        let intermediate_color;
        let intensity;
        if (item.todo_percentage < 50) {
            intermediate_color = "emerald-300"
            intensity = floorBasedOnMultipleOf5(item.todo_percentage * 2)
        }else{
            intermediate_color = "red-300"
            intensity = floorBasedOnMultipleOf5((item.todo_percentage - 50) * 2)
        }
            
        return `bg-gradient-to-r from-red-300 from-0% via-${intermediate_color} via-${intensity}% to-emerald-300 to-100%`
    }
</script>


<div class={`grid grid-cols-${data.grid_max_col} gap-2 p-3`}>
    {#each items as item}
        <button class={`item col-span-${item.w} row-span-${item.h} btn whitespace-normal px-3 ${getGradient(item)}`} on:click={() => handleModal(item)}>
            <div class="h-full flex flex-col justify-around overflow-hidden">
                <div class="text-xl overflow-hidden">
                    {item.text}
                </div>
                <div class="text-2xl mt-1">
                    {item.score} pts
                </div>
            </div>
        </button>
    {/each}
</div>
<footer class="flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-neutral-700 dark:text-white">
    
    <div class="w-full bg-black/5">
        Load time : {Math.floor(data.load_time)} ms
    </div>
    <!--Copyright section-->
    <div class="w-full bg-black/5 p-4 text-center">
        © 2023 Copyright:
        <a href="https://github.com/drazicmartin/home-task-tracker">Drazic</a>
    </div>
</footer>

<form 
    bind:this={task_done_form} 
    method="POST" 
    hidden={true}
    action="?/task_done"
>
	<input name="username" bind:value={formData.username} type="text">
    <input name="task_id" bind:value={formData.task_id} type="text">
    <input name="task_score" bind:value={formData.task_score} type="text">
</form>

<style>
</style>