import React, { useState } from 'react';
import {
    useSensors,
    useSensor,
    PointerSensor,
    KeyboardSensor,
    DndContext,
    closestCorners,
    DragEndEvent,
    DragStartEvent,
    DragOverEvent,
    DragOverlay,
    DropAnimation,
    defaultDropAnimation,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { INITIAL_TASKS } from '../data/index.js';
import { BoardSections as BoardSectionsType } from '../types';
import { getTaskById } from '../utils/tasks.js';
import { findBoardSectionContainer, initializeBoard } from '../utils/board.ts';
import BoardSection from './BoardSection.tsx';
import TaskItem from './TaskItem.tsx';

const BoardSectionList = () => {
    const tasks = INITIAL_TASKS;
    const initialBoardSections = initializeBoard(INITIAL_TASKS);
    const [boardSections, setBoardSections] =
        useState<BoardSectionsType>(initialBoardSections);

    const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = ({ active }: DragStartEvent) => {
        setActiveTaskId(active.id as string);
    };

    const handleDragOver = ({ active, over }: DragOverEvent) => {
        // Find the containers
        const activeContainer = findBoardSectionContainer(
            boardSections,
            active.id as string
        );
        const overContainer = findBoardSectionContainer(
            boardSections,
            over?.id as string
        );

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        setBoardSections((boardSection) => {
            const activeItems = boardSection[activeContainer];
            const overItems = boardSection[overContainer];

            // Find the indexes for the items
            const activeIndex = activeItems.findIndex(
                (item) => item.id === active.id
            );
            const overIndex = overItems.findIndex((item) => item.id !== over?.id);

            return {
                ...boardSection,
                [activeContainer]: [
                    ...boardSection[activeContainer].filter(
                        (item) => item.id !== active.id
                    ),
                ],
                [overContainer]: [
                    ...boardSection[overContainer].slice(0, overIndex),
                    boardSections[activeContainer][activeIndex],
                    ...boardSection[overContainer].slice(
                        overIndex,
                        boardSection[overContainer].length
                    ),
                ],
            };
        });
    };

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        const activeContainer = findBoardSectionContainer(
            boardSections,
            active.id as string
        );
        const overContainer = findBoardSectionContainer(
            boardSections,
            over?.id as string
        );

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = boardSections[activeContainer].findIndex(
            (task) => task.id === active.id
        );
        const overIndex = boardSections[overContainer].findIndex(
            (task) => task.id === over?.id
        );

        if (activeIndex !== overIndex) {
            setBoardSections((boardSection) => ({
                ...boardSection,
                [overContainer]: arrayMove(
                    boardSection[overContainer],
                    activeIndex,
                    overIndex
                ),
            }));
        }

        setActiveTaskId(null);
    };

    const dropAnimation: DropAnimation = {
        ...defaultDropAnimation,
    };

    const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

    return (
        <div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="gap-x-[80px] grid grid-cols-4 ml-24 p-4">
                    {Object.keys(boardSections).map((boardSectionKey) => (
                        <div className="" key={boardSectionKey}>
                            <BoardSection
                                id={boardSectionKey}
                                title={boardSectionKey}
                                tasks={boardSections[boardSectionKey]}
                            />
                        </div>
                    ))}
                    <DragOverlay dropAnimation={dropAnimation}>
                        {task ? <TaskItem task={task} /> : null}
                    </DragOverlay>
                </div>
            </DndContext>
        </div>
    );
};

export default BoardSectionList;
