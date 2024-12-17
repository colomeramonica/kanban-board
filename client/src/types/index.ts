export type Status = 'ideas' | 'todo' | 'doing' | 'done';

export type Task = {
    id: number | string;
    title: string;
    description: string;
    users: {
        id: number | string;
        name: string;
    }[];
    date: string;
    stage: Status;
};

export type BoardSections = {
    [name: string]: Task[];
};
