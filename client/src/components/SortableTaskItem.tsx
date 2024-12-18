import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableTaskItemProps = {
    children: React.ReactNode;
    id: string;
    onClick: (e: React.MouseEvent) => void;
};

const SortableTaskItem = ({ children, id, onClick }: SortableTaskItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={(e) => {
                e.stopPropagation();
                onClick(e);
            }}
        >
            {children}
        </div>
    );
};

export default SortableTaskItem;
