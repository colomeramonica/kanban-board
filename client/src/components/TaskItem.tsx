import { useState } from "react";
import { Task } from "../types";
import TaskDetails from "./TaskDetails";
import { createPortal } from "react-dom";
import BookmarkSvg from '../assets/bookmark.svg';

export default function TaskCard({ task }: { task: Task }) {
    const [showModal, setShowModal] = useState(false);

    const formatDate = (date: string) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };

    const getRemainingTime = (date: string) => {
        const today = new Date();
        const taskDate = new Date(date);
        const difference = taskDate.getTime() - today.getTime();
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        return days;
    }

    const showTimeDetails = (task: Task) => {
        const remainingDays = getRemainingTime(task.date);
        if (task.stage != 'done') {
            return remainingDays > 0
                ? `Faltam ${remainingDays} ${remainingDays > 1 ? 'dias' : 'dia'}`
                : `Atrasado há` + Math.abs(remainingDays) + ` ${Math.abs(remainingDays) > 1 ? 'dias' : 'dia'}`;
        }

        return remainingDays > 0
            ? `Dentro do prazo`
            : `Fora do prazo`;
    }

    const openTaskModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowModal(true);
    };

    const onClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <div
                className={`relative bg-white cursor-pointer flex-col h-44 justify-between max-w-80 mb-3 p-3 rounded-2xl w-80 ${task.stage === 'done' ? 'border-2 border-green-600' : ''} `}
                onClick={(e) => e.stopPropagation()}
            >
                {task.stage === 'done' && (
                    <div className="absolute p-1 rounded-full top-[-12px]">
                        <img src={BookmarkSvg} alt="bookmark" className="h-6 w-6" />
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-slate-800 text-sm" onClick={openTaskModal}>
                        {task.title}
                    </h3>
                </div>
                <div className="align-middle flex flex-col gap-1 justify-start">
                    <p className="line-clamp-2 mt-1 overflow-hidden text-ellipsis text-slate-500 text-sm">
                        {task.description}
                    </p>
                    <div className="align-middle border border-dashed border-gray-400 flex flex-row rounded-full">
                        <p className="p-2 text-slate-500 text-sm">
                            Data limite: {formatDate(task.date)}
                        </p>
                        <p className={`flex font-bold p-2 text-xs align-middle items-center ${getRemainingTime(task.date) <= 7 ? 'text-yellow-500' : 'text-green-500'}`}>
                            {showTimeDetails(task)}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row gap-2 justify-start mt-2">
                    {task.users &&
                        task.users.map((user) => (
                            <div className="bg-blue-500 p-2 rounded-lg text-white text-xs" key={user.id}>
                                {user.name}
                            </div>
                        ))}
                </div>
            </div >
            {showModal &&
                createPortal(<TaskDetails task={task} onClose={onClose} />, document.body)
            }
        </>
    );
}
