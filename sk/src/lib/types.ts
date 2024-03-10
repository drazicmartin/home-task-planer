export type ItemLayout = {
    w: number;
    h: number;
    text: string;
    id: string;
    score: number;
};

export type TaskScores = {
    [key: string]: {
        score: number;
        task: any;
    }
}