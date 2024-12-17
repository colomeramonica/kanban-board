import { useState } from 'react';
import logo from '../assets/logo.png';
import { createPortal } from 'react-dom';
import TaskModal from './NewTaskModal';

export default function NavBar() {
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const onClose = () => {
        setShowModal(false);
    }

    return (
        <section className="flex flex-col items-center px-32 w-full">
            <div className="bg-white flex flex-row font-semibold gap-3 h-16 items-center justify-start p-3 rounded-xl text-blue-600 text-sm w-full">
                <img src={logo} alt="alt" width={50} height={50} />
                Teste vaga front
            </div>
            <div className="bg-white flex h-16 items-center justify-center rounded-b-lg w-36">
                <button
                    className="bg-[#4169E1] m-4 p-3 rounded-full text-white text-xs"
                    onClick={handleButtonClick}
                >
                    Adicionar tarefa
                </button>
            </div>
            {showModal && createPortal(
                <TaskModal onClose={onClose} />,
                document.body
            )}
        </section>
    );
}
