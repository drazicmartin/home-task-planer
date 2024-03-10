import type { ItemLayout } from '$lib/types';
import { getOrderedTasksScores, getUserIdByUsername } from '$lib/utils.js';


const GRID_MAX_COL = 6;
const GRID_MAX_ROW = 200;

const DEFAULT_DISPLAY_SIZE = {
    w: GRID_MAX_COL/3
}

const DISPLAY_SIZE_LIST = [
    {
        w: GRID_MAX_COL
    },
    {
        w: GRID_MAX_COL
    },
    {
        w: GRID_MAX_COL
    },
    {
        w: GRID_MAX_COL/2
    },
    {
        w: GRID_MAX_COL/2
    },
    {
        w: GRID_MAX_COL/2
    },
    {
        w: GRID_MAX_COL/2
    },
    {
        w: GRID_MAX_COL/2
    },
    {
        w: GRID_MAX_COL/2
    },
]

export const load = async ({ locals }) => {
    let taskScores = await getOrderedTasksScores(locals.pb);
    
    const default_element: ItemLayout = {
        id: '',
        ...DEFAULT_DISPLAY_SIZE,
        h: 3,
        text: "Empty",
        score: 0,
    };

    let items: ItemLayout[] = [];

    let shape_list = DISPLAY_SIZE_LIST.slice().reverse();

    for (const [task_id, { task }] of Object.entries(taskScores)) {
        let shape = shape_list.pop() || DEFAULT_DISPLAY_SIZE;

        let item = {
            id: task.id,
            w: shape.w,
            h: default_element.h,
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
