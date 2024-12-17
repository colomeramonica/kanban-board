import { useState, useEffect } from "react";
import { createNewTask, loadUsers } from "../api";
import CloseSvg from '../assets/close.svg';

interface TaskModalProps {
    onClose: () => void;
}
export type Status = 'ideas' | 'todo' | 'doing' | 'done';

export type Task = {
    id: string;
    title: string;
    description: string;
    responsible: string[];
    date: string;
    stage: Status;
};

export type User = {
    id: string;
    name: string;
};

export default function TaskModal({ onClose }: TaskModalProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState<Task>({
        id: '',
        title: '',
        description: '',
        responsible: [],
        date: '',
        stage: 'ideas',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTask({ ...task, [e.target.name]: [e.target.value] });
    };

    useEffect(() => {
        loadUsers().then((data) => setUsers(data));
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        await createNewTask({
            ...task,
            stage: task.stage as 'ideas'
        });
        setLoading(false);
        onClose();
    };

    return (
        <form className="fixed flex flex-col gap-2 inset-0 items-center justify-center z-50">
            <button className="bg-white flex justify-center p-4 rounded-full z-10" onClick={onClose}>
                <img src={CloseSvg} alt="Close" />
            </button>
            <div className="bg-white h-auto p-8 relative rounded-lg shadow-lg w-[430px] z-10">
                <h1 className="flex font-semibold justify-start pt-2 text-center text-gray-600 text-xl">Adicionar tarefa</h1>
                <p className="flex justify-start pb-4 text-gray-500 text-xs">Preencha os detalhes da nova tarefa</p>
                <div className="align-middle flex flex-col justify-start p-2">
                    <input type="text"
                        name="title"
                        className="border border-gray-400 p-2 rounded-full text-gray-500 w-full"
                        onChange={handleChange}
                        value={task.title} />
                </div>
                <div className="align-middle flex flex-col justify-start p-2">
                    <p className="font-semibold text-[13px] text-slate-400">Descrição da tarefa</p>
                    <textarea rows={4}
                        name="description"
                        className="border border-gray-400 p-2 rounded-xl text-gray-500 w-full"
                        onChange={handleChange}
                        value={task.description} />
                </div>
                <div className="align-middle flex flex-col justify-start p-2">
                    <p className="font-semibold text-[13px] text-slate-400">Responsáveis</p>
                    <select name="responsible"
                        className="border border-gray-400 p-2 rounded-full text-gray-500 w-full"
                        onChange={handleSelectChange}
                        value={task.responsible.toString()}>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <div className="align-middle flex flex-col justify-start p-2">
                    <p className="font-semibold text-[13px] text-slate-400">Data limite</p>
                    <div className="relative w-2/3">
                        <input type="date"
                            name="date"
                            className="appearance-none border border-gray-400 p-2 pr-10 rounded-full text-gray-500 w-full"
                            onChange={handleChange}
                            value={task.date} />
                        <span className="absolute flex inset-y-0 items-center pr-3 right-0">
                            <svg className="h-5 text-gray-400 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </span>
                    </div>
                </div>
                <button
                    className="bg-[#4169E1] mt-4 p-3 rounded-full text-white text-xs w-full"
                    onClick={handleSubmit}
                    disabled={loading}>
                    {loading ?
                        <svg aria-hidden="true" className="animate-spin dark:text-gray-600 h-8 text-gray-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        : 'Salvar'}
                </button>
            </div>
            <div className="bg-black fixed inset-0 opacity-50" onClick={onClose}></div>
        </form>
    );
}
