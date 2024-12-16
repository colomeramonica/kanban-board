export type NewTask = {
    title: string;
    description: string;
    responsible: string[];
    date: string;
    stage: 'ideas';
};

export const createNewTask = (task: NewTask) => {
    return fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    }).then((res) => res.json());
}
export const getAllTasks = () => {
    return fetch('/api/tasks').then((res) => res.json());
}
