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
    score: number;
};

const GRID_MAX_COL = 10;
const GRID_MAX_ROW = 200;

const SHAPE_LIST = [
    {
        w: GRID_MAX_COL
    }
]

export const load = async ({ locals }) => {

    let tasks = await locals.pb.collection("tasks").getList();
    let task_list = tasks.items
    
    const default_element: CustomLayoutItem = {
        id: '',
        x: 0,
        y: 0,
        w: 5,
        h: 3,
        movable: false,
        resizable: false,
        text: "Empty",
        score: 0,
    };

    let items: CustomLayoutItem[] = [];

    for (const [index, task] of task_list.entries()){
        let result = getAvailablePosition(default_element, items, GRID_MAX_COL, GRID_MAX_ROW);
        if (result == null) {
            continue
        }
        const {x, y}: Position = result;

        let item = {
            id: task.id,
            resizable: default_element.resizable,
            w: default_element.w,
            h: default_element.h,
            x: x,
            y: y,
            movable: default_element.movable,
            text: task.name,
            score: task.score,
        }

        items.push(item);
    }

    return {
        items: items,
        grid_max_col: GRID_MAX_COL,
        grid_max_row: GRID_MAX_ROW
    }
}

async function getUserIdByUsername(pb, username: string){
    let result = await pb.collection('users').getList();
    for (const elt of result.items) {
        if (elt.username == username) {
            return elt.id
        }
    };
    return null;
}

/** @type {import('./$types').Actions} */
export const actions = {
	task_done: async ({ request, locals: { pb }, params }) => {
		const formData = await request.formData();
        const username = formData.get('username') as string;
        const task_id = formData.get('task_id') as string;
        const task_score = formData.get('task_score') as string;

        let user_id = await getUserIdByUsername(pb, username);

        const data = {
            "task": task_id,
            "user": user_id,
            "timestamp": Date.now(),
            "score": task_score
        };

        let response = {
            success: false,
            message: ""
        }
        await pb.collection('records').create(data).then((result) => {
            response.success = true;
            response.message = `${username} gagne ${task_score} point${(parseInt(task_score) > 1) ? 's': ''} !`;
        }).catch((error) => {
            response.success = false;
            response.message = error.message;
        });

        return { ...response };
	},
};
