interface TaskModalProps {
    onClose: () => void;
}

export default function TaskModal({ onClose }: TaskModalProps) {
    return (
        <div className="fixed flex inset-0 items-center justify-center z-50">
            <div className="bg-white h-auto p-8 relative rounded-lg shadow-lg w-[430px] z-10">
                <h1 className="flex font-semibold justify-start pt-2 text-center text-gray-800 text-xl">Adicionar tarefa</h1>
                <p className="flex justify-start pb-4 text-gray-800 text-xs">Preencha os detalhes da nova tarefa</p>
                <div className="align-middle flex flex-col justify-start p-2">
                    <p className="font-semibold text-[13px] text-slate-400">Título da tarefa</p>
                    <input type="text" className="border border-gray-400 p-2 rounded-full text-gray-500 w-full" />
                </div>
                <div className="align-middle flex flex-col justify-start p-2">
                    <p className="font-semibold text-[13px] text-slate-400">Descrição da tarefa</p>
                    <textarea rows={4} className="border border-gray-400 p-2 rounded-xl text-gray-500 w-full" />
                </div>
                <div className="align-middle flex flex-col justify-start p-2">
                    <p className="font-semibold text-[13px] text-slate-400">Responsáveis</p>
                    <input type="select" className="border border-gray-400 p-2 rounded-full text-gray-500 w-full" />
                </div>
                <div className="align-middle flex flex-col justify-start p-2">
                    <p className="font-semibold text-[13px] text-slate-400">Data limite</p>
                    <div className="relative w-2/3">
                        <input type="text" className="border border-gray-400 p-2 pr-10 rounded-full text-gray-500 w-full" />
                        <span className="absolute flex inset-y-0 items-center pr-3 right-0">
                            <svg className="h-5 text-gray-400 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </span>
                    </div>
                </div>
                <button className="bg-[#4169E1] mt-4 p-3 rounded-full text-white text-xs w-full">
                    Salvar
                </button>
            </div>
            <div className="bg-black fixed inset-0 opacity-50" onClick={onClose}></div>
        </div>
    );
}
