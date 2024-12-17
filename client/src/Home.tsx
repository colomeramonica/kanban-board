import BoardSectionList from "./components/BoardSectionList";
import NavBar from "./components/NavBar";

function Home() {
    return (
        <section className="bg-slate-200 h-screen py-4 w-full">
            <div className="flex flex-col h-full items-center px-32">
                <NavBar />
                <div className="flex-1 overflow-y-auto w-full">
                    <BoardSectionList />
                </div>
            </div>
        </section>
    );
}

export default Home;
