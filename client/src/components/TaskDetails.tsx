import CloseSvg from '../assets/close.svg';
import { Task } from '../types';

interface TaskDetailsProps {
    task: Task;
    onClose: () => void;
}

export default function TaskDetails({ task, onClose }: TaskDetailsProps) {
    return (
        <div className="fixed flex inset-0 items-center justify-center z-50">
            <button className="bg-white flex justify-center p-4 rounded-full z-10" onClick={onClose}>
                <img src={CloseSvg} alt="Close" />
            </button>
            <div className="bg-white h-auto p-8 relative rounded-lg shadow-lg w-[430px] z-10">
                <h1 className="flex font-semibold justify-start pt-2 text-center text-gray-600 text-xl">{task.title}</h1>
                {task.users &&
                    task.users.map((user) => (
                        <p className="flex justify-start pb-4 text-gray-500 text-xs">{user.name}</p>
                    ))}
                <div className="align-middle bg-slate-500 flex flex-col justify-start p-2 rounded-lg">
                    <p className="font-semibold text-[13px] text-slate-400">{task.description}</p>
                </div>
            </div>
            <div className="bg-black fixed inset-0 opacity-50"></div>
        </div>
    );
}
