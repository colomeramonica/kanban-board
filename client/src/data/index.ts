import { Task } from '../types';

export const INITIAL_TASKS: Task[] = [
    {
        id: '1',
        title: 'Title 2',
        description: 'Desc 2',
        responsible: ['John Doe'],
        date: '2022-01-01',
        stage: 'ideas',
    },
    {
        id: '2',
        title: 'Title 3',
        description: 'Desc 3',
        responsible:[ 'Jane Doe'],
        date: '2022-01-02',
        stage: 'todo',
    },
    {
        id: '3',
        title: 'Title 4',
        description: 'Desc 4',
        responsible: ['John Doe'],
        date: '2022-01-03',
        stage: 'done',
    },
];
