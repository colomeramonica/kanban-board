import { useState, useEffect } from 'react';
import {
    useSensors,
    useSensor,
    PointerSensor,
    KeyboardSensor,
    DndContext,
    closestCorners,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
    defaultDropAnimation,
    DragOverEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { BoardSections as BoardSectionsType } from '../types';
import { getTaskById } from '../utils/tasks';
import { findBoardSectionContainer, initializeBoard } from '../utils/board';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';
import { getAllTasks, updateTaskStatus } from '../api';

const BoardSectionList = () => {
    const [tasks, setTasks] = useState([]);
    const [boardSections, setBoardSections] = useState<BoardSectionsType>({});
    const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const registeredTasks = await getAllTasks();
            setTasks(registeredTasks);
            setBoardSections(initializeBoard(registeredTasks));
        };
        fetchTasks();
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = ({ active }: DragStartEvent) => {
        setActiveTaskId(active.id as string);
    };

    const handleDragOver = async ({ active, over }: DragOverEvent) => {
        const activeContainer = findBoardSectionContainer(
            boardSections,
            active.id as string
        );
        const overContainer = findBoardSectionContainer(
            boardSections,
            over?.id as string
        );

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return;
        }

        setBoardSections((prevBoardSections) => {
            const activeIndex = prevBoardSections[activeContainer].findIndex(
                (item) => item.id === active.id
            );
            const overIndex = prevBoardSections[overContainer].findIndex(
                (item) => item.id === over?.id
            );

            if (activeIndex === -1 || overIndex === -1) return prevBoardSections;

            return {
                ...prevBoardSections,
                [activeContainer]: prevBoardSections[activeContainer].filter(
                    (item) => item.id !== active.id
                ),
                [overContainer]: [
                    ...prevBoardSections[overContainer].slice(0, overIndex),
                    prevBoardSections[activeContainer][activeIndex],
                    ...prevBoardSections[overContainer].slice(overIndex),
                ],
            };
        });

        await updateTaskStatus(active.id as string, overContainer);
        const updatedTasks = await getAllTasks();
        setTasks(updatedTasks);
        setBoardSections(initializeBoard(updatedTasks));
    };

    const handleDragEnd = async ({ active, over }: DragEndEvent) => {
        const activeContainer = findBoardSectionContainer(
            boardSections,
            active.id as string
        );
        const overContainer = findBoardSectionContainer(
            boardSections,
            over?.id as string
        );

        if (!activeContainer || !overContainer) {
            setActiveTaskId(null);
            return;
        }

        const activeIndex = boardSections[activeContainer].findIndex(
            (task) => task.id === active.id
        );
        const overIndex = boardSections[overContainer].findIndex(
            (task) => task.id === over?.id
        );

        // Reeordenação na coluna
        if (activeContainer === overContainer && activeIndex !== overIndex) {
            setBoardSections((prevBoardSections) => ({
                ...prevBoardSections,
                [overContainer]: arrayMove(
                    prevBoardSections[overContainer],
                    activeIndex,
                    overIndex
                ),
            }));
        }

        // Movimentação entre as colunas
        if (activeContainer !== overContainer) {
            setBoardSections((prevBoardSections) => ({
                ...prevBoardSections,
                [activeContainer]: prevBoardSections[activeContainer].filter(
                    (item) => item.id !== active.id
                ),
                [overContainer]: [
                    ...prevBoardSections[overContainer].slice(0, overIndex),
                    prevBoardSections[activeContainer][activeIndex],
                    ...prevBoardSections[overContainer].slice(overIndex),
                ],
            }));

            await updateTaskStatus(active.id as string, overContainer);
            const updatedTasks = await getAllTasks();
            setTasks(updatedTasks);
            setBoardSections(initializeBoard(updatedTasks));
        }

        setActiveTaskId(null);
    };

    const dropAnimation = { ...defaultDropAnimation };

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
                <div className="gap-x-[100px] grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 ml-24 p-4 sm:grid-cols-2">
                    {Object.keys(boardSections).map((boardSectionKey) => (
                        <div key={boardSectionKey}>
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
