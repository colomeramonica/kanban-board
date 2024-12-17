export type NewTask = {
    title: string;
    description: string;
    responsible: string[];
    date: string;
    stage: 'ideas';
};

export const createNewTask = async (task: NewTask) => {
    const response = await fetch('http://localhost:8000/api/tasks/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return await response.json();
}
export const getAllTasks = async () => {
    const response = await fetch('http://localhost:8000/api/tasks/list');
    return await response.json();
}

export const loadUsers = async () => {
    const response = await fetch('http://localhost:8000/api/users/list');
    return await response.json();
}

export const updateTaskStatus = async (taskId: string, status: string) => {
    const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stage: status }),
    });
    return await response.json();
}
