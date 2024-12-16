import { useState } from "react";
import TaskDetails from "./TaskDetails";
import { createPortal } from "react-dom";

interface Task {
    title: string;
    description: string;
    date: string;
    responsible: string[];
}

export default function TaskCard({ task }: { task: Task }) {
    const [showModal, setShowModal] = useState(false);

    const formatDate = (date: string) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };

    const openTaskModal = () => {
        setShowModal(true);
    }

    const onClose = () => {
        setShowModal(false);
    }

    return (
        <section>
            <div className="bg-white flex flex-col h-44 justify-between max-w-80 mb-3 p-3 rounded-xl w-80"
                onClick={openTaskModal}>
                <h3 className="font-semibold text-slate-800 text-sm">
                    {task.title}
                </h3>
                <div className="align-middle flex flex-col gap-1 justify-start">
                    <p className="line-clamp-2 mt-1 overflow-hidden text-ellipsis text-slate-500 text-sm">
                        {task.description}
                    </p>
                    <div className="align-middle border border-dashed border-gray-400 flex rounded-full">
                        <p className="p-2 text-slate-500 text-sm">
                            Data limite: {formatDate(task.date)}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row gap-2 justify-start mt-2">
                    {task.responsible.map((name) => (
                        <div className="bg-blue-500 p-2 rounded-lg text-white text-xs">
                            {name}
                        </div>
                    ))}
                </div>
            </div>
            {showModal && createPortal(
                <TaskDetails onClose={onClose} />,
                document.body
            )}
        </section>
    );
}
