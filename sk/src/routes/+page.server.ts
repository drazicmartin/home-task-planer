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
    // Get the current time before the operation starts
    const startTime = performance.now();

    let taskScores = await getOrderedTasksScores(locals.pb);
    
    const default_element: ItemLayout = {
        id: '',
        ...DEFAULT_DISPLAY_SIZE,
        h: 3,
        text: "Empty",
        score: 0,
        todo_percentage: 0
    };

    let items: ItemLayout[] = [];

    let shape_list = DISPLAY_SIZE_LIST.slice().reverse();

    for (const [task_id, { task, todo_percentage }] of Object.entries(taskScores)) {
        let shape = shape_list.pop() || DEFAULT_DISPLAY_SIZE;

        let item = {
            id: task.id,
            w: shape.w,
            h: default_element.h,
            text: task.name,
            score: task.score,
            todo_percentage: Math.min(100, todo_percentage),
        }

        items.push(item);
    }

    // Get the current time after the operation finishes
    const endTime = performance.now();

    // Calculate the time difference
    const load_time = endTime - startTime;

    return {
        items: items,
        grid_max_col: GRID_MAX_COL,
        grid_max_row: GRID_MAX_ROW,
        load_time: load_time
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
	task_done: async ({ request, locals: { pb }, params }) => {
		const formData = await request.formData();
        const usernamesString = formData.get('usernames') as string;
        const usernames = usernamesString.split(',').map(username => username.trim());
        const n = usernames.length;

        const task_id = formData.get('task_id') as string;
        const task_score = parseFloat(formData.get('task_score') as string) as number;

        let response = {
            success: true,
            message: ""
        }

        if (n == 1 && usernames[0] === '') {
            response.success = false;
            response.message = "Sélectionner au mois une personne";
            return response;
        }

        for (const username of usernames) {
            
            let user_id = await getUserIdByUsername(pb, username);

            let score = task_score/n;
    
            const data = {
                "task": task_id,
                "user": user_id,
                "timestamp": Date.now(),
                "score": score
            };
    
            await pb.collection('records').create(data).then((result) => {
                if (response.success == true) {
                    response.message = `${usernamesString} gagne ${score} point${(score > 1) ? 's': ''} !`;
                }
            }).catch((error) => {
                response.success = false;
                response.message = error.message;
            });
        }

        return response;
	},
};
