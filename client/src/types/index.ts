export type Status = 'ideas' | 'todo' | 'doing' | 'done';

export type Task = {
    id: string;
    title: string;
    description: string;
    responsible: string[];
    date: string;
    stage: Status;
};

export type BoardSections = {
    [name: string]: Task[];
};
