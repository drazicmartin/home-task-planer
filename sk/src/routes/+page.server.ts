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

export type TaskScores = {
    [key: string]: {
        score: number;
        task: any;
    }
}

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

    let tasks = await locals.pb.collection("tasks").getList();
    let task_list = tasks.items

    let taskScores = await getOrderedTasksScores(locals.pb);
    
    const default_element: CustomLayoutItem = {
        id: '',
        x: 0,
        y: 0,
        ...DEFAULT_DISPLAY_SIZE,
        h: 3,
        movable: false,
        resizable: false,
        text: "Empty",
        score: 0,
    };

    let items: CustomLayoutItem[] = [];

    let shape_list = DISPLAY_SIZE_LIST.slice().reverse();

    for (const [task_id, { task }] of Object.entries(taskScores)) {
        let result = getAvailablePosition(default_element, items, GRID_MAX_COL, GRID_MAX_ROW);
        if (result == null) {
            continue
        }
        const {x, y}: Position = result;

        let shape = shape_list.pop() || DEFAULT_DISPLAY_SIZE;

        let item = {
            id: task.id,
            resizable: default_element.resizable,
            w: shape.w,
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
    const result = await pb.collection('users').getList();
    for (const elt of result.items) {
        if (elt.username == username) {
            return elt.id
        }
    };
    return null;
}

function unitToSeconds(unit: string){
    switch (unit) {
        case "year":
            return yearsToSeconds(1);
        case "month":
            return monthsToSeconds(1);
        case "week":
            return weeksToSeconds(1);
        case "day":
            return daysToSeconds(1);
        default:
            return daysToSeconds(1);
    }
}

function isoToTimestamp(isoDateString: string) {
    const date = new Date(isoDateString);
    return Math.floor(date.getTime() / 1000); // Divide by 1000 to get seconds
}

function daysToSeconds(days: number){
    return days * 24 * 60 * 60;
}

function weeksToSeconds(weeks: number) : number {
    return weeks * daysToSeconds(7);
}

function monthsToSeconds(months: number) {
    const daysInMonth = 365 / 12; // Average number of days in a month
    return months * daysToSeconds(daysInMonth);
}

function yearsToSeconds(years: number) : number {
    return years * daysToSeconds(365);
}

function getCurrentTimestamp() {
    return Math.floor(new Date().getTime() / 1000); // Divide by 1000 to get seconds
}

function getScore(task, date: string): number {
    let seconds = unitToSeconds(task.unit) / task.frequency;
    let date_ts = isoToTimestamp(date);
    // let due_date_ts = date_ts + seconds;
    let now_ts = getCurrentTimestamp()
    
    return (now_ts - date_ts)/(seconds) * 100;
}

function sortTaskScores(taskScores: TaskScores){
    // Convert object to array of key-value pairs
    const keyValueArray = Object.entries(taskScores);

    // Sort array by values
    keyValueArray.sort((a, b) => a[1].score - b[1].score);

    keyValueArray.reverse();

    // Convert sorted array back to object (if needed)
    return Object.fromEntries(keyValueArray);
}

async function getOrderedTasksScores(pb): Promise<TaskScores> {
    const tasks = await pb.collection('tasks').getList();
    let taskScores: TaskScores = {};

    for (const task of tasks.items) {
        await pb.collection('records').getFirstListItem(
            pb.filter("task={:task_id}", { task_id: task.id }),
            {
                sort: '-created',
            }
        ).then((record) => {
            taskScores[task.id] = {
                score: getScore(task, record.created),
                task: task
            };
        }).catch(() => {
            taskScores[task.id] = {
                score: getScore(task, task.created),
                task: task
            };
        });
    };
    return sortTaskScores(taskScores);
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
