
export default function SuccessToast() {
    return (
        <section className="bg-gray-2">
            <div className="mx-auto px-4 sm:container">
                <div className="flex justify-end">
                    <div className="bg-blue-500/5 border border-blue-600 flex items-center max-w-[460px] px-5 py-[18px] relative rounded-lg w-full">
                        <span className="bg-blue-600 flex h-[30px] items-center justify-center max-w-[30px] mr-4 rounded-full w-full">
                            <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15.15 3.34999C14.925 3.12499 14.575 3.12499 14.35 3.34999L5.85 11.6L1.65 7.47499C1.425 7.24999 1.075 7.27499 0.850003 7.47499C0.625003 7.69999 0.650003 8.04999 0.850003 8.27499L5.275 12.575C5.425 12.725 5.625 12.8 5.85 12.8C6.075 12.8 6.25 12.725 6.425 12.575L15.15 4.09999C15.375 3.92499 15.375 3.57499 15.15 3.34999Z"
                                    fill="white"
                                />
                            </svg>
                        </span>
                        <p className="font-semibold sm:text-lg text-base text-primary">
                            Tarefa criada com sucesso
                        </p>
                        <button className="-translate-y-1/2 absolute dark:text-dark-6 hover:text-primary right-5 text-dark-5 top-1/2">
                            <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-current"
                            >
                                <g clipPath="url(#clip0_1088_26057)">
                                    <path d="M8.79999 7.99999L14.9 1.89999C15.125 1.67499 15.125 1.32499 14.9 1.09999C14.675 0.874994 14.325 0.874994 14.1 1.09999L7.99999 7.19999L1.89999 1.09999C1.67499 0.874994 1.32499 0.874994 1.09999 1.09999C0.874994 1.32499 0.874994 1.67499 1.09999 1.89999L7.19999 7.99999L1.09999 14.1C0.874994 14.325 0.874994 14.675 1.09999 14.9C1.19999 15 1.34999 15.075 1.49999 15.075C1.64999 15.075 1.79999 15.025 1.89999 14.9L7.99999 8.79999L14.1 14.9C14.2 15 14.35 15.075 14.5 15.075C14.65 15.075 14.8 15.025 14.9 14.9C15.125 14.675 15.125 14.325 14.9 14.1L8.79999 7.99999Z" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1088_26057">
                                        <rect width={16} height={16} fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
