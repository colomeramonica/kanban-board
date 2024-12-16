import React from 'react';
import { DndContext, closestCenter, useDraggable, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskItem';

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
        'task-1': { id: 'task-1', title: 'Task 1', description: 'Description 1', date: '2022-01-01', responsible: ['John Doe'] },
        'task-2': { id: 'task-2', title: 'Task 2', description: 'Description 2', date: '2022-01-02', responsible: ['Jane Doe'] },
        'task-3': { id: 'task-3', title: 'Task 3', description: 'Description 3', date: '2022-01-03', responsible: ['John Doe'] },
    },
    columns: {
        ideas: { id: 'ideas', title: 'Ideas', taskIds: ['task-1', 'task-2'] },
        todo: { id: 'todo', title: 'To Do', taskIds: ['task-3'] },
        done: { id: 'done', title: 'Done', taskIds: [] },
    },
    columnOrder: ['ideas', 'todo', 'done'],
};

function Draggable({ id, children }: { id: string; children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} data-id={id}>
            {children}
        </div>
    );
}

function Droppable({ id, children }: { id: string; children: React.ReactNode }) {
    const { setNodeRef } = useSortable({ id });

    return (
        <div ref={setNodeRef} className="min-h-[200px] p-4 rounded-md" data-id={id}>
            {children}
        </div>
    );
}

export default function Board() {
    const [data, setData] = React.useState(initialData);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const sourceColumnId = active.data.current?.sortable?.containerId;
        const destinationColumnId = over.data.current?.sortable?.containerId;

        if (!sourceColumnId || !destinationColumnId) return;

        if (sourceColumnId === destinationColumnId) {
            return; // Reordering within the same column is not implemented yet
        }

        const sourceColumn = data.columns[sourceColumnId];
        const destinationColumn = data.columns[destinationColumnId];

        const sourceTasks = Array.from(sourceColumn.taskIds);
        const destinationTasks = Array.from(destinationColumn.taskIds);

        // Remove from source, add to destination
        const taskId = active.id;
        sourceTasks.splice(sourceTasks.indexOf(taskId), 1);
        destinationTasks.push(taskId);

        const updatedState = {
            ...data,
            columns: {
                ...data.columns,
                [sourceColumnId]: { ...sourceColumn, taskIds: sourceTasks },
                [destinationColumnId]: { ...destinationColumn, taskIds: destinationTasks },
            },
        };

        setData(updatedState);
    };

    return (
        <DndContext
            collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="flex flex-row gap-4 items-start justify-around p-4 w-full">
                {
                    data.columnOrder.map((columnId) => {
                        const column = data.columns[columnId];

                        return (
                            <SortableContext key={columnId} items={column.taskIds} strategy={verticalListSortingStrategy}>
                                <Droppable id={column.id}>
                                    <div className="flex flex-col p-4 rounded w-1/4">
                                        <h3 className="font-bold text-lg">{column.title}</h3>
                                        <div className="min-h-[200px] p-4 rounded-md">
                                            {column.taskIds.map((taskId) => (
                                                <Draggable key={taskId} id={taskId}>
                                                    <TaskCard task={data.tasks[taskId]} />
                                                </Draggable>
                                            ))}
                                        </div>
                                    </div>
                                </Droppable>
                            </SortableContext>
                        );
                    })
                }
            </div >
        </DndContext >
    );
}
