import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '../types';
import TaskItem from './TaskItem';
import SortableTaskItem from './SortableTaskItem';

type BoardSectionProps = {
    id: string;
    title: string;
    tasks: Task[];
};

const BoardSection = ({ id, title, tasks }: BoardSectionProps) => {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <div className="flex flex-col items-center justify-around p-4 w-full">
            <h3 className="flex font-bold justify-center text-lg">{title}</h3>
            <SortableContext
                id={id}
                items={tasks}
                strategy={verticalListSortingStrategy}
            >
                <div ref={setNodeRef}>
                    {tasks.map((task, index) => (
                        <div className="flex flex-col gap-4 rounded w-1/4" key={index}>
                            <SortableTaskItem id={task.id.toString()} onClick={(e) => e.stopPropagation()}>
                                <TaskItem task={task} />
                            </SortableTaskItem>
                        </div>
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};

export default BoardSection;
