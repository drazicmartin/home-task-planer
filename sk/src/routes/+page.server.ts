// data came from +layout.server.ts
import { getAvailablePosition, hasCollisions } from 'svelte-grid-extended/utils/grid';

import { type LayoutItem, type Position, type Size } from "svelte-grid-extended/types";

export type CustomLayoutItem = Position & Size & {
    text: string;
    id: string;
    min?: Size;
    max?: Size;
    movable: boolean;
    resizable: boolean;
};

export const load = async ({ locals }) => {

    let tasks = await locals.pb.collection("Task").getList()
    let task_list = tasks.items
    
    const default_element: CustomLayoutItem = {
        id: '',
        x: 0,
        y: 0,
        w: 5,
        h: 3,
        movable: false,
        resizable: false,
        text: "Empty"
    };

    let items: CustomLayoutItem[] = [];

    for (const [index, task] of task_list.entries()){
        let result = getAvailablePosition(default_element, items, 10, 100);
        if (result == null) {
            continue
        }
        const {x, y}: Position = result;

        let item = {
            resizable: default_element.resizable,
            w: default_element.w,
            h: default_element.h,
            x: x,
            y: y,
            movable: default_element.movable,
            text: task.Name,
        }

        items.push(item);
    }

    return {
        items: items
    }
}