interface TaskDetailsProps {
    onClose: () => void;
}

export default function TaskDetails({ onClose }: TaskDetailsProps) {
    return (
        <div className="fixed flex inset-0 items-center justify-center z-50">
            <div className="bg-white h-auto p-8 relative rounded-lg shadow-lg w-[430px] z-10"></div>
            <div className="bg-black fixed inset-0 opacity-50" onClick={onClose}></div>
        </div>
    );
}
