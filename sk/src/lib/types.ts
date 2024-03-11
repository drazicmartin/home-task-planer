export type ItemLayout = {
    w: number;
    h: number;
    text: string;
    id: string;
    score: number;
    todo_percentage: number;
};

export type TaskScores = {
    [key: string]: {
        todo_percentage: number;
        task: any;
    }
}