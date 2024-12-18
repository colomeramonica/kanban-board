export type NewTask = {
    title: string;
    description: string;
    responsible: string[];
    date: string;
    stage: 'ideas';
};

const getToken = () => localStorage.getItem('token');

export const createNewTask = async (task: NewTask) => {
    const response = await fetch('http://localhost:8000/api/tasks/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(task),
    });
    return await response.json();
}

export const getAllTasks = async () => {
    const response = await fetch('http://localhost:8000/api/tasks/list', {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        },
    });
    return await response.json();
}

export const loadUsers = async () => {
    const response = await fetch('http://localhost:8000/api/users/list', {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        },
    });
    return await response.json();
}

export const updateTaskStatus = async (taskId: string, status: string) => {
    const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ stage: status }),
    });
    return await response.json();
}
