import React from 'react';
import { DndContext, useDraggable, useDroppable, DragEndEvent } from '@dnd-kit/core';
import TaskCard from './TaskCard';

type Task = {
    id: string;
    title: string;
    description: string;
    date: string;
    responsible: string[];
};

type Column = {
    id: string;
    title: string;
    taskIds: string[];
};

type Data = {
    tasks: { [key: string]: Task };
    columns: { [key: string]: Column };
    columnOrder: string[];
};

const initialData: Data = {
    tasks: {
        'task-1': {
            id: 'task-1',
            title: 'Task 1',
            description: 'Description 1',
            date: '2022-01-01',
            responsible: ['John Doe', 'Jane Doe'],
        },
        'task-2': {
            id: 'task-2',
            title: 'Task 2',
            description: 'Description 2',
            date: '2022-01-02',
            responsible: ['Jane Doe'],
        },
        'task-3': {
            id: 'task-3',
            title: 'Task 3',
            description: 'Description 3',
            date: '2022-01-03',
            responsible: ['John Doe'],
        },
        'task-4': {
            id: 'task-4',
            title: 'Task 4',
            description: 'Description 4',
            date: '2022-01-04',
            responsible: [],
        },
    },
    columns: {
        'ideas': {
            id: 'ideas',
            title: 'Ideas',
            taskIds: ['task-1', 'task-2'],
        },
        'todo': {
            id: 'todo',
            title: 'To do',
            taskIds: ['task-3'],
        },
        'doing': {
            id: 'doing',
            title: 'Doing',
            taskIds: ['task-4'],
        },
        'done': {
            id: 'done',
            title: 'Done',
            taskIds: [],
        },
    },
    columnOrder: ['ideas', 'todo', 'doing', 'done'],
};

function Draggable({ id, children }: { id: string; children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="bg-slate-100 p-2 rounded">
            {children}
        </div>
    );
}

function Droppable({ id, children }: { id: string; children: React.ReactNode }) {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <div ref={setNodeRef} className="flex flex-col gap-2">
            {children}
        </div>
    );
}

export default function Board() {
    const [data, setData] = React.useState(initialData);

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            return;
        }

        const sourceColumnId = active?.data?.current?.sortable.containerId;
        const destinationColumnId = over?.data?.current?.sortable?.containerId;

        if (sourceColumnId === destinationColumnId) {
            return;
        }

        const sourceColumn = data.columns[sourceColumnId];
        const destinationColumn = data.columns[destinationColumnId];

        const sourceTaskIds = Array.from(sourceColumn.taskIds);
        const destinationTaskIds = Array.from(destinationColumn.taskIds);

        sourceTaskIds.splice(sourceTaskIds.indexOf(active?.id as string), 1);
        destinationTaskIds.splice(over?.index, 0, active?.id as string);

        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [sourceColumnId]: {
                    ...sourceColumn,
                    taskIds: sourceTaskIds,
                },
                [destinationColumnId]: {
                    ...destinationColumn,
                    taskIds: destinationTaskIds,
                },
            },
        };

        setData(newState);
    };

    return (
        <DndContext onDragEnd={onDragEnd}>
            <div className="flex flex-row gap-4 items-start justify-around p-4 w-full">
                {data.columnOrder.map((columnId) => {
                    const column = data.columns[columnId];
                    const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

                    return (
                        <div key={column.id} className="flex flex-col p-4 rounded w-1/4">
                            <h3 className="font-semibold mb-2 text-slate-800 text-sm">{column.title}</h3>
                            <Droppable id={column.id}>
                                {tasks.map((task) => (
                                    <Draggable key={task.id} id={task.id}>
                                        <TaskCard task={task} />
                                    </Draggable>
                                ))}
                            </Droppable>
                        </div>
                    );
                })}
            </div>
        </DndContext>
    );
}
