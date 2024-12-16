import BoardSectionList from "./components/BoardSectionList";
import NavBar from "./components/NavBar";

function Home() {
    return (
        <section className="bg-slate-200 h-screen py-4 w-full">
            <div className="flex flex-col items-center px-32">
                <NavBar />
                <BoardSectionList />
            </div>
        </section>
    );
}

export default Home;
