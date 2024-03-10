import type { TaskScores } from "./types";

export async function getUserIdByUsername(pb, username: string){
    const result = await pb.collection('users').getList();
    for (const elt of result.items) {
        if (elt.username == username) {
            return elt.id
        }
    };
    return null;
}

export function unitToSeconds(unit: string){
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

export function isoToTimestamp(isoDateString: string) {
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

export function getScore(task, date: string): number {
    let seconds = unitToSeconds(task.unit) / task.frequency;
    let date_ts = isoToTimestamp(date);
    // let due_date_ts = date_ts + seconds;
    let now_ts = getCurrentTimestamp()
    
    return (now_ts - date_ts)/(seconds) * 100;
}

export function sortTaskScores(taskScores: TaskScores){
    // Convert object to array of key-value pairs
    const keyValueArray = Object.entries(taskScores);

    // Sort array by values
    keyValueArray.sort((a, b) => a[1].score - b[1].score);

    keyValueArray.reverse();

    // Convert sorted array back to object (if needed)
    return Object.fromEntries(keyValueArray);
}

export async function getOrderedTasksScores(pb): Promise<TaskScores> {
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