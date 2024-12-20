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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await createNewTask({
            ...task,
            stage: task.stage as 'ideas'
        });
        setLoading(false);
        onClose();
    };

    return (
        <form className="fixed flex flex-col gap-2 inset-0 items-center justify-center z-50" onSubmit={handleSubmit}>
            <button className="bg-white flex justify-center p-4 rounded-full z-10" onClick={onClose}>
                <img src={CloseSvg} alt="Close" />
            </button>
            <div className="bg-white h-auto p-8 relative rounded-lg shadow-lg w-[430px] z-10">
                <h1 className="flex font-semibold justify-start pt-2 text-center text-gray-600 text-xl">Adicionar tarefa</h1>
                <p className="flex justify-start pb-4 text-gray-500 text-xs">Preencha os detalhes da nova tarefa</p>
                <div className="align-middle flex flex-col justify-start p-2">
                    <input type="text"
                        required
                        name="title"
                        className="border border-gray-400 p-2 rounded-full text-gray-500 w-full"
                        onChange={handleChange}
                        value={task.title} />
                </div>
                <div className="align-middle flex flex-col justify-start p-2">
                    <p className="font-semibold text-[13px] text-slate-400">Descrição da tarefa</p>
                    <textarea rows={4}
                        required
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
                            required
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
                    type="submit"
                >
                    {loading ?
                        'Processando...'
                        : 'Salvar'}
                </button>
            </div>
            <div className="bg-black fixed inset-0 opacity-50" onClick={onClose}></div>
        </form>
    );
}
