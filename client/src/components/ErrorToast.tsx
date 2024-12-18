
export default function ErrorToast() {
    return (
        <section className="bg-gray-2 fade-in">
            <div className="mx-auto px-4 sm:container">
                <div className="flex justify-end">
                    <div className="bg-red-500/5 border border-red-500 flex items-center max-w-[460px] px-5 py-[18px] relative rounded-lg w-full">
                        <span className="bg-red-500 flex h-[30px] items-center justify-center max-w-[30px] mr-4 rounded-full w-full">
                            <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"
                                    fill="white"
                                />
                            </svg>
                        </span>
                        <p className="sm:text-lg text-base text-primary">
                            Erro ao fazer login
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
